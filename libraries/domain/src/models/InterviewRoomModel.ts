import type { InterviewRoom } from "@link-to-code/types";

import { createModelFactory, Model } from "../core/index";

export type InterviewRoomModel = Omit<InterviewRoom, "codingExercise"> & {
  codingExercise: Model<InterviewRoom["codingExercise"]>;
};

const createInterviewRoomModel = createModelFactory(
  ({ id, codingExercise }: InterviewRoomModel): InterviewRoomModel => {
    return {
      id,
      codingExercise,
    };
  }
);

export { createInterviewRoomModel };
