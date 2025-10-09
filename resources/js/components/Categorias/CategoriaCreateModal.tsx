import React, { useState } from "react"
import axios from "axios"
import { router } from "@inertiajs/react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { TextArea } from "../helpers/TextArea"
import { Label } from "../ui/label"
import { Categoria, CreateCategoria } from "@/interfaces/Categorias.Interface"

interface CreateModalProps {
  onClose: () => void
  onSaved: (msg: string) => void
}

const
CategoriaCreateModal: React.FC<CreateModalProps> = ({ onClose, onSaved }) => {
  const [nombre, setNombre] = useState(null)
  const [descripcion, setDescripcion] = useState("")
  const [imagen, setImagen] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

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

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    // const formData = new FormData()
    // formData.append("nombre", nombre)
    // formData.append("descripcion", descripcion)
    // if (imagen) formData.append("imagen", imagen)

    // router.post("/categorias", formData, {
    //   onSuccess: () => {
    //     onClose()
    //     onSaved(`Categoría '${nombre}' creada correctamente ✅`)
    //   },
    // })

    const categoria: CreateCategoria = {
        nombre: nombre,
        descripcion: descripcion
    }

    try {
        await axios.post('/categorias', categoria)
    } catch (err: any) {
      console.log('Errores de validación:', err);
      setErrors(err);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-6 rounded w-96 bg-primary-foreground shadow-lg">
        <h2 className="text-xl font-bold mb-4">Nueva Categoría</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nombre con label flotante */}
          <div className="relative">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre[0]}</p>}

          </div>

          {/* Descripción con label flotante */}
          <div className="relative">
            <TextArea
                label="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
            />
            {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion[0]}</p>}
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
