import { Request, Response } from "express";
import prisma from "../config/prisma";
import { challengeSchema } from "../schemas/challenge.schema";

export const getAllChallenges = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const challenges = await prisma.challenge.findMany();
    console.log("challenges", challenges);
    res.status(200).json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createChallenge = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const challengesData = challengeSchema.safeParse(req.body);

    if (!challengesData.success) {
      res
        .status(400)
        .json({ message: "Invalid data", errors: challengesData.error });
      return;
    }

    const challenges = await prisma.challenge.create({
      data: challengesData.data,
    });

    res.status(201).json(challenges);
  } catch (error) {
    console.error("Error creating challenge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getChallengeById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const challengeId = Number(req.params.id);
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });
    if (!challenge) {
      res.status(404).json({ message: "Challenge not found" });
      return;
    }
    res.status(200).json(challenge);
  } catch (error) {
    console.error("Error fetching challenge by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateChallenge = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const challengeId = Number(req.params.id);
    const challengeData = challengeSchema.safeParse(req.body);

    if (!challengeData.success) {
      res
        .status(400)
        .json({ message: "Invalid data", errors: challengeData.error });
      return;
    }

    const challenge = await prisma.challenge.update({
      where: { id: challengeId },
      data: challengeData.data,
    });

    res.status(200).json(challenge);
  } catch (error) {
    console.error("Error updating challenge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteChallenge = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const challengeId = Number(req.params.id);
    if (!challengeId) {
      res.status(404).json({ message: "Challenge not found" });
    }
    await prisma.challenge.delete({
      where: { id: challengeId },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting challenge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
