import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import challengesRoutes from "./routes/challenge.routes";
import joinChallengeRoutes from "./routes/join-challenges.routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/challenges", challengesRoutes);
app.use("/api/join-challenge", joinChallengeRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
