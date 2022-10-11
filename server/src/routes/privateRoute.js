import express from "express";
import pg from "pg";
import config from "../../config/pgConfig.js";
import users from "../data/users.json" assert { type: "json" };

let pool = new pg.Pool(config);

const privateRoute = express.Router();

//================Testing ROUTE======
privateRoute.get("/date", (req, res) => {
  pool.query("SELECT NOW()", (err, result) => {
    if (err) return res.send(err);

    setTimeout(
      () =>
        res.status(200).send({ data: result.rows[0], usercode: req.usercode }),
      2000
    );
  });
});

privateRoute.get("/users", (req, res) => {
  res.status(200).send(users);
});

export default privateRoute;
