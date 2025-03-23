import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(255);

export const passwordSchema = z
  .string()
  .min(6, { message: "Password should be of minimum length 6" })
  .max(255);

export const usernameSchema = z.string().min(1).max(255).optional();

export const dateSchema = z.string().transform((val) => new Date(val));
