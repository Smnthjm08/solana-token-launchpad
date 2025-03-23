import { z } from "zod";
import { emailSchema, usernameSchema, passwordSchema } from ".";

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
