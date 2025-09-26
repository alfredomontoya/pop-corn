import React, { useState } from "react"
import { router } from "@inertiajs/react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface Categoria {
  id: number
  nombre: string
  descripcion?: string
  imagen?: string
}

interface EditModalProps {
  categoria: Categoria
  onClose: () => void
  onSaved: (msg: string) => void
}

const CategoriaEditModal: React.FC<EditModalProps> = ({ categoria, onClose, onSaved }) => {
  const [nombre, setNombre] = useState(categoria.nombre)
  const [descripcion, setDescripcion] = useState(categoria.descripcion || "")
  const [imagen, setImagen] = useState<File | null>(null)

  // Preview de imagen (inicial: la que ya tiene la categoría)
  const [preview, setPreview] = useState<string | null>(
    categoria.imagen
      ? categoria.imagen.startsWith("http")
        ? categoria.imagen
        : `/storage/${categoria.imagen}`
      : null
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setImagen(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("nombre", nombre)
    formData.append("descripcion", descripcion)
    if (imagen) formData.append("imagen", imagen)
    formData.append("_method", "PUT")

    router.post(`/categorias/${categoria.id}`, formData, {
      onSuccess: () => {
        onSaved(`Categoría '${nombre}' actualizada correctamente ✅`)
        onClose()
      },
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-6 rounded w-96 bg-neutral-100 dark:bg-neutral-800">
        <h2 className="text-xl font-bold mb-4">Editar Categoría</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nombre"
            className="border p-2 w-full mb-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <textarea
            placeholder="Descripción"
            className="border p-2 w-full mb-2"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2"
          />

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
            <Button onClick={onClose} variant={"secondary"}>
              Cancelar
            </Button>
            <Button type="submit" variant={"default"}>
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoriaEditModal
