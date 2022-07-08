import express from "express";
import pg from "pg";
import config from "../../pgConfig/index.js";
import login from "../controller/login/login.js";

let pool = new pg.Pool(config);

const router = express.Router();

//================Testing ROUTE======
router.get("/testing", (req, res) =>
  res.send("This is for testing, Last changes on 13th jun")
);

router.post("/login", (req, res) => login.handleLogin(req, res, pool));

export default router;
