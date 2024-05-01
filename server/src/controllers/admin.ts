import { NextFunction, Response } from "express";
import { UserRequest } from "../middlewares/authentication";
import sequelize from "../utils/database";
import Group from "../models/group";
import Admin from "../models/admin";
import User from "../models/user";
import UserGroup from "../models/groupUser";

export const isAdmin = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const name = req.query.name;
    const group: any = await Group.findOne({ where: { name }, transaction });
    if (!group) {
      throw new Error("Group not present");
    }
    const admin: any = await Admin.findOne({
      where: { groupId: group.id, userId: req.user.id },
      transaction,
    });
    await transaction.commit();
    if (admin) {
      res.json({
        success: true,
        message: "User is an admin",
        admin: true,
      });
    } else {
      res.json({
        success: true,
        message: "User is not admin",
        admin: false,
      });
    }
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAdmins = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const name = req.query.name;
    const group: any = await Group.findOne({ where: { name }, transaction });
    if (!group) {
      throw new Error("Group not present");
    }
    const admins = await group.getUserAdmins({
      attributes: ["email"],
      joinTableAttributes: [],
      transaction,
    });
    const emails = [];
    for (let i of admins) {
      emails.push(i.email);
    }
    await transaction.commit();
    res.json({
      success: true,
      message: "Admins found",
      admins: emails,
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const makeAdmin = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const { email, name } = req.body;
    const user: any = await User.findOne({ where: { email }, transaction });
    if (!user) {
      throw new Error("User not present");
    }
    const group: any = await Group.findOne({ where: { name }, transaction });
    if (!group) {
      throw new Error("Group not present");
    }
    const admin = await user.addGroupAdmin(group, { transaction });
    if (admin) {
      await transaction.commit();
      res.json({
        success: true,
        message: "The user is now admin",
      });
    } else {
      throw new Error("The user cannot be made admin");
    }
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const removeMember = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const { email, name } = req.body;
    const user: any = await User.findOne({ where: { email }, transaction });
    if (!user) {
      throw new Error("User not present");
    }
    const group: any = await Group.findOne({ where: { name }, transaction });
    if (!group) {
      throw new Error("Group not present");
    }
    const userGroup = await UserGroup.findOne({
      where: { groupId: group.id, userId: user.id },
      transaction,
    });
    await userGroup?.destroy({ transaction });
    await transaction.commit();
    res.json({
      success: true,
      message: "User removed from group",
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
