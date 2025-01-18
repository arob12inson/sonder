import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import indexRouter from "./routes/indexRouter";
import recruiterRouter from "./routes/recruiterRouter";
import interviewRouter from "./routes/interviewRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

app.use("/", indexRouter);
app.use("/recruiter", recruiterRouter);
app.use("/interview", interviewRouter);

app.listen(PORT, () => {
    console.log(`[server]: server is running on http://localhost:${PORT}!`);
})