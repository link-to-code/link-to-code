import * as functions from "firebase-functions";

// https://firebase.google.com/docs/functions/typescript

export const ping = functions.https.onRequest((request, response) => {
  functions.logger.info("Ping");
  response.send("Ping");
});
