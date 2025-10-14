import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextArea } from "../helpers/TextArea";

interface CajaFormProps {
  data: any;
  setData: (field: string, value: any) => void;
  errors: any;
  processing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  reset?: () => void;
}

export default function CajaForm({
  data,
  setData,
  errors,
  processing,
  onSubmit,
  reset = () => {},
}: CajaFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">

      {/* Saldo Inicial */}
      <div>
        <Label htmlFor="saldo_inicial">Saldo Inicial</Label>
        <Input
          id="saldo_inicial"
          type="number"
          step="0.01"
          value={data.saldo_inicial ?? ""}
          onChange={(e) => setData("saldo_inicial", parseFloat(e.target.value) || 0)}
        />
        {errors.saldo_inicial && (
          <p className="text-red-500 text-sm">{errors.saldo_inicial}</p>
        )}
      </div>

      {/* Observaciones */}
      <div>
        <TextArea
          label="Observaciones"
          value={data.observaciones || ""}
          onChange={(e) => setData("observaciones", e.target.value)}
          error={errors.observaciones}
        />
        {errors.observaciones && (
          <p className="text-red-500 text-sm">{errors.observaciones}</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex space-x-2">
        <Button type="submit" disabled={processing}>
          {processing ? "Guardando..." : "Guardar"}
        </Button>
        <Button type="button" variant="outline" onClick={reset}>
          Limpiar
        </Button>
      </div>
    </form>
  );
}
