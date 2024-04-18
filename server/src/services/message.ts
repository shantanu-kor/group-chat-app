import { Op } from "sequelize";
import Message from "../models/message";
import User from "../models/user";
import sequelize from "../utils/database";
import Group from "../models/group";

export const getMessage = async (messageId: number, name: string) => {
  const transaction = await sequelize.transaction();
  try {
    const group: any = await Group.findOne({ where: { name }, transaction });
    const messages: any = await Message.findAll({
      where: { id: { [Op.gt]: messageId }, groupId: group.id },
      transaction,
    });
    const messageList = [];
    for (let i of messages) {
      const user: any = await User.findByPk(i.userId, { transaction });
      messageList.push({ id: i.id, message: i.message, userName: user.name });
    }
    await transaction.commit();
    return messageList;
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    return null;
  }
};

export const getOldMessage = async (messageId: number, name: string) => {
  const transaction = await sequelize.transaction();
  try {
    const group: any = await Group.findOne({ where: { name }, transaction });
    const messages: any = await Message.findAll({
      where: {
        id: { [Op.lt]: messageId },
        groupId: group.id,
      },
      transaction,
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
    await transaction.commit();
    return messageList;
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    return null;
  }
};
