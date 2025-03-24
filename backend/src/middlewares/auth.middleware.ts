import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env";

interface UserPayload {
  id: number;
  email: string;
}

// Extend Express Request type to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized, please login to continue." });
    return;
  }

  jwt.verify(token, envConfig.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden, invalid token." });
    }

    req.user = decoded as UserPayload; // Explicitly set req.user
    next();
  });
};
