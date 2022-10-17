import type { CodingExercise } from "@link-to-code/types";
import * as functions from "firebase-functions";

import generateCodingExerciseCreationLink from "../services/generateCodingExerciseCreationLink";

// https://firebase.google.com/docs/functions/typescript

export const generateCreationLink = functions.https.onRequest(async (request, response) => {
  functions.logger.info("generateCreationLink", request.body);
  await generateCodingExerciseCreationLink(request.body as CodingExercise);
  response.json({ message: request.body.message, body: request.body });
});
