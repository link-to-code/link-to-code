import type { InterviewRoomAdminSpace } from "@link-to-code/types";

import { createModelFactory } from "../core/index";

export type InterviewRoomAdminSpaceModel = InterviewRoomAdminSpace;

const createInterviewRoomAdminSpaceModel = createModelFactory(
  ({ id, interviewRoomId }: InterviewRoomAdminSpaceModel): InterviewRoomAdminSpaceModel => {
    return {
      id,
      interviewRoomId,
    };
  }
);

export { createInterviewRoomAdminSpaceModel };
