"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)();
const sequelize = new sequelize_1.Sequelize(process.env.MYSQL_NAME || 'group-chat-app', process.env.MYSQL_USERNAME || 'root', process.env.MYSQL_PASSWORD, { dialect: "mysql", host: process.env.MYSQL_HOST });
exports.default = sequelize;
