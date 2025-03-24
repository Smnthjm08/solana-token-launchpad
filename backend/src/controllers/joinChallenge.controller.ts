import { Response, Request } from "express";
import prisma from "../config/prisma";

export const joinChallengeController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = req.body;
    console.log("challee", data.challengeId);

    if (!req.user) {
      res.status(401).json({ message: "User not authenticated." });
      return;
    }

    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "User ID missing from request" });
      return;
    }

    if (!data?.challengeId) {
      res.status(400).json({ message: "Invalid challenge id" });
      return;
    }

    const challengeParticipant = await prisma.challengeParticipant.findFirst({
      where: { userId: userId },
    });

    if (challengeParticipant?.userId === userId) {
      res.status(400).json({ message: "Already joined the challenge." });
      return;
    }

    const challenge = await prisma.challenge.findUnique({
      where: { id: data?.challengeId },
    });

    if (!challenge) {
      res.status(404).json({ message: "Challenge not found." });
      return;
    }

    if (challenge.startDate < new Date()) {
      res.status(400).json({ message: "Challenge has already started." });
      return;
    }

    await prisma.challengeParticipant.create({
      data: {
        challengeId: data?.challengeId,
        userId: userId,
        status: "ACTIVE",
      },
    });

    res.status(200).json({ message: "Successfully joined the challenge." });
    return;
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Internal server error" });
  }
};
