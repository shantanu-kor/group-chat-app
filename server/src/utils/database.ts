import { config } from "dotenv";

import { Sequelize } from "sequelize";

config();

const sequelize = new Sequelize(
  process.env.MYSQL_NAME || 'group-chat-app',
  process.env.MYSQL_USERNAME || 'root',
  process.env.MYSQL_PASSWORD,
  { dialect: "mysql", host: process.env.MYSQL_HOST }
);

export default sequelize;