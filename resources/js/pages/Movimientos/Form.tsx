import { Movimiento } from "@/interfaces/Movimientos.Interface";
import { Cliente } from "@/interfaces/Clientes.Interface";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface Props {
  movimiento?: Movimiento | null;
  tipo?: "ingreso" | "egreso"; // prop opcional para Create
  clientes: Cliente[]; // lista de clientes desde el backend
}

export default function Form({ movimiento, tipo, clientes }: Props) {
  const today = new Date().toISOString().split("T")[0];

  const { data, setData, post, put, processing, errors } = useForm({
    nro: movimiento?.nro ?? 0,
    tipo: movimiento?.tipo ?? tipo ?? "ingreso",
    descripcion: movimiento?.descripcion ?? "",
    fecha: movimiento?.fecha ?? today,
    total: movimiento?.total ?? 0, // total inicial
    cliente_id: movimiento?.cliente_id ?? null, // nuevo campo cliente
  });

  const [clienteQuery, setClienteQuery] = useState<string>("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(
    clientes.find((c) => c.id === movimiento?.cliente_id) ?? null
  );

  // Filtrado de clientes para autocomplete
  const clientesFiltrados = clientes.filter((c) =>
    c.nombre_razon_social.toLowerCase().includes(clienteQuery.toLowerCase())
  );


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteSeleccionado) return alert("Debe seleccionar un cliente");
    setData("cliente_id", clienteSeleccionado.id);

    if (movimiento) {
      put(`/movimientos/${movimiento.id}`);
    } else {
      post("/movimientos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Cliente */}
      <div>
        <label className="block font-semibold mb-1">Cliente</label>
        <input
          type="text"
          value={clienteQuery}
          onChange={(e) => setClienteQuery(e.target.value)}
          placeholder="Buscar cliente..."
          className="border p-2 w-full"
        />
        {clienteQuery && (
          <ul className="border rounded mt-2 max-h-40 overflow-y-auto bg-white shadow">
            {clientesFiltrados.map((c) => (
              <li
                key={c.id}
                onClick={() => {
                  setClienteSeleccionado(c);
                  setClienteQuery("");
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {c.nombre_razon_social}
              </li>
            ))}
            {clientesFiltrados.length === 0 && (
              <li className="p-2 text-gray-500">No se encontraron clientes</li>
            )}
          </ul>
        )}
        {clienteSeleccionado && (
          <p className="text-sm text-green-600 mt-1">
            Cliente seleccionado: <strong>{clienteSeleccionado.nombre_razon_social}</strong>
          </p>
        )}
      </div>

      {/* Nro (no editable, solo en Edit) */}
      {movimiento && (
        <input type="hidden" value={data.nro} disabled />
      )}

      {/* Tipo (no editable) */}
      <input type="hidden" value={data.tipo === "ingreso" ? "Ingreso" : "Egreso"} disabled />

      {/* Descripción */}
      <div>
        <label className="block font-semibold mb-1">Descripción</label>
        <textarea
          value={data.descripcion}
          onChange={(e) => setData("descripcion", e.target.value)}
          placeholder="Descripción"
          className="border p-2 w-full"
        />
        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}
      </div>

      {/* Fecha */}
      <div>
        <label className="block font-semibold mb-1">Fecha</label>
        <input
          type="date"
          value={data.fecha}
          onChange={(e) => setData("fecha", e.target.value)}
          className="border p-2 w-full"
        />
        {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha}</p>}
      </div>

      {/* Total calculado */}
      <div>
        <label className="block font-semibold mb-1">Total</label>
        <input
          type="number"
          value={data.total}
          className="border p-2 w-full bg-gray/100 cursor-not-allowed"
          disabled
        />
      </div>

      <button
        disabled={processing}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {movimiento ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
