import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createChallenge,
  deleteChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallenge,
} from "../controllers/challenge.controller";

const challengesRoutes = Router();

// challenges kept public for now as user can see all challenges before signup
challengesRoutes.get("/", getAllChallenges);
challengesRoutes.post("/", authMiddleware, createChallenge);
challengesRoutes.get("/:id", authMiddleware, getChallengeById);
challengesRoutes.put("/:id", authMiddleware, updateChallenge);
challengesRoutes.delete("/:id", authMiddleware, deleteChallenge);

export default challengesRoutes;
