import type { CodingExercise, CodingExerciseWithId } from "@link-to-code/types";

import Entity from "../abstract/Entity";
import DataConsistencyError from "../errors/DataConsistencyError";

export class CodingExerciseEntity extends Entity<CodingExercise | CodingExerciseWithId> {
  validate() {
    const { files, entry } = this.data || {};
    if (files?.length && !files.some(({ filename }) => filename === entry)) {
      throw new DataConsistencyError(
        `Entry "${entry}" does not match any element in the list of provided files.`
      );
    }
  }
}
