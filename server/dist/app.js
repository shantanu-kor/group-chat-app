"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./utils/database"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/user", user_1.default);
database_1.default
    .sync()
    .then((res) => {
    app.listen(3000);
})
    .catch((err) => {
    console.log(err);
});
