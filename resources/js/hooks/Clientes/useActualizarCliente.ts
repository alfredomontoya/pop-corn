import { useForm } from "@inertiajs/react";
import { Cliente } from "@/interfaces/Clientes.Interface";
import React from "react";

type ClienteFormData = {
  tipo_documento: "CI" | "PASAPORTE" | string;
  tipo: "NATURAL" | "JURIDICO" | string;
  numero_documento: string;
  nombre_razon_social: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: string;
  notas: string;
};

export function useActualizarCliente(
  cliente: Cliente,
  onSuccess?: () => void,
  onError?: (errors: Partial<Record<keyof ClienteFormData, string[]>>) => void
) {
  const { data, setData, put, processing, errors, reset } = useForm<ClienteFormData>({
    tipo_documento: cliente.tipo_documento || "CI",
    tipo: cliente.tipo || "NATURAL",
    numero_documento: cliente.numero_documento || "",
    nombre_razon_social: cliente.nombre_razon_social || "",
    direccion: cliente.direccion || "",
    telefono: cliente.telefono || "",
    email: cliente.email || "",
    estado: cliente.estado || "activo",
    notas: cliente.notas || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(route("clientes.update", cliente.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        console.log("Cliente actualizado correctamente");
        if (onSuccess) onSuccess();
      },
      onError: (errs) => {
        console.log("Errores de validación:", errs);
        if (onError) onError(errs);
      },
    });
  };

  return { data, setData, handleSubmit, processing, errors, reset };
}
