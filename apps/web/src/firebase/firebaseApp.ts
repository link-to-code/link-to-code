import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
