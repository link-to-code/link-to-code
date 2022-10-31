import React from "react";
import { CodeBracketSquareIcon } from "@heroicons/react/20/solid";

export interface CodingExerciseCardProps {
  name: string;
  description: string;
  children?: React.ReactNode;
}

const CodingExerciseCard: React.FC<CodingExerciseCardProps> = ({ name, description, children }) => {
  return (
    <div className="card card-bordered border-neutral-focus bg-neutral shadow-md">
      <div className="card-body">
        <div className="badge badge-secondary badge-outline">
          <CodeBracketSquareIcon className="h-4 pr-1" /> Coding exercise
        </div>
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
      {children && <div className="card-actions p-5">{children}</div>}
    </div>
  );
};

export default CodingExerciseCard;
