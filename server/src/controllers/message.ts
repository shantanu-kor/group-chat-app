import { NextFunction, Response } from "express";
import { UserRequest } from "../middlewares/authentication";
import { getMessage } from "../services/message";

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
  const messages = await getMessage();
  res.json({
    success: true,
    messages
  })
};
