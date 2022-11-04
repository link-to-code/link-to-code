import React from "react";
import clsx, { ClassValue } from "clsx";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export enum CheckboxType {
  primary = "primary",
  secondary = "secondary",
  accent = "accent",
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

export enum CheckboxSize {
  lg = "lg",
  md = "md",
  sm = "sm",
  xs = "xs",
}

export type CheckboxProps = Omit<CheckboxPrimitive.CheckboxProps, "className"> & {
  className?: ClassValue;
  type?: keyof typeof CheckboxType;
  size?: keyof typeof CheckboxSize;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ type, size, className, checked, ...props }, ref) => {
    const classNameComposition = clsx(
      "checkbox",
      {
        "checkbox-primary": type === CheckboxType.primary,
        "checkbox-secondary": type === CheckboxType.secondary,
        "checkbox-accent": type === CheckboxType.accent,
        "checkbox-info": type === CheckboxType.info,
        "checkbox-success": type === CheckboxType.success,
        "checkbox-warning": type === CheckboxType.warning,
        "checkbox-error": type === CheckboxType.error,
        "checkbox-lg": size === CheckboxSize.lg,
        "checkbox-md": size === CheckboxSize.md,
        "checkbox-sm": size === CheckboxSize.sm,
        "checkbox-xs": size === CheckboxSize.xs,
      },
      className
    );

    return <CheckboxPrimitive.Root ref={ref} className={classNameComposition} checked={checked} {...props} />;
  }
);
Checkbox.displayName = "Checkbox";
