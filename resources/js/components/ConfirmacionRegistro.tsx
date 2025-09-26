import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react"; // icono opcional

export default function ConfirmacionRegistro({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center gap-2">
            <CheckCircle className="text-green-500" /> Registro exitoso
          </DialogTitle>
          <DialogDescription>
            El cliente fue registrado correctamente.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Button onClick={onClose} className="w-full">
            Aceptar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
