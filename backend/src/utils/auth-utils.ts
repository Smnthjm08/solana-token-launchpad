import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env";

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (plain: string, hashed: string) => {
  return bcrypt.compare(plain, hashed);
};

export const generateAccessToken = (user: any) => {
  return jwt.sign({ id: user.id, email: user.email }, envConfig.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user.id }, envConfig.JWT_SECRET, { expiresIn: "7d" });
};
