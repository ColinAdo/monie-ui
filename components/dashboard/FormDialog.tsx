"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
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
      <DialogContent className="rounded px-4 w-96 mt-7">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
