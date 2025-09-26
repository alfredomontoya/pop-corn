import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export function useCrearCliente(onSuccess?: () => void) {
  const { data, setData, post, processing, errors, reset } = useForm({
    tipo_documento: "CI",
    tipo: "NATURAL",
    numero_documento: "",
    nombre_razon_social: "",
    direccion: "",
    telefono: "",
    email: "",
    estado: "activo",
    notas: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("clientes.store"), {
      onSuccess: () => {
        toast.success("Cliente creado correctamente!");
        if (onSuccess) onSuccess();
        reset();
      },
      onError: () => {
        toast.error("Ocurrió un error al crear el cliente");
      },
    });
  };

  return { data, setData, handleSubmit, processing, errors, reset };
}
