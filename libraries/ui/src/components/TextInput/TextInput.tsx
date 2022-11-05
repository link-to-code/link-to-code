import React from "react";
import clsx, { ClassValue } from "clsx";

export enum TextInputType {
  primary = "primary",
  secondary = "secondary",
  accent = "accent",
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
  ghost = "ghost",
}

export enum TextInputSize {
  lg = "lg",
  md = "md",
  sm = "sm",
  xs = "xs",
}

export type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "type"> & {
  className?: ClassValue[] | ClassValue;
  htmlType?: "text" | "password" | "email" | "search";
  type?: keyof typeof TextInputType;
  size?: keyof typeof TextInputSize;
  bordered?: boolean;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ type, size, className = "", htmlType, bordered = true, ...otherProps }, ref) => {
    const classNameComposition = clsx(
      "input",
      {
        "input-primary": type === TextInputType.primary,
        "input-secondary": type === TextInputType.secondary,
        "input-accent": type === TextInputType.accent,
        "input-info": type === TextInputType.info,
        "input-success": type === TextInputType.success,
        "input-warning": type === TextInputType.warning,
        "input-error": type === TextInputType.error,
        "input-ghost": type === TextInputType.ghost,
        "input-bordered": bordered,
      },
      {
        "btn-lg": size === TextInputSize.lg,
        "btn-md": size === TextInputSize.md,
        "btn-sm": size === TextInputSize.sm,
        "btn-xs": size === TextInputSize.xs,
      },
      className
    );

    return <input ref={ref} type={htmlType} className={classNameComposition} {...otherProps} />;
  }
);

TextInput.displayName = "TextInput";
