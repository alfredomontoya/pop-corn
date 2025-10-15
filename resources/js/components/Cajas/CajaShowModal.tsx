import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Caja } from "@/interfaces/Caja.Ingerface";
import { useCaja } from "@/hooks/useCaja";

interface Props {
  open: boolean;
  onClose: () => void;
  caja: Caja | null;
}

export default function CajaShowModal({ open, onClose, caja }: Props) {
  const { cerrarCaja, loading, errors } = useCaja();
  const [processing, setProcessing] = useState(false);

  const handleCerrarCaja = async () => {
    if (!caja) return;
    setProcessing(true);
    const ok = await cerrarCaja(caja.id);
    setProcessing(false);
    if (ok) {
      onClose();
    }
  };

  const totalIngresos = caja?.ingresos_calculados ?? 0;
  const totalEgresos = caja?.egresos_calculados ?? 0;
  const saldoFinal = caja?.saldo_final_calculado ?? 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Caja #{caja?.id}</DialogTitle>
          <DialogDescription>
            Usuario: {caja?.user?.name || "Desconocido"} <br />
            Estado: {caja?.estado}
          </DialogDescription>
        </DialogHeader>

        {/* 🔴 Mensaje de error */}
        {errors.msg && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errors.msg}</AlertDescription>
          </Alert>
        )}

        {/* 💰 Resumen de la caja */}
        {caja && (
          <div className="border rounded-lg p-4 bg-gray-50/30 mb-4">
            <h4 className="font-semibold mb-2 text-gray-700">Resumen de Caja</h4>
            <div className="flex justify-between text-sm mb-1">
              <span>Total Ingresos:</span>
              <span className="font-medium text-green-600">
                Bs {totalIngresos.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Total Egresos:</span>
              <span className="font-medium text-red-600">
                Bs {totalEgresos.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm border-t pt-2 mt-2">
              <span>Saldo Final:</span>
              <span className="font-semibold text-blue-600">
                Bs {saldoFinal.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* 🟢 Botones */}
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={processing}>
            Cerrar
          </Button>
          {caja?.estado !== "CERRADA" && (
            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleCerrarCaja}
              disabled={processing}
            >
              {processing ? "Cerrando..." : "Cerrar Caja"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
