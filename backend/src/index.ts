import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!\n");
})

app.listen(PORT, () => {
    console.log(`[server]: server is running on http://localhost:${PORT}!`);
})