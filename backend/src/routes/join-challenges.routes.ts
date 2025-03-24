import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { joinChallengeController } from "../controllers/joinChallenge.controller";

const joinChallengeRoutes = Router();

joinChallengeRoutes.get("/", (req, res) => {
  res.json("join challenges endpoint is fine");
});

joinChallengeRoutes.post("/:id", authMiddleware, joinChallengeController);

export default joinChallengeRoutes;
