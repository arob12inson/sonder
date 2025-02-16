import { Socket } from "socket.io";
import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.join(__dirname, "../../uploads");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
  console.log("[Backend] Uploads directory created:", UPLOADS_DIR);
}

const MIN_CHUNK_SIZE = 100; // Minimal valid chunk size in bytes

const audioSocket = (socket: Socket) => {
  console.log(`[Backend] Socket connected: ${socket.id}`);
  
  const sessionDir = path.join(UPLOADS_DIR, `session-${Date.now()}-${socket.id}`);
  fs.mkdirSync(sessionDir);
  console.log(`[Backend] Session directory created: ${sessionDir}`);

  const completeFilePath = path.join(sessionDir, "complete.webm");
  const completeStream = fs.createWriteStream(completeFilePath, { flags: "a" });
  console.log(`[Backend] Continuous write stream created: ${completeFilePath}`);

  let completeChunkIndex = 1;
  let isRecording = true;

  // Handle continuous chunks to build the complete file
  socket.on("audio-chunk", (data: Buffer | ArrayBuffer) => {
    console.log(`[Backend] Received 'audio-chunk' event.`);
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
    console.log(`[Backend] Writing ${buffer.length} bytes to complete file.`);
    completeStream.write(buffer);
  });

  // Process self-contained chunks without checking isRecording
  socket.on("audio-chunk-complete", (data: Buffer | ArrayBuffer) => {
    console.log(`[Backend] Received 'audio-chunk-complete' event.`);
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
    if (buffer.length < MIN_CHUNK_SIZE) {
      console.warn(`[Backend] Discarding chunk ${completeChunkIndex} due to small size: ${buffer.length} bytes.`);
      return;
    }
    const chunkPath = path.join(sessionDir, `complete-chunk-${completeChunkIndex}.webm`);
    fs.writeFile(chunkPath, buffer, (err) => {
      if (err) console.error(`[Backend] Error writing chunk ${completeChunkIndex}:`, err);
      else console.log(`[Backend] Saved complete chunk ${completeChunkIndex} (${buffer.length} bytes).`);
    });
    completeChunkIndex++;
  });

  // Delay closing the complete file to allow final data to arrive
  socket.on("audio-end", () => {
    console.log(`[Backend] Received 'audio-end' for ${socket.id}. Delaying closure for final flush.`);
    setTimeout(() => {
      isRecording = false;
      completeStream.end();
      console.log(`[Backend] Recording complete. File saved at: ${completeFilePath}`);
    }, 1000); // Delay 1000ms (adjust as needed)
  });

  socket.on("disconnect", () => {
    console.log(`[Backend] Client disconnected: ${socket.id}`);
    if (isRecording) {
      isRecording = false;
      completeStream.end();
      console.log(`[Backend] Recording stopped due to disconnect.`);
    }
  });
};

export default audioSocket;
