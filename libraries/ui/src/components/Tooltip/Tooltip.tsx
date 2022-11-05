import React from "react";
import clsx, { ClassValue } from "clsx";

export enum TooltipType {
  primary = "primary",
  secondary = "secondary",
  accent = "accent",
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

export enum TooltipPosition {
  top = "top",
  left = "left",
  right = "right",
  bottom = "bottom",
}

export type TooltipProps = {
  tip: string;
  className?: ClassValue[] | ClassValue;
  type?: keyof typeof TooltipType;
  position?: keyof typeof TooltipPosition;
  opened?: boolean;
  children?: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({
  tip,
  className = "",
  type,
  children,
  opened,
  position,
}) => {
  const classNameComposition = clsx(
    {
      tooltip: opened === true || opened === undefined,
      "tooltip-primary": type === TooltipType.primary,
      "tooltip-secondary": type === TooltipType.secondary,
      "tooltip-accent": type === TooltipType.accent,
      "tooltip-info": type === TooltipType.info,
      "tooltip-success": type === TooltipType.success,
      "tooltip-warning": type === TooltipType.warning,
      "tooltip-error": type === TooltipType.error,
      "tooltip-top": position === TooltipPosition.top,
      "tooltip-left": position === TooltipPosition.left,
      "tooltip-right": position === TooltipPosition.right,
      "tooltip-bottom": position === TooltipPosition.bottom,
      "tooltip-open": opened,
    },
    className
  );

  return (
    <div className={classNameComposition} data-tip={tip}>
      {children}
    </div>
  );
};

Tooltip.displayName = "Tooltip";
