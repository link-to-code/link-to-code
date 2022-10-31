import { getFirestore, connectFirestoreEmulator } from "firebase/firestore/lite";

import { firebaseApp } from "./firebaseApp";

export const firestore = getFirestore(firebaseApp);
if (process.env.NODE_ENV !== "production") {
  connectFirestoreEmulator(firestore, "localhost", 8080);
}
