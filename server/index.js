import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./src/routes/index.js";
import corsOptions from "./config/corsOptions.js";
import privateRoute from "./src/routes/privateRoute.js";
import verifyJWT from "./src/middleware/verifyJwt.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/", router);

app.use(verifyJWT);

app.use("/", privateRoute);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});
