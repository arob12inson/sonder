import { Request, Response, Router } from "express";

const interviewRouter = Router();

// Define the type for the request body
interface CommandRequestBody {
    command: string;
}

interviewRouter.put("/", (req: Request, res: Response) => {
    const {command} = req.body;

    if (!command) {
        res.status(400).send({ error: 'Command is required' });
        return;
    }

    res.send({ message: `received command ${command}` });
});

export default interviewRouter;