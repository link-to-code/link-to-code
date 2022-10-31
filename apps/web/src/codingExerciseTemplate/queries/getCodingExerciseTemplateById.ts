import { useQuery } from "@tanstack/react-query";

import { CodingExerciseTemplateRepository } from "../repositories";

export const getCodingExerciseTemplateById = async (codingExerciseTemplateId?: string) => {
  if (!codingExerciseTemplateId) {
    throw new Error(
      "Query 'getCodingExerciseTemplateById': 'codingExerciseTemplateId' is required to perform this query."
    );
  }

  return (await CodingExerciseTemplateRepository.getById(codingExerciseTemplateId)) || null;
};

export const useGetCodingExerciseTemplateById = (codingExerciseTemplateId?: string) => {
  const { data, error, isLoading, isError, isSuccess } = useQuery(
    ["codingExerciseTemplateById", codingExerciseTemplateId],
    () => getCodingExerciseTemplateById(codingExerciseTemplateId)
  );

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  };
};
