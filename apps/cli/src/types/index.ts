import { CodingExercise } from "@link-to-code/types";

export type ExerciseSettingsFile = Omit<CodingExercise, "files"> & {
  files?: CodingExercise["files"];
  permaLink?: string;
};
