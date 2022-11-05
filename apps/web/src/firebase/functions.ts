import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import { firebaseApp } from "./firebaseApp";

export const functions = getFunctions(firebaseApp);
if (process.env.NODE_ENV !== "production") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}
