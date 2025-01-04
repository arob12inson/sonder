import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import indexRouter from "./routes/indexRouter";
import recruiterRouter from "./routes/recruiterRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/", indexRouter);
app.use("/recruiter", recruiterRouter);

app.listen(PORT, () => {
    console.log(`[server]: server is running on http://localhost:${PORT}!`);
})