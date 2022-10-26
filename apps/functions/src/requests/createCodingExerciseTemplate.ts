// https://firebase.google.com/docs/functions/typescript

import * as functions from "firebase-functions";
import type { Request, Response } from "express";
import { z } from "zod";

import type { CodingExercise } from "@link-to-code/types";
import { codingExerciseSchema } from "@link-to-code/types/validators";

import { checkAuth } from "../auth/checkAuth";
import createCodingExerciseTemplateService from "../services/createCodingExerciseTemplateService";
import { validateRequestBody, handleError } from "../utils/index";

interface RequestBody {
  codingExercise: CodingExercise;
}

interface ResponseBody {
  permalink: string;
}

const requestBodySchema = z.object({
  codingExercise: codingExerciseSchema.strict(),
});

export const createCodingExerciseTemplate = functions.https.onRequest(
  async (request: Request<unknown, unknown, RequestBody>, response: Response<ResponseBody>) => {
    try {
      checkAuth(request);
      validateRequestBody(request.body, requestBodySchema);

      const permalink = await createCodingExerciseTemplateService(request.body.codingExercise);

      response.json({ permalink });
    } catch (error) {
      handleError(error, response);
    }
  }
);
