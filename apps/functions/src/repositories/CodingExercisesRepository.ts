import { CodingExerciseTemplateEntity, Entity, toOmit, toRaw } from "@link-to-code/domain";

import db from "../firebase/db";

/**
 * This repository stores coding exercises in firebase
 */
export default class CodingExercisesRepository {
  /**
   * This method adds a coding exercise to the coding-exercises collection
   *
   * @param {Entity<CodingExerciseTemplateEntity>} codingExerciseTemplateEntity
   * @return {Promise<string>} Returns the id of the added coding exercise
   */
  public static async createCodingExerciseTemplate(
    codingExerciseTemplateEntity: Entity<CodingExerciseTemplateEntity>
  ): Promise<string> {
    const codingExerciseTemplateData = toRaw(toOmit(codingExerciseTemplateEntity, ["id"]), true);

    const res = await db.collection("coding-exercise-templates").add(codingExerciseTemplateData);
    return res.id;
  }
}
