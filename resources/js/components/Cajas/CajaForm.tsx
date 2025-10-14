import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Caja } from "@/interfaces/Caja.Ingerface"
import { TextArea } from "../helpers/TextArea"

interface Props {
  data: Partial<Caja>
  setData: (field: string, value: any) => void
  errors: Record<string, string>
  processing: boolean
  onSubmit: (e: React.FormEvent) => void
  reset: () => void
}

export default function CajaForm({
  data,
  setData,
  errors,
  processing,
  onSubmit,
  reset,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* 🧾 Saldo inicial */}
      <div>
        <Label htmlFor="saldo_inicial">Saldo inicial</Label>
        <Input
          id="saldo_inicial"
          type="number"
          step="0.01"
          value={data.saldo_inicial ?? ""}
          onChange={(e) => setData("saldo_inicial", parseFloat(e.target.value))}
          className={errors.saldo_inicial ? "border-red-500" : ""}
        />
        {errors.saldo_inicial && (
          <p className="text-sm text-red-600 mt-1">{errors.saldo_inicial}</p>
        )}
      </div>

      {/* 🗒️ Observación */}
      <div>
        <TextArea
            label="Observacion"
          value={data.observacion ?? ""}
          onChange={(value) => setData("observacion", value)}
          error={errors.observacion}
        />
        {errors.observacion && (
          <p className="text-sm text-red-600 mt-1">{errors.observacion}</p>
        )}
      </div>

      {/* 🔘 Botones */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={reset}
          disabled={processing}
        >
          Limpiar
        </Button>
        <Button type="submit" disabled={processing}>
          {processing ? "Guardando..." : "Guardar"}
        </Button>
      </div>

      {/* 🔴 Error general (por ejemplo: “Ya tienes una caja abierta.”) */}
      {/* {errors.msg && (
        <p className="text-sm text-red-600 mt-2 text-center font-medium">
          {errors.msg}
        </p>
      )} */}
    </form>
  )
}
