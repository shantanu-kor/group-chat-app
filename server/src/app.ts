import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import sequelize from "./utils/database";
import userRoutes from "./routes/user";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
