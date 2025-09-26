import React, { useState } from "react";
import { Producto } from "@/interfaces/Productos.Interface";
import ZoomImageModal from "../helpers/ZoomImageModal";

interface ProductoImagesProps {
  producto: Producto;
}

const ProductoDetailImagenes: React.FC<ProductoImagesProps> = ({ producto }) => {
  const [showZoom, setShowZoom] = useState(false);
  const [zoomSrc, setZoomSrc] = useState("");

  if (!producto.imagenes || producto.imagenes.length === 0) return null;

  const principal = producto.imagenes.find((img) => img.es_principal);

  return (
    <div>
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

      <span className="font-semibold">Imágenes:</span>
      <div className="grid grid-cols-3 gap-3 mt-2">
        {producto.imagenes.map((img) => {
          const src = img.imagen.startsWith("http") ? img.imagen : `/storage/${img.imagen}`;
          return (
            <div key={img.id} className="relative">
              <img
                src={src}
                alt={producto.nombre}
                className={`w-full h-28 object-cover rounded cursor-pointer hover:opacity-90 transition ${
                  img.es_principal ? "border-4 border-blue-500" : "border"
                }`}
                onClick={() => {
                  setZoomSrc(src);
                  setShowZoom(true);
                }}
              />
              {img.es_principal && (
                <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                  Principal
                </span>
              )}
            </div>
          );
        })}
      </div>

      <ZoomImageModal open={showZoom} onOpenChange={setShowZoom} src={zoomSrc} alt={producto.nombre} />
    </div>
  );
};

export default ProductoDetailImagenes;
