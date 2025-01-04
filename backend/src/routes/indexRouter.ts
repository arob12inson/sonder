import express, { Router, Request, Response } from "express";

const indexRouter = Router();

indexRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello from the index router, world!\n");
});

export default indexRouter;