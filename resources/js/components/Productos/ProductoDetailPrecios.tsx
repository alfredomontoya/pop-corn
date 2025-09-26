import React from "react";
import { Producto } from "@/interfaces/Productos.Interface";

interface ProductoPricesProps {
  producto: Producto;
}

const formatoFecha = (fecha: string | null | undefined) => {
  if (!fecha) return "—";
  return new Date(fecha).toLocaleDateString();
};

const ProductoDetailPricios: React.FC<ProductoPricesProps> = ({ producto }) => {
  if (!producto.precios || producto.precios.length === 0) return null;

  return (
    <div>
      <span className="font-semibold">Historial de precios:</span>
      <table className="w-full mt-2 border text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-2 py-1 text-left">Precio Venta</th>
            <th className="px-2 py-1 text-left">Precio Compra</th>
            <th className="px-2 py-1 text-left">Activo</th>
            <th className="px-2 py-1 text-left">Inicio</th>
            <th className="px-2 py-1 text-left">Fin</th>
          </tr>
        </thead>
        <tbody>
          {producto.precios.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-2 py-1">{p.precio_venta}</td>
              <td className="px-2 py-1">{p.precio_compra}</td>
              <td className="px-2 py-1">{p.activo ? "Sí" : "No"}</td>
              <td className="px-2 py-1">{formatoFecha(p.fecha_inicio)}</td>
              <td className="px-2 py-1">{formatoFecha(p.fecha_fin)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoDetailPricios;
