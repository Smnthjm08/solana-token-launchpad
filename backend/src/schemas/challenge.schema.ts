import { z } from "zod";
import { dateSchema } from ".";

export const ChallengeStatusEnum = z.enum([
  "UPCOMING",
  "IN_PROGRESS",
  "COMPLETED",
  "ENDED",
]);

export const ChallengeVisibilityEnum = z.enum(["PUBLIC", "PRIVATE"]);

export const VerificationMethodEnum = z.enum([
  "GOOGLE_FIT",
  "APPLE_HEALTH",
  "FITBIT",
]);

export const ParticipantStatusEnum = z.enum(["ACTIVE", "COMPLETED", "FAILED"]);

export const challengeSchema = z.object({
  name: z.string().min(4, "Challenge name must be at least 4 characters long"),
  description: z.string().optional(),
  duration: z.number().positive("Duration must be a positive number"),
  goalSteps: z.number().positive("Goal steps must be a positive number"),
  numParticipants: z.number().int().nonnegative(),
  prizeMoney: z.number().min(0, "Prize money cannot be negative"),
  entryAmount: z.number().min(0, "Entry amount cannot be negative"),
  status: ChallengeStatusEnum,
  featured: z.boolean().default(false),
  startDate: dateSchema,
  endDate: dateSchema,
  visibility: ChallengeVisibilityEnum,
  verificationMethod: VerificationMethodEnum,
  winnerDistribution: z.any().optional(),
  createdBy: z.number().int().positive(),
});
