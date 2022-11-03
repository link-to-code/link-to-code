import React from "react";
import clsx, { ClassValue } from "clsx";
import { ReactComponent as LogoSvg } from "../../assets/logo.svg";
import styles from "./Logo.module.css";

export enum LogoSize {
  small = "small",
  medium = "medium",
  large = "large",
}

export enum LogoColor {
  light = "light",
  dark = "dark",
}

export interface LogoProps {
  color?: keyof typeof LogoColor;
  size?: keyof typeof LogoSize;
  className?: ClassValue[] | ClassValue;
}

export const Logo: React.FC<LogoProps> = ({
  size = LogoSize.medium,
  color = LogoColor.light,
  className = "",
}) => {
  return (
    <LogoSvg title="Logo" data-size={size} data-color={color} className={clsx(styles.root, className)} />
  );
};
