import { Op } from "sequelize";
import Message from "../models/message";
import User from "../models/user";

export const getMessage = async (messageId: number) => {
  const messages: any = await Message.findAll({
    where: { id: { [Op.gt]: messageId } },
  });
  const messageList = [];
  for (let i of messages) {
    const user: any = await User.findByPk(i.userId);
    messageList.push({ id: i.id, message: i.message, userName: user.name });
  }
  return messageList;
};

export const getOldMessage = async (messageId: number) => {
  const messages: any = await Message.findAll({
    where: {
      id: { [Op.lt]: messageId },
    },
  });
  const messageList = [];
  let index = messages.length - 10;
  if (index < 0) {
    index = 0;
  }
  for (let i of messages.slice(index)) {
    const user: any = await User.findByPk(i.userId);
    messageList.push({ id: i.id, message: i.message, userName: user.name });
  }
  return messageList;
};
