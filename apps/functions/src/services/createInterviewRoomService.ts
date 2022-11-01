import { createInterviewRoomAdminSpaceModel, createInterviewRoomModel } from "@link-to-code/domain";
import {
  CodingExerciseTemplatesRepository,
  InterviewRoomAdminSpacesRepository,
  InterviewRoomsRepository,
} from "../repositories";

import { NotFoundError } from "../utils/errors";

export interface InterviewLinks {
  guestLink: string;
  adminLink: string;
}

/**
 * This service returns a new coding exercise creation link given a CodingExercise object.
 * @param {string} codingExerciseTemplateId
 * @return {Promise<InterviewLinks>} Returns the permalink for the provided coding exercise
 */
export async function createInterviewRoomService(codingExerciseTemplateId: string): Promise<InterviewLinks> {
  const codingExerciseTemplateModel = await CodingExerciseTemplatesRepository.getCodingExerciseTemplateById(
    codingExerciseTemplateId
  );

  if (codingExerciseTemplateModel === null) {
    throw new NotFoundError(`Unable to find CodingExerciseTemplate with id '${codingExerciseTemplateId}'`);
  }

  const interviewRoomModel = createInterviewRoomModel({
    codingExercise: codingExerciseTemplateModel.codingExercise,
  });

  const interviewRoomModelId = await InterviewRoomsRepository.createInterviewRoom(interviewRoomModel);

  const interviewRoomAdminSpaceModel = createInterviewRoomAdminSpaceModel({
    interviewRoomId: interviewRoomModelId,
  });

  const interviewRoomAdminSpaceId = await InterviewRoomAdminSpacesRepository.createInterviewRoomAdminSpace(
    interviewRoomAdminSpaceModel
  );

  return {
    guestLink: `/interview/${interviewRoomModelId}`,
    adminLink: `/interview/a/${interviewRoomAdminSpaceId}`,
  };
}
