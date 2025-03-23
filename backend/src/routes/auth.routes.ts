import { Router, Request, Response } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controllers";

const authRoutes = Router();

authRoutes.get("/", (req: Request, res: Response) => {
  res.json({ message: "Auth route working!" });
});

authRoutes.post("/login", loginController);
authRoutes.post("/register", registerController);

export default authRoutes;
