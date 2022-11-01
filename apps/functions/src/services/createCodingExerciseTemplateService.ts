import { createCodingExerciseModel, createCodingExerciseTemplateModel } from "@link-to-code/domain";
import type { CodingExercise } from "@link-to-code/types";

import { CodingExerciseTemplatesRepository } from "../repositories";

/**
 * This service returns a new coding exercise creation link given a CodingExercise object.
 * @param {CodingExercise} codingExercise
 * @return {string} Returns the permalink for the provided coding exercise
 */
export async function createCodingExerciseTemplateService(codingExercise: CodingExercise): Promise<string> {
  const codingExerciseModel = createCodingExerciseModel(codingExercise);
  const codingExerciseTemplateModel = createCodingExerciseTemplateModel({
    codingExercise: codingExerciseModel,
  });

  const id = await CodingExerciseTemplatesRepository.createCodingExerciseTemplate(
    codingExerciseTemplateModel
  );
  return `/coding-exercise-template/${id}`;
}
