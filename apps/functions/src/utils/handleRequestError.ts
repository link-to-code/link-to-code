import * as functions from "firebase-functions";
import { Response } from "express";
import { ZodError } from "zod";

import DataConsistencyError from "@link-to-code/domain/lib/errors/DataConsistencyError";

import { AuthError, NotFoundError } from "./errors";

/**
 * This function handles the response in case of errors
 *
 * @param {unknown} error An error
 * @param {Response} res The response object
 */
export default function handleRequestError(error: unknown, res: Response): void {
  functions.logger.error(error);

  if (error instanceof ZodError || error instanceof DataConsistencyError) {
    res.status(400).json({
      error: error.message,
    });

    return;
  }

  if (error instanceof AuthError) {
    res.status(401).json({
      error: error.message,
    });

    return;
  }

  if (error instanceof NotFoundError) {
    res.status(404).json({
      error: error.message,
    });

    return;
  }

  res.status(500).json({
    error: "Oops! An error occured...",
  });
}
