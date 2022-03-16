import { Request, Response, NextFunction } from "express";

const test = (req: Request, res: Response) => {
  res.json({ msg: "Auth route test" });
};

export default { test };
