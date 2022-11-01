import * as functions from "firebase-functions";
import { Request, Response, Router } from "express";

// eslint-disable-next-line new-cap
const router = Router();

router.get("/", (_request: Request, response: Response) => {
  functions.logger.info("Ping");
  response.send("Ping");
});

export default router;
