import { NextFunction, Request, Response } from "express";
import { addUser, findUser } from "../services/user";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone, password } = req.body;
    const isUserPresent = await findUser(email);
    if (isUserPresent) {
      res.status(409).json({
        success: false,
        message: "EMAIL_ALREADY_PRESENT",
      });
    } else {
      await addUser(name, email.toLowerCase(), phone, password);
      res.status(201).json({
        success: true,
        message: "USER_CREATED_SUCCESSFULLY",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
