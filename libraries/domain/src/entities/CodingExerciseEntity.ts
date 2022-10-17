import type { CodingExercise } from "@link-to-code/types";
import { codingExerciseSchema } from "@link-to-code/types/validators";

import Entity from "../abstract/Entity";

export class CodingExerciseEntity extends Entity<CodingExercise> {
  validate() {
    codingExerciseSchema.parse(this.get());
  }
}
