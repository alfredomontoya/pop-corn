import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "../ui/button";
import ClienteForm, { ClienteFormValues } from "./ClienteForm";
import { Cliente } from "@/interfaces/Clientes.Interface";
import { X } from "lucide-react";

interface EditModalProps {
  cliente: Cliente;
  onClose: () => void;
  onSaved: (msg: string) => void;
}

const ClienteEditModal: React.FC<EditModalProps> = ({ cliente, onClose, onSaved }) => {
  // Inicializamos los valores con los datos del cliente
  const [values, setValues] = useState<ClienteFormValues>({
    tipo_documento: (cliente.tipo_documento as "CI" | "NIT") || "CI",
    tipo: (cliente.tipo as "NATURAL" | "JURIDICO") || "NATURAL",
    numero_documento: cliente.numero_documento || "",
    nombre_razon_social: cliente.nombre_razon_social || "",
    propietario: cliente.propietario || "",
    direccion: cliente.direccion || "",
    ubicacion: cliente.ubicacion || "",
    telefono: cliente.telefono || "",
    email: cliente.email || "",
    notas: cliente.notas || "",
  });

  const handleChange = (field: keyof ClienteFormValues, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // FormData para PUT
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    formData.append("_method", "PUT"); // Indica que es actualización

    router.post(`/clientes/${cliente.id}`, formData, {
      onSuccess: () => {
        onSaved(`Cliente '${values.nombre_razon_social}' actualizado correctamente ✅`);
        onClose();
      },
      onError: (errors) => {
        console.error(errors);
        alert("Error al actualizar el cliente. Ver consola para más detalles.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative p-6 rounded w-96 max-h-[80vh] overflow-y-auto bg-neutral-100 dark:bg-neutral-800">
        {/* Botón de cerrar */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
        <ClienteForm
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Actualizar"
          onClose={onClose}
        />
        <div className="flex justify-end mt-2">
          <Button onClick={onClose} variant="secondary">Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default ClienteEditModal;
