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
const message_1 = __importDefault(require("./routes/message"));
const message_2 = __importDefault(require("./models/message"));
const user_2 = __importDefault(require("./models/user"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(body_parser_1.default.json());
app.use("/user", user_1.default);
app.use('/message', message_1.default);
message_2.default.belongsTo(user_2.default);
user_2.default.hasMany(message_2.default);
database_1.default
    .sync()
    .then((res) => {
    app.listen(3000);
})
    .catch((err) => {
    console.log(err);
});
