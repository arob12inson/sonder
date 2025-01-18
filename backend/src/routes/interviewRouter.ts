import { Request, Response, Router } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const interviewRouter = Router();

// Define the type for the request body

interviewRouter.put("/", async (req: Request, res: Response) => {
    const {command} = req.body;

    if (!command) {
        res.status(400).send({ error: 'Command is required' });
        return;
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: command,
            },
        ],
    });

    res.send({ message: completion.choices[0].message.content });
});

export default interviewRouter;