import { Response } from "express";
import prisma from "../config/prisma";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export const joinChallengeController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const challengeId = req.params.id;
    const userId = req?.user?.id;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    if (!challengeId) {
      res.status(400).json({ message: "Invalid challenge id" });
      return;
    }

    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      res.status(404).json({ message: "Challenge not found" });
      return;
    }

    if (challenge.startDate < new Date()) {
      res.status(400).json({ message: "Challenge has already started" });
      return;
    }

    // Allow user to join the challenge
    await prisma.challengeParticipant.create({
      data: {
        challengeId,
        // @ts-ignore
        userId,
        status: "ACTIVE",
      },
    });

    res.status(200).json({ message: "Successfully joined the challenge" });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Internal server error" });
  }
};
