import { Producto } from "@/interfaces/Productos.Interface";
import { DetalleVenta } from "@/interfaces/Venta.Interface";
import React, { useState } from "react";


interface Props {
  productos: Producto[];
  onChange?: (detalles: DetalleVenta[]) => void;
}

const DetalleVentaManager: React.FC<Props> = ({ productos, onChange }) => {
  const [detalles, setDetalles] = useState<DetalleVenta[]>([]);
  const [query, setQuery] = useState<string>("");

  const syncDetalles = (nuevos: DetalleVenta[]) => {
    setDetalles(nuevos);
    if (onChange) onChange(nuevos);
  };

  const addProducto = (producto: Producto) => {
    const existe = detalles.find((d) => d.producto_id === producto.id);
    if (existe) {
      updateCantidad(producto.id, existe.cantidad + 1);
    } else {
      syncDetalles([
        ...detalles,
        {
          producto_id: producto.id,
          nombre: producto.nombre,
          cantidad: 1,
          precio_unitario: producto.precio_activo?.precio_venta!,
          subtotal: producto.precio_activo?.precio_venta!,
        },
      ]);
    }
    setQuery("");
  };

  const removeProducto = (id: number) => {
    syncDetalles(detalles.filter((d) => d.producto_id !== id));
  };

  const updateCantidad = (id: number, cantidad: number) => {
    syncDetalles(
      detalles.map((d) =>
        d.producto_id === id
          ? { ...d, cantidad, subtotal: cantidad * d.precio_unitario }
          : d
      )
    );
  };

  // Productos filtrados para autocompletar
  const productosFiltrados = productos.filter(
    (p) =>
      p.id.toString().includes(query) ||
      p.codigo!.toLowerCase().includes(query.toLowerCase()) ||
      p.nombre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 border rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-2">Detalle de Venta</h2>

      {/* Input de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por ID, código o nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded p-2 w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter" && productosFiltrados.length > 0) {
              e.preventDefault();
              addProducto(productosFiltrados[0]);
            }
          }}
        />

        {query && (
          <ul className="border rounded mt-2 max-h-40 overflow-y-auto bg-white shadow">
            {productosFiltrados.map((p) => (
              <li
                key={p.id}
                onClick={() => addProducto(p)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                <span className="font-bold">{p.codigo}</span> - {p.nombre}{" "}
                <span className="text-sm text-gray-600">
                  (Bs {p.precio_activo?.precio_venta!.toFixed(2)})
                </span>
              </li>
            ))}
            {productosFiltrados.length === 0 && (
              <li className="p-2 text-gray-500">No se encontraron productos</li>
            )}
          </ul>
        )}
      </div>

      {/* Tabla de detalles */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Precio Unitario</th>
            <th className="p-2 border">Subtotal</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((d) => (
            <tr key={d.producto_id}>
              <td className="p-2 border">{d.nombre}</td>
              <td className="p-2 border">
                <input
                  type="number"
                  min={1}
                  value={d.cantidad}
                  onChange={(e) =>
                    updateCantidad(d.producto_id, Number(e.target.value))
                  }
                  className="w-16 border rounded p-1"
                />
              </td>
              <td className="p-2 border text-right">
                {d.precio_unitario.toFixed(2)}
              </td>
              <td className="p-2 border text-right">
                {d.subtotal.toFixed(2)}
              </td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => removeProducto(d.producto_id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {detalles.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-2 text-gray-500">
                No hay productos agregados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 font-bold text-lg">
        Total: {detalles.reduce((acc, d) => acc + d.subtotal, 0).toFixed(2)}
      </div>
    </div>
  );
};

export default DetalleVentaManager;
