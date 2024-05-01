import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import sequelize from "./utils/database";

import userRoutes from "./routes/user";
import messageRoutes from "./routes/message";
import groupRoutes from "./routes/group";
import adminRoutes from './routes/admin';

import Message from "./models/message";
import User from "./models/user";
import Group from "./models/group";
import UserGroup from "./models/groupUser";
import Admin from "./models/admin";

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
app.use('/admin', adminRoutes);

Message.belongsTo(User);
User.hasMany(Message);
Message.belongsTo(Group);
Group.hasMany(Message);
Group.belongsToMany(User, { through: UserGroup });
User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, {through: Admin, as: 'userAdmins'});
User.belongsToMany(Group, {through: Admin, as: 'groupAdmins'});

sequelize
  .sync()
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
