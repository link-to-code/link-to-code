import { CodingExercise } from "@link-to-code/types";

export type ExerciseSettingsFile = Omit<CodingExercise, "files"> & {
  apiUrl: string;
  files?: CodingExercise["files"];
  permaLink?: string;
};
