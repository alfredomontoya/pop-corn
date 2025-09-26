import { Cliente } from "@/interfaces/Clientes.Interface";
import React from "react";

interface ClienteDetailProps {
  cliente: Cliente| null;
  onClose: () => void;
}

export default function ClienteDetailModal({ cliente, onClose }: ClienteDetailProps) {
  if (!cliente) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Detalle Cliente</h2>
        <ul className="space-y-2 text-sm">
          <li><strong>ID:</strong> {cliente.id}</li>
          <li><strong>User ID:</strong> {cliente.user_id}</li>
          <li><strong>Tipo Documento:</strong> {cliente.tipo_documento}</li>
          <li><strong>Tipo:</strong> {cliente.tipo}</li>
          <li><strong>Número Documento:</strong> {cliente.numero_documento}</li>
          <li><strong>Nombre/Razón Social:</strong> {cliente.nombre_razon_social}</li>
          <li><strong>Dirección:</strong> {cliente.direccion}</li>
          <li><strong>Teléfono:</strong> {cliente.telefono}</li>
          <li><strong>Email:</strong> {cliente.email}</li>
          <li><strong>Estado:</strong> {cliente.estado}</li>
          <li><strong>Notas:</strong> {cliente.notas}</li>
          <li><strong>Creado:</strong> {new Date(cliente.created_at).toLocaleString()}</li>
          <li><strong>Actualizado:</strong> {new Date(cliente.updated_at).toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
}
