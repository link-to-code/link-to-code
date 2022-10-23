import { Entity, toRawOmit } from "@link-to-code/domain";
import { CodingExercise } from "@link-to-code/types";

import db from "../firebase/db";

/**
 * This repository stores coding exercises in firebase
 */
export default class CodingExercisesRepository {
  /**
   * This method adds a coding exercise to the coding-exercises collection
   *
   * @param {Entity<CodingExercise>} codingExerciseEntity
   * @return {Promise<string>} Returns the id of the added coding exercise
   */
  public static async createCodingExercise(codingExerciseEntity: Entity<CodingExercise>): Promise<string> {
    const codingExerciseData = toRawOmit(codingExerciseEntity, ["id"]);

    const res = await db.collection("coding-exercises").add(codingExerciseData);
    return res.id;
  }
}
