import { router } from "@inertiajs/react";
import { FormEvent, useState } from "react";

interface Asesor {
  id: number;
  name: string;
}

interface Props {
  asesores: Asesor[];
  filters?: {
    asesor_id?: string;
    lugar?: string;
    descripcion?: string;
  };
}

export default function CaptacionFilter({ asesores, filters }: Props) {
  const [asesor_id, setAsesorId] = useState(filters?.asesor_id || "");
  const [lugar, setLugar] = useState(filters?.lugar || "");
  const [descripcion, setDescripcion] = useState(filters?.descripcion || "");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.get(
      route("captaciones.index"),
      { asesor_id, lugar, descripcion },
      { preserveState: true }
    );
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <select
        value={asesor_id}
        onChange={(e) => setAsesorId(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">-- Todos los asesores --</option>
        {asesores.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Lugar"
        value={lugar}
        onChange={(e) => setLugar(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <button
        type="submit"
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        Buscar
      </button>
    </form>
  );
}
