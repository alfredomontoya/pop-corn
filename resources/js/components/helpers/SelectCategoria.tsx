import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Categoria } from "@/interfaces/Categorias.Interface";

interface SelectCategoriaProps {
  categorias: Categoria[];
  value: number;
  onChange: (id: number) => void;
  error?: string;
}

export function SelectCategoria({ categorias, value, onChange, error }: SelectCategoriaProps) {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Label>Filtrar Categoría</Label>
      <Input
        type="text"
        placeholder="Buscar categoría..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-2 mb-2"
      />
      <Label>Seleccionar Categoría</Label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border rounded-lg p-2"
      >
        <option value={0}>Seleccionar categoría</option>
        {categorias
          .filter((c) => c.nombre.toLowerCase().includes(search.toLowerCase()))
          .map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
