import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import sequelize from "./utils/database";
import userRoutes from "./routes/user";
import messageRoutes from './routes/message';
import Message from "./models/message";
import User from "./models/user";

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use('/message', messageRoutes);

Message.belongsTo(User);
User.hasMany(Message);

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
