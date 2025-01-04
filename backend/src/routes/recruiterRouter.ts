import { Request, Response, Router } from "express";

const recruiterRouter = Router();

recruiterRouter.get("/", (req: Request, res: Response) => {
  res.send("Recruiter route");
});

recruiterRouter.get("/:id", (req: Request, res: Response) => {
    res.send(`Recruiter route with id ${req.params.id}`);
});

export default recruiterRouter;