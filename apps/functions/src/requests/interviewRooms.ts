import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";

import { codingExerciseTemplateSchema } from "@link-to-code/types/validators";

import { createInterviewRoomService, InterviewLinks } from "../services/index";
import { validateInput } from "./middlewares/index";

interface RequestBody {
  codingExerciseTemplateId: string;
}

const requestBodySchema = z.object({
  codingExerciseTemplateId: codingExerciseTemplateSchema.shape.id,
});

// eslint-disable-next-line new-cap
const router = Router();

router.post(
  "/",
  validateInput(requestBodySchema),
  async (
    request: Request<unknown, unknown, RequestBody>,
    response: Response<InterviewLinks>,
    next: NextFunction
  ) => {
    try {
      const links = await createInterviewRoomService(request.body.codingExerciseTemplateId);

      response.json(links);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
