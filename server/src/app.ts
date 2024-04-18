import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import sequelize from "./utils/database";

import userRoutes from "./routes/user";
import messageRoutes from "./routes/message";
import groupRoutes from "./routes/group";

import Message from "./models/message";
import User from "./models/user";
import Group from "./models/group";
import UserGroup from "./models/groupUser";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/message", messageRoutes);
app.use("/group", groupRoutes);

Message.belongsTo(User);
User.hasMany(Message);
Message.belongsTo(Group);
Group.hasMany(Message);
Group.belongsToMany(User, { through: UserGroup });
User.belongsToMany(Group, { through: UserGroup });

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
