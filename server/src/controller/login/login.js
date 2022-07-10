import jwt from "jsonwebtoken";

const handleLogin = async (req, res, pool) => {
  const cookies = req.cookies;

  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username, password and institute are required." });

  await pool.query(
    `SELECT user_name, password, user_code, refresh_token
    FROM admin.user_master where user_name = '${username}' and password = '${password}'`,
    function (err, response) {
      if (err) {
        let dataStatus = {
          status: "failed",
          msg: "failed to bind a data",
        };
        var key = "data";
        dataStatus[key] = [];
        dataStatus[key].push(err);
        res.status(400).send(dataStatus);
      } else if (response.rows.length > 0) {
        let dataStatus = {
          status: "success",
          msg: "successfully data bind",
        };

        const accessToken = jwt.sign(
          {
            usercode: response.rows[0].user_code,
            username: response.rows[0].username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "3s",
          }
        );
        const newRefreshToken = jwt.sign(
          {
            username: response.rows[0].username,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        if (cookies?.jwt) {
          /* 
                  Scenario added here: 
                      1) User logs in but never uses RT and does not logout 
                      2) RT is stolen
                      3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
                  */
          console.log("called");
          const refreshToken = cookies.jwt;

          pool.query(
            `SELECT  refresh_token FROM admin.user_master where '${refreshToken}' =  SOME (refresh_token)`,
            (err, token) => {
              // Detected refresh token reuse!
              if (err) {
                res.send(err);
              } else if (token.rows.length) {
                // clear out that previous refresh tokens
                pool.query(
                  `UPDATE admin.user_master SET refresh_token = (SELECT array_remove(refresh_token, '${refreshToken}') FROM admin.user_master)
                `,
                  (err, result) => {
                    if (err) {
                      res.send(err);
                    }
                  }
                );
              } else {
                // clear out ALL previous refresh tokens
                pool.query(
                  `UPDATE admin.user_master SET refresh_token = null`,
                  (err, result) => {
                    if (err) {
                      res.send(err);
                    }
                  }
                );
              }
            }
          );
          res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
        }

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

        dataStatus["accessToken"] = accessToken;
        dataStatus["refreshToken"] = newRefreshToken;

        let key = "data";
        dataStatus[key] = {
          user_name: response.rows[0].user_name,
          user_code: response.rows[0].user_code,
        };

        res.status(200).json(dataStatus);
      } else {
        let dataStatus = {
          status: "failed",
          msg: "Invalid Credentials!!",
        };
        var key = "data";
        dataStatus[key] = [];
        res.status(401).send(dataStatus);
      }
    }
  );
};

export default { handleLogin };
