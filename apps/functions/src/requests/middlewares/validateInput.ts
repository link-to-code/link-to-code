import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

import { validateInputBody } from "../../utils";

export const validateInput =
  (requestBodySchema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    validateInputBody(req.body, requestBodySchema);
    next();
  };
