import { NextFunction, Request, Response } from "express";
import { checkAuth } from "../../auth";

export const auth = () => (req: Request, res: Response, next: NextFunction) => {
  checkAuth(req);
  next();
};
