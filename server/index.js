import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

import router from "./src/routes/index.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});
