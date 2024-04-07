import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";

import sequelize from "./utils/database";


const app = express();

app.use(cors());
app.use(bodyParser.json());

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
