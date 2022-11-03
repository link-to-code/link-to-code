import React from "react";
import clsx, { ClassValue } from "clsx";

import { XMarkIcon } from "@heroicons/react/20/solid";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Button } from "../Button";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export type DialogContentProps = Omit<DialogPrimitive.DialogContentProps, "className"> & {
  className?: ClassValue;
};

export const DialogContent: React.FC<DialogContentProps> = ({ children, className, ...props }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-opacity-70 bg-slate-700" />
      <DialogPrimitive.Content
        className={clsx(
          "card bg-base-300 shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export type DialogHeaderProps = {
  className?: ClassValue;
  children?: React.ReactNode;
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className }) => {
  return <div className={clsx("flex gap-4 items-baseline justify-between", className)}>{children}</div>;
};

export type DialogTitleProps = Omit<DialogPrimitive.DialogTitleProps, "className"> & {
  className?: ClassValue;
};

export const DialogTitle: React.FC<DialogTitleProps> = ({ children, className, ...props }) => {
  return (
    <DialogPrimitive.Title asChild className={clsx("prose mb-0", className)} {...props}>
      <div>{children}</div>
    </DialogPrimitive.Title>
  );
};

export type DialogCloseProps = Omit<DialogPrimitive.DialogCloseProps, "className"> & {
  className?: ClassValue;
};

export const DialogClose: React.FC<DialogCloseProps> = ({ className, ...props }) => {
  return (
    <DialogPrimitive.Close asChild {...props}>
      <Button className={clsx("ml-auto", className)} type="outline" size="sm" shape="circle">
        <XMarkIcon className="w-6 h-6" />
      </Button>
    </DialogPrimitive.Close>
  );
};

export type DialogDescriptionProps = Omit<DialogPrimitive.DialogDescriptionProps, "className"> & {
  className?: ClassValue;
};

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className, ...props }) => {
  return (
    <DialogPrimitive.Description className={clsx("prose mt-8 text-slate-500", className)} {...props}>
      {children}
    </DialogPrimitive.Description>
  );
};

export type DialogActionsProps = {
  className?: ClassValue;
  children?: React.ReactNode;
};

export const DialogActions: React.FC<DialogActionsProps> = ({ children, className }) => {
  return <div className={clsx("mt-8 flex gap-4 justify-end", className)}>{children}</div>;
};

export type DialogCancelButtonProps = Omit<DialogPrimitive.DialogCloseProps, "className"> & {
  className?: ClassValue;
};

export const DialogCancelButton: React.FC<DialogCancelButtonProps> = ({ className, ...props }) => {
  return (
    <DialogPrimitive.Close asChild {...props}>
      <Button className={clsx(className)}>Cancel</Button>
    </DialogPrimitive.Close>
  );
};
