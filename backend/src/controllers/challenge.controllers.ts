import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAllChallenges = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Your logic here
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
    // Your logic here
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
    // Your logic here
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
    // Your logic here
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
    // Your logic here
  } catch (error) {
    console.error("Error deleting challenge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
