/* eslint-disable @typescript-eslint/no-unused-vars */

import * as functions from "firebase-functions";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { handleRequestError } from "../utils";

import ping from "./ping";
import codingExerciseTemplates from "./codingExerciseTemplates";
import interviewRooms from "./interviewRooms";

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  functions.logger.info("Using development cors policies.");
  app.use(cors({ origin: true }));
}

app.use("/ping", ping);
app.use("/coding-exercise-templates", codingExerciseTemplates);
app.use("/interview-rooms", interviewRooms);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  handleRequestError(error, res);
});

export const api = functions.https.onRequest(app);
