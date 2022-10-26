import type { CodingExercise } from "@link-to-code/types";

import { createEntityFactory } from "../core";
import DataConsistencyError from "../errors/DataConsistencyError";

export type CodingExerciseEntity = CodingExercise;

const createCodingExerciseEntity = createEntityFactory(
  ({ name, files, entry }: CodingExercise): CodingExercise => {
    if (files?.length && !files.some(({ filename }) => filename === entry)) {
      throw new DataConsistencyError(
        `Entry "${entry}" does not match any element in the list of provided files.`
      );
    }

    return {
      name,
      files,
      entry,
    };
  }
);

export { createCodingExerciseEntity };
