import * as functions from "firebase-functions";
import { Response } from "express";
import { ZodError } from "zod";

import DataConsistencyError from "@link-to-code/domain/lib/errors/DataConsistencyError";

/**
 * This function handles the response in case of errors
 *
 * @param {unknown} error An error
 * @param {Response} res The response object
 */
export default function handleError(error: unknown, res: Response): void {
  functions.logger.error(error);

  if (error instanceof ZodError || error instanceof DataConsistencyError) {
    res.status(400).json({
      error: error.message,
    });

    return;
  }

  res.status(500).json({
    error: "Oops! An error occured...",
  });
}
