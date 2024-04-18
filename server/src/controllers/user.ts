import { NextFunction, Request, Response } from "express";
import { addUser, findUser, getUser } from "../services/user";
import { checkPassword, getJWT } from "../services/encrypt";
import { UserRequest } from "../middlewares/authentication";

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

export const LogIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user: any = await getUser(email);
    if (user) {
      const exists = await checkPassword(password, user.password);
      if (exists) {
        res.json({
          success: true,
          message: "Login successful",
          token: getJWT(user),
        });
      } else {
        res.status(401).json({
          success: false,
          message: "User not authorized",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
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

export const getGroups = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const groups = await req.user.getGroups({
      raw: true,
      attributes: ["name"],
    });
    res.json({
      success: true,
      groups,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
