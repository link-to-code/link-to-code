import type { Request } from "express";
import * as functions from "firebase-functions";

import { AuthError } from "../utils/errors";
import { decodeBearerToken, extractTokenFromHeader } from "./utils";

import { getFromEnv } from "../config";

/**
 * This function checks if the user has provided the correct admin authentication secret.
 * Throws an `AuthError` if the authorization header is not provided or if the secret is not valid.
 *
 * @param {Request} req
 */
export function checkAuth(req: Request<unknown, unknown, unknown>): void {
  const authToken = extractTokenFromHeader(req.headers.authorization || "");

  if (!authToken) {
    throw new AuthError("Missing requried authentication bearer token.");
  }

  const secret = decodeBearerToken(authToken);
  if (secret !== getFromEnv("ADMIN_SECRET")) {
    functions.logger.info(`Failed authentication attemp using secret "${secret}"`);
    throw new AuthError("Invalid authentication admin secret.");
  }
}
