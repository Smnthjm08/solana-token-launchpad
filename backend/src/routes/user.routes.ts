import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.get("/", authMiddleware, (req: Request, res: Response) => {
  res.json({ message: "user route working!" });
});

userRoutes.get("/:id", authMiddleware, getUser);
userRoutes.put("/:id", authMiddleware, updateUser);
userRoutes.delete("/:id", authMiddleware, deleteUser);

export default userRoutes;
