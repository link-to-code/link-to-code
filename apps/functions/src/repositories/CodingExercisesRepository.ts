import type { CodingExerciseEntity } from "@link-to-code/domain";
import type { CodingExercise } from "@link-to-code/types";

import db from "../firebase/db";

/**
 * This repository stores coding exercises in firebase
 */
export default class CodingExercisesRepository {
  /**
   * This method adds a coding exercise to the coding-exercises collection
   *
   * @param {CodingExerciseEntity} codingExerciseEntity
   * @return {Promise<string>} Returns the id of the added coding exercise
   */
  public static async createCodingExercise(codingExerciseEntity: CodingExerciseEntity): Promise<string> {
    const res = await db.collection("coding-exercises").add(codingExerciseEntity.get() as CodingExercise);
    return res.id;
  }
}
