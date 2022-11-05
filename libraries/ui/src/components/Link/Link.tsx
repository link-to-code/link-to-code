import React from "react";
import clsx, { ClassValue } from "clsx";

export enum LinkType {
  neutral = "neutral",
  primary = "primary",
  secondary = "secondary",
  accent = "accent",
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
  hover = "hover",
}

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
  className?: ClassValue[] | ClassValue;
  type?: keyof typeof LinkType;
  children?: React.ReactNode;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className = "", type, children, ...otherProps }, ref) => {
    const classNameComposition = clsx(
      "link",
      {
        "link-neutral": type === LinkType.neutral,
        "link-primary": type === LinkType.primary,
        "link-secondary": type === LinkType.secondary,
        "link-accent": type === LinkType.accent,
        "link-info": type === LinkType.info,
        "link-success": type === LinkType.success,
        "link-warning": type === LinkType.warning,
        "link-error": type === LinkType.error,
        "link-hover": type === LinkType.hover,
      },
      className
    );

    return (
      <a ref={ref} className={classNameComposition} {...otherProps}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
