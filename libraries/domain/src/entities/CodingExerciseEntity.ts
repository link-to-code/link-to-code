import type { CodingExercise } from "@link-to-code/types";

import { createEntityFactory } from "../core";
import DataConsistencyError from "../errors/DataConsistencyError";

const createCodingExerciseEntity = createEntityFactory(
  ({
    id,
    name,
    files,
    entry,
  }: {
    id?: CodingExercise["id"];
    name: CodingExercise["name"];
    files: CodingExercise["files"];
    entry: CodingExercise["entry"];
  }): CodingExercise => {
    if (files?.length && !files.some(({ filename }) => filename === entry)) {
      throw new DataConsistencyError(
        `Entry "${entry}" does not match any element in the list of provided files.`
      );
    }

    return {
      id,
      name,
      files,
      entry,
    };
  }
);

export { createCodingExerciseEntity };
