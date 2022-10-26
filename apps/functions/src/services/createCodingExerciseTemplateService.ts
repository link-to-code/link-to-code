import { createCodingExerciseEntity, createCodingExerciseTemplateEntity } from "@link-to-code/domain";
import type { CodingExercise } from "@link-to-code/types";

import CodingExercisesRepository from "../repositories/CodingExercisesRepository";

/**
 * This service returns a new coding exercise creation link given a CodingExercise object.
 * @param {CodingExercise} codingExercise
 * @return {string} Returns the permalink for the provided coding exercise
 */
export default async function createCodingExerciseTemplateService(
  codingExercise: CodingExercise
): Promise<string> {
  const codingExerciseEntity = createCodingExerciseEntity(codingExercise);
  const codingExerciseTemplateEntity = createCodingExerciseTemplateEntity({
    codingExercise: codingExerciseEntity,
  });

  const id = await CodingExercisesRepository.createCodingExerciseTemplate(codingExerciseTemplateEntity);
  return `/coding-exercise-template/${id}`;
}
