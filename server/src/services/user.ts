import User from "../models/user";
import { hashPassword } from "./encrypt";

export const findUser = async (email: string) => {
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (user) {
    return true;
  } else {
    return false;
  };
};

export const getUser = async (email: string) => {
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (user) {
    return user;
  } else {
    return null;
  };
};

export const addUser = (
  name: string,
  email: string,
  phone: number,
  password: string
) => {
  return new Promise( async (resolve, reject) => {
    try {
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });
      resolve(user);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
