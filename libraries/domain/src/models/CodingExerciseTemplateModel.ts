import type { CodingExerciseTemplate } from "@link-to-code/types";

import { createModelFactory, Model } from "../core/index";
import { CodingExerciseModel } from "./CodingExerciseModel";

export type CodingExerciseTemplateModel = Omit<CodingExerciseTemplate, "codingExercise"> & {
  codingExercise: Model<CodingExerciseModel>;
};

const createCodingExerciseTemplateModel = createModelFactory(
  ({ id, codingExercise }: CodingExerciseTemplateModel): CodingExerciseTemplateModel => {
    return {
      id,
      codingExercise,
    };
  }
);

export { createCodingExerciseTemplateModel };
