import { NextFunction, Response } from "express";
import { UserRequest } from "../middlewares/authentication";
import { getMessage, getOldMessage } from "../services/message";

export const addMessage = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    await req.user.createMessage({ message });
    res.json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (err) {
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
  const messageId: any = req.query.messageId;
  const messages = await getMessage(messageId);
  res.json({
    success: true,
    messages,
  });
};

export const getOldMessages = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const messageId: any = req.query.messageId;
  const messages = await getOldMessage(messageId);
  res.json({
    success: true,
    messages,
  });
};
