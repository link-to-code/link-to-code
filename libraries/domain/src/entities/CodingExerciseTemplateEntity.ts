import type { CodingExerciseTemplate } from "@link-to-code/types";

import { createEntityFactory, Entity } from "../core/index";

export type CodingExerciseTemplateEntity = Omit<CodingExerciseTemplate, "codingExercise"> & {
  codingExercise: Entity<CodingExerciseTemplate["codingExercise"]>;
};

const createCodingExerciseTemplateEntity = createEntityFactory(
  ({ id, codingExercise }: CodingExerciseTemplateEntity): CodingExerciseTemplateEntity => {
    return {
      id,
      codingExercise,
    };
  }
);

export { createCodingExerciseTemplateEntity };
