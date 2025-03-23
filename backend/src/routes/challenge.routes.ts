import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createChallenge,
  deleteChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallenge,
} from "../controllers/challenge.controllers";

const challengesRoutes = Router();

challengesRoutes.get("/", authMiddleware, getAllChallenges);
challengesRoutes.post("/", authMiddleware, createChallenge);
challengesRoutes.get("/:id", authMiddleware, getChallengeById);
challengesRoutes.put("/:id", authMiddleware, updateChallenge);
challengesRoutes.delete("/:id", authMiddleware, deleteChallenge);

export default challengesRoutes;
