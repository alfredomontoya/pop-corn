import React, { useState } from "react"
import { Categoria } from "@/interfaces/Categorias.Interface"
import { Button } from "@/components/ui/button"
import ZoomImageModal from "@/components/helpers/ZoomImageModal"

interface DetailModalProps {
  categoria: Categoria | null
  onClose: () => void
}

const CategoriaDetailModal: React.FC<DetailModalProps> = ({ categoria, onClose }) => {
  const [showZoom, setShowZoom] = useState(false)

  if (!categoria) return null

  const imageSrc = categoria.imagen?.startsWith("http")
    ? categoria.imagen
    : `/storage/${categoria.imagen ?? "images/default-category.png"}`

  return (
    <>
      {/* Overlay del modal detalle */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Detalle de Categoría</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Información completa de la categoría seleccionada.
          </p>

          <div className="space-y-4">
            {/* Imagen con click para ampliar */}
            <div className="flex justify-center">
              <img
                src={imageSrc}
                alt={categoria.nombre}
                className="w-40 h-40 object-cover rounded cursor-pointer hover:opacity-90 transition"
                onClick={() => setShowZoom(true)}
              />
            </div>

            <div>
              <span className="font-semibold">ID:</span> {categoria.id}
            </div>
            <div>
              <span className="font-semibold">Nombre:</span> {categoria.nombre}
            </div>
            {categoria.descripcion && (
              <div>
                <span className="font-semibold">Descripción:</span>{" "}
                {categoria.descripcion}
              </div>
            )}
            <div>
              <span className="font-semibold">Creado:</span>{" "}
              {categoria.created_at
                ? new Date(categoria.created_at).toLocaleString()
                : "—"}
            </div>
            <div>
              <span className="font-semibold">Actualizado:</span>{" "}
              {categoria.updated_at
                ? new Date(categoria.updated_at).toLocaleString()
                : "—"}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="secondary" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>

      {/* Zoom overlay */}
      <ZoomImageModal
        open={showZoom}
        onOpenChange={setShowZoom}
        src={imageSrc}
        alt={categoria.nombre}
      />
    </>
  )
}

export default CategoriaDetailModal
