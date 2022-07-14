import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./src/routes/index.js";
import corsOptions from "./config/corsOptions.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/", router);

app.get("/cook", (req, res) => {
  const cookies = req.cookies;
  if (cookies?.auth) {
    res.send(cookies);
  } else {
    res.cookie("auth", "soumyajit");
    res.send({ txt: "cookies" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});
