import { CodingExerciseEntity } from "@link-to-code/domain";

import type { CodingExercise } from "@link-to-code/types";

/**
 * This service returns a new coding exercise creation link given a CodingExercise object.
 * @param {CodingExerciseEntity} codingExercise
 */
export default async function generateCodingExerciseCreationLink(codingExercise: CodingExercise) {
  const codingExerciseEntity = new CodingExerciseEntity(codingExercise);
  console.log(codingExerciseEntity);
}
