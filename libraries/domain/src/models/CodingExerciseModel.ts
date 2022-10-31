import type { CodingExercise } from "@link-to-code/types";

import { createModelFactory } from "../core/index";
import DataConsistencyError from "../errors/DataConsistencyError";

export type CodingExerciseModel = CodingExercise;

const createCodingExerciseModel = createModelFactory(
  ({ name, description = "", files, entry }: CodingExerciseModel): CodingExerciseModel => {
    if (files?.length && !files.some(({ filename }) => filename === entry)) {
      throw new DataConsistencyError(
        `Entry "${entry}" does not match any element in the list of provided files.`
      );
    }

    return {
      name,
      description,
      files,
      entry,
    };
  }
);

export { createCodingExerciseModel };
