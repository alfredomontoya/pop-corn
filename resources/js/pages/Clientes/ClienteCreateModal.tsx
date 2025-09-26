import React from "react";
import { useForm } from "@inertiajs/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCrearCliente } from "@/hooks/Clientes/useCrearCliente";
import ClienteForm from "./ClienteForm";

interface CreateClienteModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateClienteModal({ open, onClose, onSuccess }: CreateClienteModalProps) {
  const { data, setData, handleSubmit, processing, errors, reset } = useCrearCliente(onSuccess);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar cliente</DialogTitle>
          <DialogDescription>
            Complete los datos para registrar un nuevo cliente.
          </DialogDescription>
        </DialogHeader>

        <ClienteForm
            data={data}
            setData={setData}
            errors={errors}
            processing={processing}
            onSubmit={handleSubmit}
            reset={reset}
        />

      </DialogContent>
    </Dialog>
  );
}
