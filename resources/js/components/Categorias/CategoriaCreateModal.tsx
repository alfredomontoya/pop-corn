import React, { useState } from "react"
import { router } from "@inertiajs/react"
import { Button } from "../ui/button"

interface CreateModalProps {
  onClose: () => void
  onSaved: (msg: string) => void
}

const CategoriaCreateModal: React.FC<CreateModalProps> = ({ onClose, onSaved }) => {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [imagen, setImagen] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setImagen(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("nombre", nombre)
    formData.append("descripcion", descripcion)
    if (imagen) formData.append("imagen", imagen)

    router.post("/categorias", formData, {
      onSuccess: () => {
        onClose()
        onSaved(`Categoría '${nombre}' creada correctamente ✅`)
      },
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-6 rounded w-96 bg-neutral-100 dark:bg-neutral-800">
        <h2 className="text-xl font-bold mb-4">Nueva Categoría</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nombre con label flotante */}
          <div className="relative">
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              required
              className="peer w-full border rounded-lg p-2 pt-5 focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="nombre"
              className="absolute left-2 top-2 text-gray-500 text-sm
                         peer-placeholder-shown:top-5
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-base
                         transition-all"
            >
              Nombre
            </label>
          </div>

          {/* Descripción con label flotante */}
          <div className="relative">
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
              className="peer w-full border rounded-lg p-2 pt-5 resize-none focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="descripcion"
              className="absolute left-2 top-2 text-gray-500 text-sm
                         peer-placeholder-shown:top-5
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-base
                         transition-all"
            >
              Descripción
            </label>
          </div>

          {/* Subir imagen */}
          <div>
            <label className="block mb-1 font-medium">Imagen</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
          </div>

          {/* Preview de imagen */}
          {preview && (
            <div className="mb-4 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="default">
              Crear
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoriaCreateModal
