import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";

import type { CodingExercise } from "@link-to-code/types";
import { codingExerciseSchema } from "@link-to-code/types/validators";

import { auth, validateInput } from "./middlewares/index";
import { createCodingExerciseTemplateService } from "../services/index";

interface RequestBody {
  codingExercise: CodingExercise;
}

interface ResponseBody {
  permalink: string;
}

const requestBodySchema = z.object({
  codingExercise: codingExerciseSchema.strict(),
});

// eslint-disable-next-line new-cap
const router = Router();

router.post(
  "/",
  auth(),
  validateInput(requestBodySchema),
  async (
    request: Request<unknown, unknown, RequestBody>,
    response: Response<ResponseBody>,
    next: NextFunction
  ) => {
    try {
      const permalink = await createCodingExerciseTemplateService(request.body.codingExercise);

      response.json({ permalink });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
