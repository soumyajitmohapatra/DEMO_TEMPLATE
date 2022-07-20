import express from "express";
import pg from "pg";
import config from "../../config/pgConfig.js";

let pool = new pg.Pool(config);

const privateRoute = express.Router();

//================Testing ROUTE======
privateRoute.get("/date", (req, res) => {
  pool.query("SELECT NOW()", (err, result) => {
    if (err) return res.send(err);

    res.status(200).send({ data: result.rows[0], usercode: req.usercode });
  });
});

export default privateRoute;
