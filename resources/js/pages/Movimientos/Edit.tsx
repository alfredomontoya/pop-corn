import { Caja } from "@/interfaces/Caja.Ingerface";
import { Cliente } from "@/interfaces/Clientes.Interface";
import { Movimiento } from "@/interfaces/Movimientos.Interface";
import AppLayout from "@/layouts/app-layout";
import Form from "@/pages/Movimientos/Form";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Movimientos", href: "/movimientos" },
];

interface Props {
  movimiento: Movimiento;
  clientes: Cliente[]
  caja: Caja
}

export default function Edit({ movimiento, clientes, caja }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Editar Movimiento {movimiento?.tipo} {movimiento?.id}</h1>
      <Form movimiento={movimiento} tipo={movimiento?.tipo} clientes={clientes} caja={caja} />
    </div>
    </AppLayout>
  );
}
