import * as functions from "firebase-functions";
import { ZodError } from "zod";

import DataConsistencyError from "@link-to-code/domain/lib/errors/DataConsistencyError";

import { AuthError, NotFoundError } from "./errors";

/**
 * This function handles the firebase function call in case of errors
 *
 * @param {unknown} error An error
 */
export default function handleCallError(error: unknown): void {
  functions.logger.error(error);

  if (error instanceof ZodError || error instanceof DataConsistencyError) {
    throw new functions.https.HttpsError("invalid-argument", error.message);
  }

  if (error instanceof AuthError) {
    throw new functions.https.HttpsError("permission-denied", error.message);
  }

  if (error instanceof NotFoundError) {
    throw new functions.https.HttpsError("not-found", error.message);
  }

  if (error instanceof Error) {
    throw new functions.https.HttpsError("unknown", error.message);
  }

  throw new functions.https.HttpsError(
    "unknown",
    "An unrecognised error occured... Contact the admin or if it's you, check the logs!"
  );
}
