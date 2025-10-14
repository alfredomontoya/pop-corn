import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCaja } from "@/hooks/useCaja"
import { Caja } from "@/interfaces/Caja.Ingerface"
import { Button } from "@/components/ui/button"

interface Props {
  open: boolean
  onClose: () => void
  caja: Caja | null
  onSuccess?: () => void
}

export default function CerrarCajaModal({ open, onClose, caja, onSuccess }: Props) {
  const { cerrarCaja, loading, errors } = useCaja()
  const [processing, setProcessing] = useState(false)

  const handleCloseCaja = async () => {
    if (!caja) return
    setProcessing(true)
    const ok = await cerrarCaja(caja.id)
    setProcessing(false)
    if (ok) {
      onSuccess?.()
      onClose()
    }

  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cerrar Caja</DialogTitle>
          <DialogDescription>
            {caja
              ? `¿Estás seguro de cerrar la caja #${caja.id} del usuario ${caja.user_id}?`
              : "No se ha seleccionado ninguna caja."}
          </DialogDescription>
        </DialogHeader>

        {/* 🔴 Mostrar mensaje de error general */}
        {errors.msg && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errors.msg}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={processing}>
            Cancelar
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleCloseCaja}
            disabled={processing}
          >
            {processing ? "Cerrando..." : "Cerrar Caja"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
