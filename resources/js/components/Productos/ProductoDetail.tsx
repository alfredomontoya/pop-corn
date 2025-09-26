import React from "react";
import { Producto } from "@/interfaces/Productos.Interface";
import ProductoImages from "./ProductoDetailImagenes";
import ProductoPrices from "./ProductoDetailPrecios"

interface DetailProps {
  producto: Producto | null;
}

const formatoFecha = (fecha: string | null | undefined) => {
  if (!fecha) return "—";
  return new Date(fecha).toLocaleDateString();
};

const ProductoDetail: React.FC<DetailProps> = ({ producto }) => {
  if (!producto) return <div>No hay producto seleccionado.</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Detalle del Producto</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Información completa del producto seleccionado.
      </p>

      <div className="space-y-4">
        <div><span className="font-semibold">ID:</span> {producto.id}</div>
        <div><span className="font-semibold">Nombre:</span> {producto.nombre}</div>
        {producto.descripcion && (
          <div><span className="font-semibold">Descripción:</span> {producto.descripcion}</div>
        )}
        <div><span className="font-semibold">Categoría:</span> {producto.categoria?.nombre ?? "—"}</div>
        <div>
          <span className="font-semibold">Precio actual:</span>{" "}
          {producto.precio_activo?.precio_venta ?? "—"}{" "}
          <span className="ml-2 text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700">
            Activo: {producto.precio_activo?.activo ? "Sí" : "No"}
          </span>
        </div>
        <div><span className="font-semibold">Creado:</span> {formatoFecha(producto.created_at)}</div>
        <div><span className="font-semibold">Actualizado:</span> {formatoFecha(producto.updated_at)}</div>

        {/* Componentes separados */}
        <ProductoImages producto={producto} />
        <ProductoPrices producto={producto} />
      </div>
    </div>
  );
};

export default ProductoDetail;
