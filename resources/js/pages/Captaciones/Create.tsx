import AppLayout from "@/layouts/app-layout";
import Form from "./Form";

interface Props {
  asesores: { id: number; name: string }[];
}

export default function Create({ asesores }: Props) {
  return (
    <AppLayout breadcrumbs={[{ title: "Captaciones", href: route("captaciones.index") }]}  >
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Nueva Captación</h1>
      <Form asesores={asesores} />
    </div>
  </AppLayout>
  );
}
