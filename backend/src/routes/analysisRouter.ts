import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { transcribeAudio } from "../services/transcriptionService";
import { analyzeTranscript } from "../services/analysisService";

const router = express.Router();

// Configure multer to store file in a temporary folder
const upload = multer({ dest: path.join(__dirname, "../../temp") });

router.post("/", upload.single("audio"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
       res.status(400).json({ error: "No audio file provided" });
       return
    }

    // req.file.path holds the temporary file path
    const audioFilePath = req.file.path;
    console.log(`[Analyze] Received audio file at: ${audioFilePath}`);

    // Call transcription service (using OpenAI Whisper)
    const transcript = await transcribeAudio(audioFilePath);
    console.log(`[Analyze] Transcription result: ${transcript}`);

    // Call analysis service (using ChatGPT API)
    const analysis = await analyzeTranscript(transcript);
    console.log(`[Analyze] Analysis result: ${analysis}`);

    // Optionally, delete the temporary file if needed
    // fs.unlinkSync(audioFilePath);

    res.status(200).json({ analysis });
    return
  } catch (error: any) {
    console.error("[Analyze] Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
    return
  }
});

export default router;
