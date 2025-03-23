import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import prisma from "../config/prisma";
import {
  comparePassword,
  encryptPassword,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth-utils";

export const loginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const body = loginSchema.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: "Invalid input data." });
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: body.data.email },
    });

    if (!existingUser) {
      res.status(400).json({ error: "Please check your credentials." });
      return;
    }

    const checkPassword = await comparePassword(
      body.data.password,
      existingUser.password,
    );

    if (!checkPassword) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    // Generate tokens
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const { password, ...userWithoutPassword } = existingUser;
    res
      .status(200)
      .json({ accessToken, refreshToken, user: userWithoutPassword });
  } catch (error) {
    console.error("Error at the login endpoint", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const body = registerSchema.safeParse(req.body);

    if (!body.success) {
      res.status(400).json({ error: "Invalid input data." });
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: body.data.email },
    });

    if (existingUser) {
      res.status(400).json({ error: "User with this email already exists." });
      return;
    }

    const splited = body.data.name.split("@");

    const username = `${splited[0]}${Date.now().toString().slice(2, 8)}`;

    const hashedPassword = await encryptPassword(body.data.password);

    const user = await prisma.user.create({
      data: {
        name: body.data.name,
        password: hashedPassword,
        username: username,
        email: body.data.email,
      },
    });

    const { password, ...userWithoutPassword } = user;
    res.status(201).json({ user: userWithoutPassword });
  } catch (error: any) {
    console.error("Error in register endpoint:", error);

    if (error.code === "P2002") {
      res.status(400).json({ error: "Username already exists." });
    }

    res.status(500).json({ error: "Internal Server Error." });
  }
};
