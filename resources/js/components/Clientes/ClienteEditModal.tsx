import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Cliente } from "@/interfaces/Clientes.Interface";

interface EditModalProps {
  cliente: Cliente;
  onClose: () => void;
  onSaved: (msg: string) => void;
}

const ClienteEditModal: React.FC<EditModalProps> = ({ cliente, onClose, onSaved }) => {
  const [numeroDocumento, setNumeroDocumento] = useState(cliente.numero_documento);
  const [nombreRazonSocial, setNombreRazonSocial] = useState(cliente.nombre_razon_social);
  const [direccion, setDireccion] = useState(cliente.direccion);
  const [telefono, setTelefono] = useState(cliente.telefono);
  const [email, setEmail] = useState(cliente.email);
  const [notas, setNotas] = useState(cliente.notas || "");

  const [tipoDocumento, setTipoDocumento] = useState(cliente.tipo_documento || "CI");
  const [tipo, setTipo] = useState(cliente.tipo || "activo");
  const [estado, setEstado] = useState(cliente.estado || "activo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("numero_documento", numeroDocumento);
    formData.append("nombre_razon_social", nombreRazonSocial);
    formData.append("direccion", direccion);
    formData.append("telefono", telefono);
    formData.append("email", email);
    formData.append("notas", notas);
    formData.append("tipo_documento", tipoDocumento);
    formData.append("tipo", tipo);
    formData.append("estado", estado);
    formData.append("_method", "PUT");

    router.post(`/clientes/${cliente.id}`, formData, {
      onSuccess: () => {
        onSaved(`Cliente '${nombreRazonSocial}' actualizado correctamente ✅`);
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-6 rounded w-96 bg-neutral-100 dark:bg-neutral-800">
        <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-2">

          <Input
            type="text"
            placeholder="Número de documento"
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
            required
          />

          <Select value={tipoDocumento} onValueChange={(v) => setTipoDocumento(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CI">CI</SelectItem>
              <SelectItem value="NIT">NIT</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Nombre o Razón Social"
            value={nombreRazonSocial}
            onChange={(e) => setNombreRazonSocial(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Notas"
            className="border p-2 w-full"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />

          <Select value={tipo} onValueChange={(v) => setTipo(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={estado} onValueChange={(v) => setEstado(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-end space-x-2 mt-2">
            <Button onClick={onClose} variant="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="default">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteEditModal;
