const handleLogout = async (req, res,pool) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    pool.query(
          `SELECT  refresh_token FROM admin.user_master where '${refreshToken}' =  SOME (refresh_token)`,
          (err, token) => {
            // Detected refresh token reuse!
            if (err) {
              res.send(err);
            } else if (token.rows.length) {
               // Delete refreshToken in db
               res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
               res.sendStatus(204);
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
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                return res.sendStatus(204);
            }
          }
        );
        
   
}

export default { handleLogout }