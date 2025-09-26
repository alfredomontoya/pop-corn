import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ClienteForm from "./ClienteForm";
import { Cliente } from "@/interfaces/Clientes.Interface";
import { useActualizarCliente } from "@/hooks/Clientes/useActualizarCliente";

interface Props {
  open: boolean;
  onClose: () => void;
  cliente: Cliente;
  onSuccess?: () => void; // callback externo opcional
}

export default function ClienteUpdateModal({ open, onClose, cliente, onSuccess }: Props) {
  const { data, setData, handleSubmit, processing, errors, reset } = useActualizarCliente(
    cliente,
    () => {
      // Callback al actualizar correctamente
      if (onSuccess) onSuccess();
      onClose(); // cerrar modal
    }
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Actualizar Cliente</DialogTitle>
          <DialogDescription>Modifica los datos del cliente y guarda los cambios.</DialogDescription>
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
