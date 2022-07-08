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
            usercode: response.rows[0].user_code,
            username: response.rows[0].username,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        // !cookies?.jwt
        // ? response.rows[0].refresh_token
        //   ? response.rows[0].refresh_token
        //   : response.rows[0].refresh_token.filter((rt) => rt !== cookies.jwt)
        // : [];

        let newRefreshTokenArray = !cookies?.jwt
          ? !response.rows[0].refresh_token
            ? []
            : response.rows[0].refresh_token
          : !response.rows[0].refresh_token
          ? []
          : response.rows[0].refresh_token.filter((rt) => rt !== cookies.jwt);
        if (cookies?.jwt) {
          /* 
                  Scenario added here: 
                      1) User logs in but never uses RT and does not logout 
                      2) RT is stolen
                      3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
                  */
          console.log("called");
          const refreshToken = cookies.jwt;
          const foundToken =
            pool.query(`SELECT user_name, password, user_code, refresh_token
            FROM admin.user_master where '${refreshToken}' =  SOME (refresh_token)`);

          // Detected refresh token reuse!
          if (!foundToken) {
            // clear out ALL previous refresh tokens
            newRefreshTokenArray = [];
          }

          res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
        }
        // Saving refreshToken with current user
        response.rows[0].refresh_token = [
          ...newRefreshTokenArray,
          newRefreshToken,
        ];
        // pool.query(
        //   `UPDATE admin.user_master SET refresh_token = ARRAY [${response.rows[0].refresh_token}]`,
        //   (err, result) => {
        //     if (err) {
        //       res.send(err);
        //     } else {
        //       res.send(result);
        //     }
        //   }
        // );
        // return;
        // Creates Secure Cookie with refresh token
        res.cookie("jwt", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        });

        dataStatus["token"] = accessToken;
        let key = "data";
        dataStatus[key] = response.rows[0];

        let jsonStr = response.rows[0].refresh_token.join(" ");

        let str = `UPDATE admin.user_master SET refresh_token = ARRAY ${jsonStr}`;
        res.status(200).json({
          t: response.rows[0].refresh_token,
          a: jsonStr,
        });
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
