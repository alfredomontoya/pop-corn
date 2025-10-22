import React from "react"
import { Cliente } from "@/interfaces/Clientes.Interface"
import { Button } from "@/components/ui/button"

interface ClienteDetailModalProps {
  cliente: Cliente | null
  onClose: () => void
}

const ClienteDetailModal: React.FC<ClienteDetailModalProps> = ({ cliente, onClose }) => {
  if (!cliente) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Detalle del Cliente</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Información completa del cliente seleccionado.
        </p>

        <div className="space-y-3">
          <div>
            <span className="font-semibold">ID:</span> {cliente.id}
          </div>
          <div>
            <span className="font-semibold">Nombre / Razón Social:</span>{" "}
            {cliente.nombre_razon_social}
          </div>
          <div>
            <span className="font-semibold">Tipo cliente:</span>{" "}
            {`${cliente.tipo ?? ""}`}
          </div>
          <div>
            <span className="font-semibold">Documento:</span>{" "}
            {`${cliente.tipo_documento ?? "n/d"} ${cliente.numero_documento ?? "N/D"}`}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {cliente.email || "—"}
          </div>
          <div>
            <span className="font-semibold">Teléfono:</span> {cliente.telefono || "—"}
          </div>
          <div>
            <span className="font-semibold">Dirección:</span> {cliente.direccion || "—"}
          </div>
          <div>
            <span className="font-semibold">Ubicación:</span> {cliente.ubicacion || "—"} &nbsp;
            {cliente.ubicacion && (
              <Button
                variant={'default'}
                size={'sm'}
                onClick={(e) => {
                  e.stopPropagation();
                    window.open(`https://www.google.com/maps?q=${cliente.ubicacion}`, "_blank", "noopener,noreferrer");
                }}
                rel="noopener noreferrer" // seguridad al abrir nueva pestaña
              >
                Ver en mapa
              </Button>
            )}
          </div>
          <div>
            <span className="font-semibold">Creado por:</span> {cliente.user.email || "—"}
          </div>
          <div>
            <span className="font-semibold">Fecha creación:</span>{" "}
            {cliente.created_at ? new Date(cliente.created_at).toLocaleString() : "—"}
          </div>
          <div>
            <span className="font-semibold">Fecha actualización:</span>{" "}
            {cliente.updated_at ? new Date(cliente.updated_at).toLocaleString() : "—"}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ClienteDetailModal
