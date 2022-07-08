const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res, pool) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  pool.query(
    `SELECT user_name, refresh_token FROM admin.user_master where '${refreshToken}' =  SOME (refresh_token)`,
    (err, token) => {
      // Detected refresh token reuse!
      if (err) {
        res.send(err);
      } else if (token.rows) {
        pool.query(
          `UPDATE admin.user_master SET refresh_token = (SELECT array_remove(refresh_token, '${refreshToken}') FROM admin.user_master)
          `,
          (err, result) => {
            if (err) {
              res.send(err);
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
              return res.sendStatus(403);
            }
            if (err || token.rows[0].user_name !== decoded.username)
              return res.sendStatus(403);

            // Refresh token was still valid
            const accessToken = jwt.sign(
              {
                usercode: decoded.usercode,
                username: decoded.username,
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "10s" }
            );

            const newRefreshToken = jwt.sign(
              { username: decoded.username },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "15s" }
            );
            pool.query(
              `UPDATE admin.user_master SET refresh_token = (SELECT array_append(refresh_token, '${newRefreshToken}') from admin.user_master)
                `,
              (err, result) => {
                if (err) {
                  res.send(err);
                }
              }
            );

            // Creates Secure Cookie with refresh token
            res.cookie("jwt", newRefreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
              maxAge: 24 * 60 * 60 * 1000,
            });

            res.json({ accessToken });
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
                  res.send(err);
                }
              }
            );
          }
        );
      }
    }
  );
};

module.exports = { handleRefreshToken };
