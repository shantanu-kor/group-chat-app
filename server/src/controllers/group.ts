import { NextFunction, Response } from "express";
import { UserRequest } from "../middlewares/authentication";
import Group from "../models/group";
import User from "../models/user";
import sequelize from "../utils/database";
import UserGroup from "../models/groupUser";

export const createGroup = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const { name } = req.body;
    const createdBy = req.user.email;
    let group = await Group.findOne({ where: { name }, transaction });
    if (group) {
      throw new Error("Group name already exists");
    }
    group = await Group.create({ name, createdBy }, { transaction });
    await req.user.addGroup(group, { transaction });
    await transaction.commit();
    res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const addMember = async (
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
    const userInGroup = await UserGroup.findOne({
      where: { groupId: group.id, userId: user.id },
      transaction,
    });
    if (userInGroup) {
      throw new Error("User already in group");
    }
    await user.addGroup(group, { transaction });
    await transaction.commit();
    res.status(201).json({
      success: true,
      message: "User added successfully",
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getGroupDetails = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();

  try {
    const name = req.params.name;
    const group: any = await Group.findOne({ where: { name }, transaction });
    if (!group) {
      throw new Error("Group not present");
    }
    const data: any = {};
    data["createdBy"] = group.createdBy;
    const users = await group.getUsers({
      raw: true,
      attributes: ["email"],
      transaction,
    });
    data["users"] = users;
    transaction.commit();
    res.json(data);
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
