import { useState, useEffect } from "react";
import { Cliente } from "@/interfaces/Clientes.Interface";
import { TipoPago, Venta } from "@/interfaces/Venta.Interface";
import { Producto } from "@/interfaces/Productos.Interface";
import { DetalleVenta, VentaPayload } from "@/interfaces/Venta.Interface";

interface Props {
  venta?: Venta;
  clientes: Cliente[];
  tiposPago: TipoPago[];
  productos: Producto[];
  onSubmit: (data: VentaPayload) => void;
}

export default function VentaForm({
  venta,
  clientes,
  tiposPago,
  productos,
  onSubmit,
}: Props) {
  const [tipoPagoId, setTipoPagoId] = useState<number>(
    venta?.tipo_pago_id ?? tiposPago[0]?.id
  );
  const [clienteQuery, setClienteQuery] = useState<string>("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(
    clientes.find((c) => c.id === venta?.cliente_id) ?? null
  );
  const [total, setTotal] = useState<number>(venta?.total ?? 0);
  const [efectivo, setEfectivo] = useState<number>(venta?.efectivo ?? 0);
  const [cambio, setCambio] = useState<number>(venta?.cambio ?? 0);
  const [estado, setEstado] = useState<string>(venta?.estado ?? "pendiente");
  const [detalles, setDetalles] = useState<DetalleVenta[]>(venta?.detalles ?? []);

  // Calcular cambio
  useEffect(() => {
    setCambio(Math.max(0, efectivo - total));
  }, [total, efectivo]);

  const clientesFiltrados = clientes.filter((c) =>
    c.nombre_razon_social.toLowerCase().includes(clienteQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteSeleccionado) return alert("Debe seleccionar un cliente");
    if (efectivo < total) return alert("El efectivo no puede ser menor al total");

    onSubmit({
      cliente_id: clienteSeleccionado.id,
      tipo_pago_id: tipoPagoId,
      total,
      efectivo,
      cambio,
      estado,
      detalles,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tipo de Pago */}
      <div>
        <label className="block font-semibold mb-2">Tipo de Pago</label>
        <div className="flex gap-4">
          {tiposPago.map((tp) => (
            <label key={tp.id} className="flex items-center gap-2">
              <input
                type="radio"
                value={tp.id}
                checked={tipoPagoId === tp.id}
                onChange={() => setTipoPagoId(tp.id)}
              />
              {tp.nombre}
            </label>
          ))}
        </div>
      </div>

      {/* Cliente */}
      <div>
        <label className="block font-semibold mb-2">Cliente</label>
        <input
          type="text"
          value={clienteQuery}
          onChange={(e) => setClienteQuery(e.target.value)}
          placeholder="Buscar cliente..."
          className="border rounded p-2 w-full"
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
            Cliente seleccionado: <strong>{clienteSeleccionado.nombre_razon_social}, {clienteSeleccionado.direccion} </strong>
          </p>
        )}
      </div>

      {/* Total */}
      <div>
        <label className="block font-semibold mb-2">Total</label>
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Efectivo */}
      <div>
        <label className="block font-semibold mb-2">Efectivo</label>
        <input
          type="number"
          value={efectivo}
          onChange={(e) => setEfectivo(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Cambio */}
      <div>
        <label className="block font-semibold mb-2">Cambio</label>
        <input
          type="number"
          value={cambio}
          readOnly
          className="border rounded p-2 w-full bg-gray-100"
        />
      </div>

      {/* Aquí iría tu manejador de detalles */}
      {/* <DetalleVentaManager productos={productos} onChange={setDetalles} /> */}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar Venta
      </button>
    </form>
  );
}
