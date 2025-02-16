import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import indexRouter from "./routes/indexRouter";
import recruiterRouter from "./routes/recruiterRouter";
import audioSocket from "./routes/audioSocket";   // Our Socket.IO handler
import analyzeRouter from "./routes/analysisRouter"; // New analyze endpoint

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Create an HTTP server and attach Express app
const server = http.createServer(app);

// Initialize Socket.IO
const io = new SocketIOServer(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// Traditional REST API routes (if needed)
app.use("/", indexRouter);
app.use("/recruiter", recruiterRouter);
app.use("/analyze", analyzeRouter);


// Set up Socket.IO for real-time audio streaming
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  audioSocket(socket);
});

server.listen(PORT, () => {
  console.log(`[server]: Server is running on http://localhost:${PORT}!`);
});
