import React, { useId } from "react";
import clsx, { ClassValue } from "clsx";

export type FormControlProps = {
  input: React.ReactElement;
  text: string;
  alt?: string | React.ReactNode;
  bottomText?: string;
  bottomAlt?: string | React.ReactNode;
  className?: ClassValue[] | ClassValue;
};

export const FormControl: React.FC<FormControlProps> = ({
  text,
  alt = "",
  bottomText,
  bottomAlt,
  className = "",
  input,
}) => {
  const id = useId();
  const inputWithId = React.cloneElement(input, { id });

  return (
    <div className={clsx("form-control", className)}>
      <label className="label" htmlFor={id}>
        <span className="label-text">{text}</span>
        {alt && <span className="label-text-alt">{alt}</span>}
      </label>
      {inputWithId}
      {(bottomText || bottomAlt) && (
        <label className="label">
          {bottomText && <span className="label-text text-xs">{bottomText}</span>}
          {bottomAlt && <span className="label-text-alt text-xs">{bottomAlt}</span>}
        </label>
      )}
    </div>
  );
};

FormControl.displayName = "FormControl";
