import React from "react";
import { Link, router } from "@inertiajs/react";
import { Cliente } from "@/interfaces/Clientes.Interface";
import { Button } from "@/components/ui/button";
interface Props {
  clientes: Cliente[];
  onSelect: (cliente: Cliente) => void;
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void; // opcional para manejar eliminación
}

export default function ClientesTable({ clientes, onSelect, onEdit, onDelete }: Props) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Tipo de Documento</th>
          <th className="p-2 border">Tipo</th>
          <th className="p-2 border">Número de Documento</th>
          <th className="p-2 border">Nombre</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Teléfono</th>
          <th className="p-2 border">Dirección</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>|
        {clientes.map((cliente) => (
          <tr key={cliente.id} onClick={() => onSelect(cliente)} className="cursor-pointer hover:bg-gray-100">
            <td className="p-2 border">{cliente.id}</td>
            <td className="p-2 border">{cliente.tipo_documento}</td>
            <td className="p-2 border">{cliente.tipo}</td>
            <td className="p-2 border">{cliente.numero_documento}</td>
            <td className="p-2 border">{cliente.nombre_razon_social}</td>
            <td className="p-2 border">{cliente.email}</td>
            <td className="p-2 border">{cliente.telefono}</td>
            <td className="p-2 border">{cliente.direccion}</td>
            <td className="p-2 border space-x-2">
              <Button
                onClick={(e) => {
                    e.stopPropagation(); // evitar que se dispare el evento de selección
                    onEdit(cliente)
                }}
                variant={"default"}
              >
                Editar
              </Button>
            <Button
                onClick={(e) =>{
                    e.stopPropagation();
                    onDelete(cliente)
                }}
                variant={"destructive"}
            >
                Eliminar
            </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
