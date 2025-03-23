import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z
  .string()
  .min(6, { message: "Password should be of minimum length 6" })
  .max(255);
const usernameSchema = z.string().min(1).max(255).optional();

export const registerSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
  name: z.string().min(3).max(25),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
