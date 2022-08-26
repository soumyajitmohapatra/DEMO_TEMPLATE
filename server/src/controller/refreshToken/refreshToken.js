import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res, pool) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
    domain: "localhost",
  });

  pool.query(
    `SELECT user_name, refresh_token, user_code FROM admin.user_master where '${refreshToken}' =  SOME (refresh_token)`,
    (err, token) => {
      // Detected refresh token reuse!
      if (err) {
        res.send(err);
      } else if (token.rows.length) {
        pool.query(
          `UPDATE admin.user_master SET refresh_token = (SELECT array_remove(refresh_token, '${refreshToken}') FROM admin.user_master)
          `,
          (err, result) => {
            if (err) {
              return res.send(err);
            }
          }
        );
        // evaluate jwt
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          async (err, decoded) => {
            if (err) {
              // expired refresh token
              return res.status(403).send("decode err");
            }
            if (err || token.rows[0].user_code !== decoded.usercode)
              return res.status(403).send("invalid");

            // Refresh token was still valid
            const accessToken = jwt.sign(
              {
                usercode: token.rows[0].user_code,
                username: token.rows[0].user_name,
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "30m" }
            );

            const newRefreshToken = jwt.sign(
              {
                usercode: token.rows[0].user_code,
                username: token.rows[0].user_name,
              },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "1d" }
            );
            pool.query(
              `UPDATE admin.user_master SET refresh_token = (SELECT array_append(refresh_token, '${newRefreshToken}') from admin.user_master)
                `,
              (err, result) => {
                if (err) {
                  return res.send(err);
                } else {
                  res.cookie("jwt", newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "Strict",
                    maxAge: 24 * 60 * 60 * 1000,
                    domain: "localhost",
                  });
                  res.json({ accessToken });
                }
              }
            );

            // Creates Secure Cookie with refresh token
          }
        );
      } else {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          async (err, decoded) => {
            if (err) return res.sendStatus(403); //Forbidden
            // Delete refresh tokens of hacked user
            pool.query(
              `UPDATE admin.user_master SET refresh_token = null`,
              (err, result) => {
                if (err) {
                  return res.send(err);
                } else res.sendStatus(403);
              }
            );
          }
        );
      }
    }
  );
};

export default { handleRefreshToken };
