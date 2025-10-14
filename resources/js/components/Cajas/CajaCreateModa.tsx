import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert" // 👈 asegúrate de tener este componente
import CajaForm from "./CajaForm"
import { useCaja } from "@/hooks/useCaja"
import { Caja } from "@/interfaces/Caja.Ingerface"

interface Props {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CajaCreateModal({ open, onClose, onSuccess }: Props) {
  const { createCaja, errors, loading, fetchCajas } = useCaja()

  // Estado local del formulario
  const [data, setDataState] = useState<Partial<Caja>>({
    saldo_inicial: 0,
    observacion: "",
  })

  // Actualizar campos
  const setData = (field: string, value: any) => {
    setDataState((prev) => ({ ...prev, [field]: value }))
  }

  // Limpiar formulario
  const reset = () => {
    setDataState({
      saldo_inicial: 0,
      observacion: "",
    })
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ok = await createCaja(data)
    if (ok) {
      reset()
      onSuccess?.()
      onClose()
    }
    // Si hay error, el hook ya setea `errors.msg` y el Alert lo mostrará automáticamente
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aperturar Caja</DialogTitle>
          <DialogDescription>
            Complete los datos para aperturar una nueva caja.
          </DialogDescription>
        </DialogHeader>

        {/* 🔴 Mostrar mensaje de error general */}
        {errors.msg && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errors.msg}</AlertDescription>
          </Alert>
        )}

        <CajaForm
          data={data}
          setData={setData}
          errors={errors}
          processing={loading}
          onSubmit={handleSubmit}
          reset={reset}
        />
      </DialogContent>
    </Dialog>
  )
}
