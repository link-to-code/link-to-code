// https://firebase.google.com/docs/functions/typescript

import * as functions from "firebase-functions";
import { z } from "zod";

import { codingExerciseTemplateSchema } from "@link-to-code/types/validators";

import { createInterviewRoomService, InterviewLinks } from "../services";
import { validateInputBody, handleCallError } from "../utils/index";

interface InputBody {
  codingExerciseTemplateId: string;
}

const inputBodySchema = z.object({
  codingExerciseTemplateId: codingExerciseTemplateSchema.shape.id,
});

export const createInterviewRoom = functions.https.onCall(
  async (data: InputBody): Promise<InterviewLinks | undefined> => {
    try {
      validateInputBody(data, inputBodySchema);
      const output = await createInterviewRoomService(data.codingExerciseTemplateId);

      return output;
    } catch (error) {
      handleCallError(error);
      return;
    }
  }
);
