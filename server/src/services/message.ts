import { Model } from "sequelize";
import Message from "../models/message"
import User from "../models/user";

export const getMessage = async () => {
    const messages: any = await Message.findAll();
    const messageList = [];
    for (let i of messages) {
        const user: any = await User.findByPk(i.userId)
        messageList.push({id: i.id, message: i.message, userName: user.name});
    }
    return messageList;
}