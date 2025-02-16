import axios from "axios";

export async function analyzeTranscript(transcript: string): Promise<string> {
  // Define the prompt for ChatGPT
  const prompt = `
You are an expert interviewer and talent evaluator. Analyze the following interview response and provide qualitative metrics in a clear and concise format.
- Comment on the candidate's enthusiasm, clarity, confidence, and overall communication skills.
- Offer a brief summary highlighting strengths and potential areas for improvement.

Interview Response:
${transcript}
  `.trim();

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert interviewer and talent evaluator." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    // Return the assistant's message text as the analysis result
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error("Error analyzing transcript:", error.response?.data || error.message);
    throw new Error("Transcript analysis failed.");
  }
}
