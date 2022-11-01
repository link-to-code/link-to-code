import {
  createCodingExerciseTemplateModel,
  createCodingExerciseModel,
  CodingExerciseTemplateModel,
  Model,
  toOmit,
  toRaw,
} from "@link-to-code/domain";
import { CodingExerciseTemplate } from "@link-to-code/types";

import db from "../../firebase/db";

const COLLECTION_NAME = "coding-exercise-templates";

/**
 * @param {Model<CodingExerciseTemplateModel>} codingExerciseTemplateModel
 * @return {Promise<string>} Returns the id of the added coding exercise
 */
export async function createCodingExerciseTemplate(
  codingExerciseTemplateModel: Model<CodingExerciseTemplateModel>
): Promise<string> {
  const codingExerciseTemplateData = toRaw(toOmit(codingExerciseTemplateModel, ["id"]), true);

  const res = await db.collection(COLLECTION_NAME).add(codingExerciseTemplateData);
  return res.id;
}

/**
 * @param {Required<CodingExerciseTemplate.id>} codingExerciseTemplateId
 * @return {Promise<Model<CodingExerciseTemplateModel> | null>} Returns a CodingExerciseTemplate model or null in case of no data for the provided id
 */
export async function getCodingExerciseTemplateById(
  codingExerciseTemplateId: string
): Promise<Model<CodingExerciseTemplateModel> | null> {
  const doc = await db.collection(COLLECTION_NAME).doc(codingExerciseTemplateId).get();

  if (!doc.exists) {
    return null;
  }

  const codingExerciseTemplateData = doc.data() as CodingExerciseTemplate;

  const codingExerciseModel = createCodingExerciseModel({
    name: codingExerciseTemplateData.codingExercise.name,
    files: codingExerciseTemplateData.codingExercise.files,
    entry: codingExerciseTemplateData.codingExercise.entry,
    description: codingExerciseTemplateData.codingExercise.description,
  });

  const codingExerciseTemplateModel = createCodingExerciseTemplateModel({
    id: doc.id,
    codingExercise: codingExerciseModel,
  });

  return codingExerciseTemplateModel;
}
