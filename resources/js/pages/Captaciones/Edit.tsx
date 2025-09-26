import AppLayout from "@/layouts/app-layout";
import Form from "./Form";
import { Captacion } from "@/interfaces/Captaciones.Interface";

interface Props {
  captacion: Captacion;
  asesores: { id: number; name: string }[];
}

export default function Edit({ captacion, asesores }: Props) {
  return (
    <AppLayout breadcrumbs={[{ title: "Captaciones", href: route("captaciones.index") }]}  >
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Captación</h1>
      <Form captacion={captacion} asesores={asesores} />
    </div>
  </AppLayout>
    );
}
