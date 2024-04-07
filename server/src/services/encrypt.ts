import bcrypt from "bcrypt";

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
