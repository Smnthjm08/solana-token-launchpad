import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();

dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
