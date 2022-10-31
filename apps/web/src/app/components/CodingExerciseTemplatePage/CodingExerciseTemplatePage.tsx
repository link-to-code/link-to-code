import React from "react";
import { useParams } from "react-router-dom";
import { Logo, LogoSize, CodingExerciseCard } from "@link-to-code/ui";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import { useGetCodingExerciseTemplateById } from "../../../codingExerciseTemplate/queries";

interface PageParams extends Record<string, string> {
  codingExerciseTemplateId: string;
}

const CodingExerciseTemplatePage: React.FC = () => {
  const { codingExerciseTemplateId } = useParams<PageParams>();
  const { isLoading, isError, isSuccess, error, data } =
    useGetCodingExerciseTemplateById(codingExerciseTemplateId);

  if (isLoading) {
    return (
      <main className="min-h-screen min-w-screen flex justify-center items-center">
        <progress className="progress w-64"></progress>
      </main>
    );
  }

  if (isError || (isSuccess && data === null)) {
    isError && console.error(error);

    return (
      <main className="min-h-screen min-w-screen flex justify-center items-center">
        <div className="alert alert-error shadow-lg max-w-xl">
          <ExclamationCircleIcon className="h-16" />
          <span>
            Oops! Seems like we can't find your coding exercise template! Check the output of your CLI to make
            sure the url is correct.
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-16">
      <Logo size={LogoSize.medium} className="mb-20" />
      <section className="lg:w-2/4">
        <CodingExerciseCard
          name={data?.codingExercise.name || ""}
          description={data?.codingExercise.description || ""}
        >
          <button className="btn btn-block btn-primary">Create interview room</button>
        </CodingExerciseCard>
      </section>
    </main>
  );
};

export default CodingExerciseTemplatePage;
