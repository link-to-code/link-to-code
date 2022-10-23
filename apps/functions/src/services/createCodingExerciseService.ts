import { createCodingExerciseEntity } from "@link-to-code/domain";
import type { CodingExercise } from "@link-to-code/types";

import CodingExercisesRepository from "../repositories/CodingExercisesRepository";

/**
 * This service returns a new coding exercise creation link given a CodingExercise object.
 * @param {CodingExerciseEntity} codingExercise
 * @return {string} Returns the permalink for the provided coding exercise
 */
export default async function createCodingExerciseService(codingExercise: CodingExercise): Promise<string> {
  const codingExerciseEntity = createCodingExerciseEntity(codingExercise);

  const id = await CodingExercisesRepository.createCodingExercise(codingExerciseEntity);
  return `/coding-exercises/${id}`;
}
