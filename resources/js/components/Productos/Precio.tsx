import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface PrecioProps {
  precio: { precio_venta?: number; precio_compra?: number };
  onChange: (precio: { precio_venta?: number; precio_compra?: number }) => void;
}

export function Precio({ precio, onChange }: PrecioProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Label>Precio Venta</Label>
        <Input
          type="number"
          value={precio.precio_venta ?? ""}
          onChange={(e) => onChange({ ...precio, precio_venta: Number(e.target.value) })}
          className="w-full border rounded-lg p-2"
        />
      </div>
      <div>
        <Label>Precio Compra</Label>
        <Input
          type="number"
          value={precio.precio_compra ?? ""}
          onChange={(e) => onChange({ ...precio, precio_compra: Number(e.target.value) })}
          className="w-full border rounded-lg p-2"
        />
      </div>
    </div>
  );
}
