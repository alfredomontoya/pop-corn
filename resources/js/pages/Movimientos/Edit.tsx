import { Movimiento } from "@/interfaces/Movimientos.Interface";
import AppLayout from "@/layouts/app-layout";
import Form from "@/pages/Movimientos/Form";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Movimientos", href: "/movimientos" },
];

interface Props {
  movimiento: Movimiento;
}

export default function Edit({ movimiento }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Editar Movimiento {movimiento?.tipo} {movimiento?.nro}</h1>
      <Form movimiento={movimiento} tipo={movimiento?.tipo} />
    </div>
    </AppLayout>
  );
}
