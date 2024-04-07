import User from "../models/user";
import { hashPassword } from "./encrypt";

const findUser = async (email: string) => {
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const addUser = async (
  name: string,
  email: string,
  phone: number,
  password: string
) => {
  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, phone, password: hashedPassword });
  } catch {
    
  }
};
