import React, { useState, useEffect } from "react";
import { X, Star, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ProductoImagen } from "@/interfaces/Productos.Interface";

interface Props {
  productoId: number | null; // ID del producto
  imagenesGuardadas: ProductoImagen[]; // imágenes que vienen del backend
  onUpdated?: (mensaje: string) => void; // callback opcional
}

const ProductoImagenesManager: React.FC<Props> = ({ productoId, imagenesGuardadas, onUpdated }) => {
  const [imagenes, setImagenes] = useState<ProductoImagen[]>(imagenesGuardadas);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    setImagenes(imagenesGuardadas);
  }, [imagenesGuardadas]);

  // Manejar selección de archivos y generar previews
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  // Subir imágenes seleccionadas
  const uploadPreviews = async () => {
    if (!productoId || selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("imagenes[]", file));

    try {
      const { data } = await axios.post(`/productos/${productoId}/storeImages`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImagenes((prev) => [...prev, ...data.imagenes]);
      setPreviews([]);
      setSelectedFiles([]);
      onUpdated?.("Imágenes guardadas correctamente");
    } catch (error: any) {
      console.error("Error al subir imágenes:", error.response?.data || error.message);
      onUpdated?.("Error al subir imágenes");
    }
  };

  // Eliminar imagen
  const handleRemove = async (imagenId?: number) => {
  if (!imagenId) return;
  try {
    const { data } = await axios.delete(`/productoimagenes/${imagenId}`);

    if (data.productoImagenes) {
      setImagenes(data.productoImagenes); // Reemplaza el estado con la lista actualizada
    }

    onUpdated?.(data.message || "Imagen eliminada");
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
  }
};


  // Establecer como principal
  const setPrincipal = async (imagenId?: number) => {
    console.log('esPrincipal')
    console.log(imagenId)
    if (!imagenId) return;
    try {
      const result = await axios.patch(`/productoimagenes/${imagenId}/setPrincipal`);
      console.log('result')
      console.log(result)
      setImagenes((prev) =>
        prev.map((img) => ({ ...img, es_principal: img.id === imagenId }))
      );
      onUpdated?.("Imagen principal actualizada");
    } catch (error) {
      console.error("Error al establecer imagen principal:", error);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Imágenes del producto</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Configurar imágenes del producto
      </p>

      {/* Input y previews */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <Upload className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-700">Seleccionar imágenes</span>
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>

        {/* Mostrar previews */}
        {previews.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
              {previews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-full aspect-square rounded-xl overflow-hidden border border-gray-300 object-cover"
                />
              ))}
            </div>
            <Button className="mt-2" onClick={uploadPreviews}>
              Guardar Imágenes
            </Button>
          </div>
        )}
      </div>

      {/* Grid de imágenes existentes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {imagenes.map((img) => (
            <div key={img.id ?? img.imagen} className="relative group">
            {/* Contenedor cuadrado */}
            <div
                className={`w-full aspect-square rounded-xl overflow-hidden border ${
                img.es_principal ? "border-blue-500" : "border-gray-300"
                }`}
            >
                <img
                src={img.imagen.startsWith("http") ? img.imagen : `/storage/${img.imagen}`}
                alt={`imagen-${img.id}`}
                className="w-full h-full object-cover"
                />
            </div>

            {/* Botones flotantes */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                    onClick={() => handleRemove(img.id)}
                    className="p-1 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
                    title="Eliminar"
                >
                <X className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setPrincipal(img.id)}
                    className={`p-1 rounded-full shadow ${
                        img.es_principal
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-700 text-white hover:bg-yellow-400 hover:text-black"
                    }`}
                    title="Establecer como principal"
                >
                <Star className="w-4 h-4" />
                </button>
            </div>

            {/* Etiqueta principal */}
            {!!img.es_principal && (
                <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                    Principal
                </span>
            )}
            </div>
        ))}
        </div>

    </div>
  );
};

export default ProductoImagenesManager;
