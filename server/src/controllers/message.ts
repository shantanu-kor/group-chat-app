import { NextFunction, Response } from "express";
import { UserRequest } from "../middlewares/authentication";
import { getMessage, getOldMessage } from "../services/message";
import sequelize from "../utils/database";
import Group from "../models/group";

export const addMessage = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();

  try {
    const { message, name } = req.body;
    const group: any = await Group.findOne({ where: { name }, transaction });
    if (!group) {
      throw new Error("Group not found");
    }
    await req.user.createMessage({ message, groupId: group.id }, transaction);
    await transaction.commit();
    res.json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getMessages = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const messageId: any = req.query.messageId;
    const name: any = req.query.name;
    const messages = await getMessage(messageId, name);
    if (!messages) {
      throw new Error("Cannot get messages");
    }
    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getOldMessages = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const messageId: any = req.query.messageId;
    const name: any = req.query.name;
    const messages = await getOldMessage(messageId, name);
    if (!messages) {
      throw new Error("Cannot get messages");
    }
    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
