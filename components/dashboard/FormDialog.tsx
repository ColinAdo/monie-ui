"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import React from "react";

interface Props {
  requiredRoute: boolean;
  onOpenChange: (open: boolean) => void;
  dialogTitle: string;
  children: React.ReactNode;
}

export default function FormDialog({
  requiredRoute,
  onOpenChange,
  dialogTitle,
  children,
}: Props) {
  return (
    <Dialog open={requiredRoute} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
