import React, { useState, useEffect } from "react";
import { Producto } from "@/interfaces/Productos.Interface";
import { Button } from "../ui/button";
import ZoomImageModal from "../helpers/ZoomImageModal";
import { X } from "lucide-react";

interface DetailModalProps {
  producto: Producto | null;
  onClose: () => void;
}

const formatoFecha = (fecha: string | null | undefined) => {
  if (!fecha) return "—";
  return new Date(fecha).toLocaleDateString();
};

const ProductoResumenModal: React.FC<DetailModalProps> = ({ producto, onClose }) => {
  const [showZoom, setShowZoom] = useState(false);
  const [zoomSrc, setZoomSrc] = useState("");

  if (!producto) return null;

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Imagen principal
  const principal = producto.imagenes?.find((img) => img.es_principal);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] p-6 relative shadow-lg overflow-y-auto">

          {/* Botón X con fondo circular */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-gray-200 dark:bg-gray-700 rounded-full p-1.5 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <X size={18} className="text-gray-700 dark:text-gray-200" />
          </button>

          {/* Imagen principal arriba */}
          {principal && (
            <div className="flex justify-center mb-4">
              <img
                src={principal.imagen.startsWith("http") ? principal.imagen : `/storage/${principal.imagen}`}
                alt={producto.nombre}
                className="w-56 h-56 object-cover rounded-lg border-4 border-blue-500 shadow-md cursor-pointer hover:opacity-90 transition"
                onClick={() => {
                  setZoomSrc(principal.imagen.startsWith("http") ? principal.imagen : `/storage/${principal.imagen}`);
                  setShowZoom(true);
                }}
              />
            </div>
          )}

          <h2 className="text-xl font-semibold mb-2">Detalle del Producto</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Información Resumida del producto seleccionado.
          </p>

          <div className="space-y-4">
            {/* Datos básicos */}
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
            <div><span className="font-semibold">Creado:</span> {producto.created_at}- {formatoFecha(producto.created_at)}</div>
            <div><span className="font-semibold">Actualizado:</span> {formatoFecha(producto.updated_at)}</div>
          </div>

          {/* Botón cerrar abajo */}
          <div className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={onClose}>Cerrar</Button>
          </div>
        </div>
      </div>

      {/* Modal de zoom */}
      <ZoomImageModal open={showZoom} onOpenChange={setShowZoom} src={zoomSrc} alt={producto.nombre} />
    </>
  );
};

export default ProductoResumenModal;
