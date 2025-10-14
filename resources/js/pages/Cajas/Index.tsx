import React, { useEffect, useState } from "react"
import { Link } from "@inertiajs/react"
import { useCaja } from "@/hooks/useCaja"
import { Caja } from "@/interfaces/Caja.Ingerface"
import AppLayout from "@/layouts/app-layout"
import CajaCreateModal from "@/components/Cajas/CajaCreateModa"
import { Button } from "@/components/ui/button"

interface Props {
    cajas: {
        data: Caja[]
        links: any[]
        current_page: number
        last_page: number
      }
      filters: {
        search?: string
        sort?: string
        direction?: string
      }
}

export const CajaIndex: React.FC<Props> = ({ cajas }) => {
    console.log('Cajas:')
    console.log(cajas)
  const { loading, cerrarCaja } = useCaja()
  const [refreshing, setRefreshing] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { cajas: cajasState, createCaja } = useCaja()

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false)
    createCaja({
        fecha_apertura: new Date().toISOString().split("T")[0],
        saldo_inicial: 0,
        observacion: "",
        estado: "ABIERTA",
    })
    // Aquí puedes agregar lógica adicional después de crear una caja, si es necesario
  }

  useEffect(() => {
    // Aquí podrías agregar lógica para recargar la lista de cajas si es necesario
  }, [])

  const handleAperturarCaja = () => {
    setIsCreateModalOpen(true)
  }
  const handleCerrarCaja = async (caja: Caja) => {
    if (confirm(`¿Cerrar la caja de ${caja.id} del usuario ${caja.user_id}?`)) {
      setRefreshing(true)
      await cerrarCaja(caja.id)
      setRefreshing(false)
    }
  }

  return (
    <AppLayout breadcrumbs={[{ title: "Captaciones", href: route("captaciones.index") }]}>
        <div className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Cajas</h1>
            <Button
            onClick={handleAperturarCaja}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
            Abrir Caja
            </Button>
        </div>

        {loading || refreshing ? (
            <p>Cargando...</p>
        ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full shadow rounded-lg">
                <thead>
                <tr className="text-left">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Usuario</th>
                    <th className="px-4 py-2">Saldo Inicial</th>
                    <th className="px-4 py-2">Ingresos</th>
                    <th className="px-4 py-2">Egresos</th>
                    <th className="px-4 py-2">Saldo Final</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {cajas.data.length === 0 ? (
                    <tr>
                    <td colSpan={8} className="px-4 py-2 text-center">
                        No hay cajas registradas.
                    </td>
                    </tr>
                ) : (
                    cajas.data.map((caja) => (
                    <tr key={caja.id} className="border-t hover:bg-gray-50/50">
                        <td className="px-4 py-2">{caja.id}</td>
                        <td className="px-4 py-2">{caja.user_id}</td>
                        <td className="px-4 py-2">{caja.saldo_inicial.toFixed(2)}</td>
                        <td className="px-4 py-2">{caja.total_ingresos.toFixed(2)}</td>
                        <td className="px-4 py-2">{caja.total_egresos.toFixed(2)}</td>
                        <td className="px-4 py-2">{caja.saldo_final?.toFixed(2) ?? "-"}</td>
                        <td className="px-4 py-2">
                        <span
                            className={`px-2 py-1 rounded text-white ${
                            caja.estado === "ABIERTA" ? "bg-green-500" : "bg-red-500"
                            }`}
                        >
                            {caja.estado}
                        </span>
                        </td>
                        <td className="px-4 py-2 space-x-2">
                        <Link
                            href={`/cajas/${caja.id}`}
                            className="px-2 py-1 rounded hover:bg-gray-300"
                        >
                            Ver
                        </Link>

                        {caja.estado === "ABIERTA" && (
                            <button
                            onClick={() => handleCerrarCaja(caja)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                            Cerrar
                            </button>
                        )}
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
        )}
        </div>

        <CajaCreateModal
            open={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSuccess={handleCreateSuccess} />
    </AppLayout>
  )
}

export default CajaIndex
