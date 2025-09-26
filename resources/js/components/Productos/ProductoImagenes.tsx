import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Minus, Trash2, Star, Replace } from "lucide-react";
import { Producto, ProductoImagen } from "@/interfaces/Productos.Interface";
import ZoomImageModal from "../helpers/ZoomImageModal";
import axios from "axios";

interface ProductoImagenesProps {
  productoSeleccionado: Producto | null;
  onClose: () => void;
  onUpdated?: () => void; // 🔹 callback para refrescar producto desde el padre
}

export default function ProductoImagenes({
  productoSeleccionado,
  onClose,
  onUpdated,
}: ProductoImagenesProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [principalIndex, setPrincipalIndex] = useState<number | null>(null);

  const [showZoom, setShowZoom] = useState(false);
  const [zoomSrc, setZoomSrc] = useState("");

  // Previews de imágenes nuevas
  useEffect(() => {
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  if (!productoSeleccionado?.id || !productoSeleccionado?.nombre) return null;

  // ---------- HANDLERS ----------
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    // Subida inmediata al backend
    const formData = new FormData();
    newFiles.forEach((f) => formData.append("imagenes[]", f));

    try {
      await axios.post(`/api/productos/${productoSeleccionado.id}/imagenes`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpdated?.(); // refrescar producto
    } catch (err) {
      console.error("Error al subir imágenes:", err);
    }

    setFiles([]);
  };

  const handleDelete = async (img: ProductoImagen) => {
    if (!confirm("¿Eliminar esta imagen?")) return;
    try {
      await axios.delete(`/api/productos/${productoSeleccionado.id}/imagenes/${img.id}`);
      onUpdated?.();
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const handleReplace = async (img: ProductoImagen, file: File) => {
    const formData = new FormData();
    formData.append("imagen", file);
    try {
      await axios.post(
        `/api/productos/${productoSeleccionado.id}/imagenes/${img.id}/replace`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onUpdated?.();
    } catch (err) {
      console.error("Error al reemplazar:", err);
    }
  };

  const handleSetPrincipal = async (img: ProductoImagen) => {
    try {
      await axios.post(`/api/productos/${productoSeleccionado.id}/imagenes/${img.id}/principal`);
      onUpdated?.();
    } catch (err) {
      console.error("Error al establecer principal:", err);
    }
  };

  const handleMinimize = () => {
    setFiles([]);
    setPreviews([]);
    setPrincipalIndex(null);
    onClose();
  };

  // ---------- RENDER ----------
  return (
    <div className="bg-white w-full rounded-2xl shadow-lg p-6 relative mt-4">
      {/* Botón minimizar */}
      <button
        onClick={handleMinimize}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
      >
        <Minus className="w-6 h-6" />
      </button>

      <h2 className="text-xl font-semibold mb-4">
        Imágenes de:{" "}
        <span className="text-blue-600">{productoSeleccionado?.nombre}</span> (ID:{" "}
        {productoSeleccionado?.id})
      </h2>

      {/* Imágenes existentes */}
      {productoSeleccionado.imagenes && productoSeleccionado.imagenes.length > 0 && (
        <div>
          <span className="font-semibold">Imágenes guardadas:</span>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {productoSeleccionado.imagenes.map((img) => {
              const src = img.imagen.startsWith("http")
                ? img.imagen
                : `/storage/${img.imagen}`;
              return (
                <div key={img.id} className="relative border rounded-lg overflow-hidden">
                  <img
                    src={src}
                    alt={productoSeleccionado.nombre}
                    className={`w-full h-28 object-cover cursor-pointer hover:opacity-90 transition ${
                      img.es_principal ? "border-4 border-blue-500" : "border"
                    }`}
                    onClick={() => {
                      setZoomSrc(src);
                      setShowZoom(true);
                    }}
                  />

                  {/* Botones */}
                  <div className="absolute top-1 right-1 flex gap-1">
                    <button
                      onClick={() => handleSetPrincipal(img)}
                      className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                      title="Hacer principal"
                    >
                      <Star size={14} />
                    </button>
                    <label className="bg-indigo-500 text-white p-1 rounded cursor-pointer hover:bg-indigo-600">
                      <Replace size={14} />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          e.target.files?.[0] && handleReplace(img, e.target.files[0])
                        }
                      />
                    </label>
                    <button
                      onClick={() => handleDelete(img)}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {img.es_principal && (
                    <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                      Principal
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subir nuevas imágenes */}
      <Label className="mt-4 block">Subir nuevas imágenes</Label>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="w-full border rounded-lg p-2 mb-3"
      />

      {/* Previews antes de enviar */}
      {previews.length > 0 && (
        <div className="flex gap-3 mt-3 flex-wrap">
          {previews.map((src, i) => (
            <div
              key={i}
              className={`relative border rounded-lg p-1 cursor-pointer ${
                principalIndex === i ? "border-green-500" : ""
              }`}
            >
              <img
                src={src}
                alt={`preview-${i}`}
                className="w-24 h-24 object-cover rounded-lg"
                onClick={() => setPrincipalIndex(i)}
              />
              {principalIndex === i && (
                <span className="absolute top-1 right-1 bg-green-600 text-white text-xs px-1 rounded">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal zoom */}
      <ZoomImageModal
        open={showZoom}
        onOpenChange={setShowZoom}
        src={zoomSrc}
        alt={productoSeleccionado.nombre}
      />
    </div>
  );
}
