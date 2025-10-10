import React, { useState } from "react"
import axios from "axios"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { TextArea } from "../helpers/TextArea"
import { Label } from "../ui/label"

interface CreateModalProps {
  onClose: () => void
  onSaved: (msg: string) => void
}

const CategoriaCreateModal: React.FC<CreateModalProps> = ({ onClose, onSaved }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    imagen: null as File | null,
  })

  const [preview, setPreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setForm(prev => ({ ...prev, imagen: file }))
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value as any)
    })

    try {
      const { data } = await axios.post("/categorias", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (data.success) {
        setErrors({})
        onSaved(data.message)
        onClose()
      }
    } catch (err: any) {
      console.error("Errores de validación:", err.response?.data?.errors)
      setErrors(err.response?.data?.errors || {})
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-6 rounded w-96 bg-primary-foreground shadow-lg">
        <h2 className="text-xl font-bold mb-4">Nueva Categoría</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre[0]}</p>}
          </div>

          <TextArea
            label="Descripción"
            value={form.descripcion}
            onChange={(val) => setForm(prev => ({ ...prev, descripcion: val }))}
            placeholder="Descripción"
            error={errors.descripcion?.[0]}
          />

          <div>
            <Label htmlFor="imagen">Imagen</Label>
            <input id="imagen" type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <div className="mt-2 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancelar
            </Button>
            <Button type="submit">Crear</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoriaCreateModal
