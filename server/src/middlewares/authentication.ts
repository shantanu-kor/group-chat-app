import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";

import User from "../models/user";
import { NextFunction, Request, Response } from "express";

config();

type UserObject = Record<string, any>;

export interface UserRequest extends Request {
  user: UserObject;
}

export const authenticate = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    const { userId } = jwt.verify(
      token as string,
      process.env.JWT_PASSWORD as string
    ) as JwtPayload;
    const user = await User.findByPk(userId);
    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("User not Found");
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
