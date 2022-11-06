import { CodingExercise } from "@link-to-code/types";

export type InitOptions = {
  filePath?: string;
  name: string;
  entry: string;
  description?: string;
  dryRun?: boolean;
};
export type FileContent = Omit<CodingExercise, "files">;
