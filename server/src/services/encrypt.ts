import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const hashPassword = (password: string) => {
  const saltRounds = 15;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(hash);
    });
  });
};

export const checkPassword = (password: string, string: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, string, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (result) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export const getJWT = (user: any) => {
  return jwt.sign(
    { userId: user.id, name: user.name },
    process.env.JWT_PASSWORD as string
  );
};
