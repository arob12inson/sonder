import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export async function transcribeAudio(filePath: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));
  formData.append("model", "whisper-1");

  try {
    const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        ...formData.getHeaders(),
      },
    });
    // Assuming the response contains a "text" field with the transcription
    return response.data.text;
  } catch (error: any) {
    console.error("Error transcribing audio:", error.response?.data || error.message);
    throw new Error("Transcription failed.");
  }
}
