import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { Caja } from "@/interfaces/Caja.Ingerface"

interface ValidationErrors {
  [key: string]: string
}

interface PaginatedCajas {
  data: Caja[]
  links?: any[]
  current_page?: number
  last_page?: number,
  fecha?: string
}

export function useCaja() {
  const [cajas, setCajas] = useState<PaginatedCajas>({ data: [] })
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [fecha, setFecha] = useState<string>("")

//   useEffect(() => {
//     console.log("Cajas actualizadas:", cajas)
//     }, [cajas])

  // 🟢 Listar todas las cajas
const fetchCajas = async (params?: { fechaInicio?: string; fechaFin?: string }): Promise<void> => {
  try {
    setLoading(true);
    console.log("Fetching cajas...");

    // Construir URL con query params si hay fechas
    let url = "/cajas";
    if (params?.fechaInicio || params?.fechaFin) {
      const query = new URLSearchParams();
      if (params.fechaInicio) query.append("fechaInicio", params.fechaInicio);
      if (params.fechaFin) query.append("fechaFin", params.fechaFin);
      url += `?${query.toString()}`;
    }

    const { data } = await axios.get<PaginatedCajas>(url);
    setCajas(data);
    setFecha(data.fecha || "");
  } catch (error) {
    console.error("Error al obtener cajas:", error);
  } finally {
    setLoading(false);
  }
};


// 🟢 Obtener detalle de una caja (usa método show del controlador)
  const getCaja = async (id: number): Promise<Caja | null> => {
    try {
      setLoading(true)
      const { data } = await axios.get<Caja>(`/cajas/${id}`)
      return data
    } catch (error) {
      console.error("Error al obtener caja:", error)
      setErrors({ msg: "No se pudo obtener el detalle de la caja" })
      return null
    } finally {
      setLoading(false)
    }
  }

  // 🟢 Crear una nueva caja
  const createCaja = async (values: Partial<Caja>): Promise<boolean> => {
    console.log("Creating caja with values:", values)
    try {
      setLoading(true)
      setErrors({})
      await axios.post("/cajas", values)
      return true
    } catch (error) {
      const err = error as AxiosError<any>
      if (err.response?.status === 422) {
        // Laravel validation error
        const data = err.response.data
        if (typeof data.errors === "object") {
          setErrors(data.errors)
        } else if (data.message) {
          setErrors({ msg: data.message })
        }
      } else {
        console.error("Error al crear caja:", err)
        setErrors({ msg: "Error inesperado al crear la caja" })
      }
      return false
    } finally {
      setLoading(false)
    }
  }

  // 🟡 Actualizar caja existente
  const updateCaja = async (id: number, values: Partial<Caja>): Promise<boolean> => {
    try {
      setLoading(true)
      setErrors({})
      await axios.put(`/cajas/${id}`, values)
      await fetchCajas()
      return true
    } catch (error) {
      const err = error as AxiosError<any>
      if (err.response?.status === 422) {
        const data = err.response.data
        if (typeof data.errors === "object") {
          setErrors(data.errors)
        } else if (data.message) {
          setErrors({ msg: data.message })
        }
      } else {
        setErrors({ msg: "Error inesperado al actualizar la caja" })
      }
      return false
    } finally {
      setLoading(false)
    }
  }

  // 🔴 Eliminar caja
  const deleteCaja = async (id: number): Promise<boolean> => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar esta caja?")
    if (!confirmDelete) return false

    try {
      setLoading(true)
      await axios.delete(`/cajas/${id}`)
      await fetchCajas()
      return true
    } catch (error) {
      console.error("Error al eliminar caja:", error)
      setErrors({ msg: "No se pudo eliminar la caja" })
      return false
    } finally {
      setLoading(false)
    }
  }

  // 🟣 Cerrar caja
  const cerrarCaja = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/cajas/${id}/cerrar`);
      if (data.success) {
          // actualizar caja cerrada en el estado
          setCajas((prev) => ({
          ...prev,
          data: prev.data.map((caja) => (caja.id === id ? data.caja : caja)),
          }));
          return true;
      } else {
          setErrors({ msg: data.message });
          return false;
      }
    } catch (error) {
      const err = error as AxiosError<any>;
      setErrors({ msg: err.response?.data?.message || "Error al cerrar la caja" });
      return false;
    } finally {
    setLoading(false);
    }
  };

  return {
    cajas,
    loading,
    errors,
    fetchCajas,
    getCaja,
    createCaja,
    updateCaja,
    deleteCaja,
    cerrarCaja,
    fecha,
  }
}
