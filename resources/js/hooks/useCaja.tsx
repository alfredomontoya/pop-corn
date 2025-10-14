import { useState } from "react"
import { router } from "@inertiajs/react"
import axios, { AxiosError } from "axios"
import { Caja } from "@/interfaces/Caja.Ingerface"


interface ValidationErrors {
  [key: string]: string
}

export function useCaja() {
  const [cajas, setCajas] = useState<Caja[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<ValidationErrors>({})



  // 🟢 Listar todas las cajas
  const fetchCajas = async (): Promise<void> => {
    try {
      setLoading(true)
      const { data } = await axios.get<Caja[]>("/cajas")
      setCajas(data)
    } catch (error) {
      console.error("Error al obtener cajas:", error)
    } finally {
      setLoading(false)
    }
  }

  // 🟢 Crear una nueva caja
  const createCaja = async (values: Partial<Caja>): Promise<void> => {
    try {
      setLoading(true)
      setErrors({})
      router.post("/cajas", values, {
        onSuccess: () => fetchCajas(),
        onError: (err: Record<string, string>) => setErrors(err),
      })
    } finally {
      setLoading(false)
    }
  }

  // 🟡 Actualizar caja existente
  const updateCaja = async (id: number, values: Partial<Caja>): Promise<void> => {
    try {
      setLoading(true)
      setErrors({})
      router.put(`/cajas/${id}`, values, {
        onSuccess: () => fetchCajas(),
        onError: (err: Record<string, string>) => setErrors(err),
      })
    } finally {
      setLoading(false)
    }
  }

  // 🔴 Eliminar caja
  const deleteCaja = async (id: number): Promise<void> => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar esta caja?")
    if (!confirmDelete) return

    try {
      setLoading(true)
      router.delete(`/cajas/${id}`, {
        onSuccess: () => fetchCajas(),
      })
    } finally {
      setLoading(false)
    }
  }

  // 🟣 Cerrar caja (por ejemplo, sumar ingresos/egresos y actualizar estado)
  const cerrarCaja = async (id: number): Promise<void> => {
    try {
      setLoading(true)
      await axios.post(`/cajas/${id}/cerrar`)
      await fetchCajas()
    } catch (error) {
      const err = error as AxiosError
      console.error("Error al cerrar caja:", err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    cajas,
    loading,
    errors,
    fetchCajas,
    createCaja,
    updateCaja,
    deleteCaja,
    cerrarCaja,
  }
}
