import { CodingExerciseTemplateModel, Model, toOmit, toRaw } from "@link-to-code/domain";

import db from "../firebase/db";

/**
 * This repository stores coding exercises in firebase
 */
export const CodingExercisesRepository = {
  /**
   * This method adds a coding exercise to the coding-exercises collection
   *
   * @param {Model<CodingExerciseTemplateModel>} codingExerciseTemplateModel
   * @return {Promise<string>} Returns the id of the added coding exercise
   */
  async createCodingExerciseTemplate(
    codingExerciseTemplateModel: Model<CodingExerciseTemplateModel>
  ): Promise<string> {
    const codingExerciseTemplateData = toRaw(toOmit(codingExerciseTemplateModel, ["id"]), true);

    const res = await db.collection("coding-exercise-templates").add(codingExerciseTemplateData);
    return res.id;
  },
};
