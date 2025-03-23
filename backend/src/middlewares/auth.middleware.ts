import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  // console.log("authHeader", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  // console.log("token", token);

  if (!token) {
    res.status(401).json({ error: "Unauthorized, please login to continue." });
    return;
  }

  jwt.verify(token, envConfig.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden, invalid token." });
    }
    console.log("user at middleware", user);

    req.user = user;
    next();
  });
};
