"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./utils/database"));
const app = (0, express_1.default)();
database_1.default
    .sync()
    .then((res) => {
    app.listen(3000);
})
    .catch((err) => {
    console.log(err);
});
