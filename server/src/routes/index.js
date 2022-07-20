import express from "express";
import pg from "pg";
import config from "../../config/pgConfig.js";
import login from "../controller/login/login.js";
import logout from "../controller/logout/logout.js";
import refreshToken from "../controller/refreshToken/refreshToken.js";

let pool = new pg.Pool(config);

const router = express.Router();

//================Testing ROUTE======
router.get("/testing", (req, res) =>
  res.send("This is for testing, Last changes on 13th jun")
);

router.post("/login", (req, res) => login.handleLogin(req, res, pool));
router.get("/refresh", (req, res) =>
  refreshToken.handleRefreshToken(req, res, pool)
);
router.get("/logout", (req, res) => logout.handleLogout(req, res, pool));

export default router;
