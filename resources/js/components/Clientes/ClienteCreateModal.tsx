import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import ClienteForm, { ClienteFormValues } from "./ClienteForm";

interface ClienteCreateModalProps {
  onClose: () => void;
  onSaved: (msg: string) => void;
}

const ClienteCreateModal: React.FC<ClienteCreateModalProps> = ({ onClose, onSaved }) => {
  const [values, setValues] = useState<ClienteFormValues>({
    tipo_documento: "",
    tipo: "",
    numero_documento: "",
    nombre_razon_social: "",
    propietario: "",
    direccion: "",
    ubicacion: "",
    telefono: "",
    email: "",
    // estado: "activo",
    notas: "",
  });

  const handleChange = (field: keyof ClienteFormValues, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convertimos values a FormData
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value)); // Convertimos todo a string
      }
    });

    router.post("/clientes", formData, {
      onSuccess: () => {
        onClose();
        onSaved(`Cliente '${values.nombre_razon_social}' creado correctamente ✅`);
      },
      onError: (errors) => {
        console.error(errors);
        alert("Error al crear el cliente. Ver consola para más detalles.");
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
        <h2 className="text-xl font-bold mb-4">Nuevo Cliente</h2>
        <ClienteForm
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={onClose}
          submitLabel="Crear"
        />
      </div>
    </div>
  );
};

export default ClienteCreateModal;
