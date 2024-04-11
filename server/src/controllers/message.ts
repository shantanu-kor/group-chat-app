import { NextFunction, Response } from "express";
import { UserRequest } from "../middlewares/authentication";

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
