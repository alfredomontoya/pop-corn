import { Movimiento } from "@/interfaces/Movimientos.Interface";
import { Cliente } from "@/interfaces/Clientes.Interface";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Caja } from "@/interfaces/Caja.Ingerface";

interface Props {
  movimiento?: Movimiento | null;
  tipo?: "ingreso" | "egreso"; // prop opcional para Create
  clientes: Cliente[]; // lista de clientes desde el backend
  caja?: Caja | null; // caja abierta actual (si es necesario)
}

export default function Form({ movimiento, tipo, clientes, caja }: Props) {

  const today = new Date().toISOString().split("T")[0];

  const { data, setData, post, put, processing, errors, reset } = useForm({
    // caja_id: 1, // Asumiendo caja_id fijo por ahora
    caja_id: caja?.id ?? null,
    cliente_id: movimiento?.cliente_id ?? null, // nuevo campo cliente
    tipo: movimiento?.tipo ?? tipo ?? "ingreso",
    descripcion: movimiento?.descripcion ?? "",
    fecha: movimiento?.fecha ? movimiento.fecha.split(" ")[0] : today,
    monto: movimiento?.monto ?? 0, // monto
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
    // if (!clienteSeleccionado) return alert("Debe seleccionar un cliente");
    // setData("cliente_id", clienteSeleccionado!.id);

    if (movimiento) {
      console.log('Updating movimiento with data:', data);
      put(`/movimientos/${movimiento.id}`, {
        onSuccess: () => {
          // Opcional: alguna acción después de actualizar
        },
        onError: (errs) => {
          console.log("Errores de validación:", errs);
        }
      });
    } else {
      console.log('Creating movimiento with data:', data);
      post("/movimientos", {
        onSuccess: () => {
          // Reset form after successful creation
          setData("descripcion", "");
          setData("fecha", today);
          setData("monto", 0);
          setData("cliente_id", null);
          setClienteSeleccionado(null);
        },
        onError: (errs) => {
          console.log("Errores de validación:", errs);
        }
      });

    }
  };

  const handleCancel = () => {
    reset();
    window.history.back();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-4">
      {/* Cliente */}
      {caja ? (
        <p className="mb-4 text-sm text-gray-500">
          Caja abierta: <strong>{caja.id}</strong>
        </p>
      ) : (
        <p className="mb-4 text-sm text-red-700 bg-red-100 border border-yellow-400 rounded p-2 mb-4">
          No hay caja abierta!.
        </p>
      )}
      {errors.caja_id && <p className="text-red-500 text-sm">{errors.caja_id}</p>}
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
          <ul className="border rounded mt-2 max-h-40 overflow-y-auto shadow">
            {clientesFiltrados.map((c) => (
              <li
                key={c.id}
                onClick={() => {
                  setClienteSeleccionado(c);
                  setData("cliente_id", c.id);
                  setClienteQuery("");
                }}
                className="p-2 hover:bg-gray-100/30 cursor-pointer"
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
        {errors.cliente_id && <p className="text-red-500 text-sm">{errors.cliente_id}</p>}
      </div>

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

      {/* Monto */}
      <div>
        <label className="block font-semibold mb-1">Monto</label>
        <input
          type="number"
          value={data.monto}
          onChange={(e) => setData("monto", Number(e.target.value))}
          className="border p-2 w-full bg-gray/100 "
        />
        {errors.monto && <p className="text-red-500 text-sm">{errors.monto}</p>}
      </div>

      <div className="mt-6 flex space-x-2">
        <Button
          variant={'default'}
          disabled={processing}
        >
          {movimiento ? "Actualizar" : "Crear"}
        </Button>
        <Button
          variant={'secondary'}
          disabled={processing}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </div>

    </form>
  );
}
