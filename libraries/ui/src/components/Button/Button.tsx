import React from "react";
import clsx, { ClassValue } from "clsx";

export enum ButtonType {
  primary = "primary",
  secondary = "secondary",
  accent = "accent",
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
  ghost = "ghost",
  link = "link",
  outline = "outline",
  active = "active",
}

export enum ButtonSize {
  lg = "lg",
  md = "md",
  sm = "sm",
  xs = "xs",
  wide = "wide",
  block = "block",
  circle = "circle",
  square = "square",
}

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "type"> & {
  className?: ClassValue[] | ClassValue;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  type?: keyof typeof ButtonType;
  size?: keyof typeof ButtonSize;
  glass?: boolean;
  loading?: boolean;
  noAnimation?: boolean;
  leftIcon?: React.ReactSVGElement;
  rightIcon?: React.ReactSVGElement;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type,
  size,
  disabled,
  glass,
  loading,
  noAnimation,
  className = "",
  htmlType,
  leftIcon,
  rightIcon,
  children,
  ...otherProps
}) => {
  const classNameComposition = clsx(
    "btn",
    !disabled && {
      "btn-primary": type === ButtonType.primary,
      "btn-secondary": type === ButtonType.secondary,
      "btn-accent": type === ButtonType.accent,
      "btn-info": type === ButtonType.info,
      "btn-success": type === ButtonType.success,
      "btn-warning": type === ButtonType.warning,
      "btn-error": type === ButtonType.error,
      "btn-ghost": type === ButtonType.ghost,
      "btn-link": type === ButtonType.link,
      "btn-outline": type === ButtonType.outline,
      "btn-active": type === ButtonType.active,
    },
    {
      "btn-lg": size === ButtonSize.lg,
      "btn-md": size === ButtonSize.md,
      "btn-sm": size === ButtonSize.sm,
      "btn-xs": size === ButtonSize.xs,
      "btn-wide": size === ButtonSize.wide,
      "btn-block": size === ButtonSize.block,
      "btn-circle": size === ButtonSize.circle,
      "btn-square": size === ButtonSize.square,
    },
    disabled && "btn-disabled",
    glass && "glass",
    loading && "loading",
    (noAnimation || loading) && "no-animation",
    className
  );

  return (
    <button type={htmlType} className={classNameComposition} {...otherProps} disabled={disabled || loading}>
      {leftIcon && !loading && <div className="h-1/2 mr-1 [&>svg]:w-full [&>svg]:h-full">{leftIcon}</div>}
      {children}
      {rightIcon && <div className="h-1/2 ml-1 [&>svg]:w-full [&>svg]:h-full">{rightIcon}</div>}
    </button>
  );
};

export default Button;
