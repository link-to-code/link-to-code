import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { InterviewRoomLinks } from "@link-to-code/types";

import { InterviewRoomRepository } from "../repositories";

export const createInterviewRoom = async (codingExerciseTemplateId?: string): Promise<InterviewRoomLinks> => {
  if (!codingExerciseTemplateId) {
    throw new Error(
      "Mutation 'createInterviewRoom': 'codingExerciseTemplateId' is required to perform this mutation."
    );
  }

  return await InterviewRoomRepository.createInterviewRoom(codingExerciseTemplateId);
};

export const useCreateInterviewRoom = (
  mutationConfig: Omit<UseMutationOptions<InterviewRoomLinks, unknown, string | undefined>, "mutationFn"> = {}
) => {
  const { data, mutate, error, isLoading, isError, isSuccess } = useMutation({
    mutationFn: createInterviewRoom,
    ...mutationConfig,
  });

  return {
    data,
    mutate,
    error,
    isLoading,
    isError,
    isSuccess,
  };
};
