import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import { Cliente } from "@/interfaces/Clientes.Interface";
import Form from "./Form";
import HeadingSmall from "@/components/heading-small";
import Heading from "@/components/heading";
import { Caja } from "@/interfaces/Caja.Ingerface";

interface Props {
  clientes: Cliente[];
  caja?: Caja | null;
  tipo?: "ingreso" | "egreso"; // prop opcional para Create
}

export default function Create({ clientes, caja, tipo }: Props) {
  return (
    <AppLayout breadcrumbs={ [{ title: "Movimientos", href: "/movimientos" }] }>
      <Head title="Nuevo Movimiento" />
      <div className="py-2">
        <div className="max-w-4xl">
          <div className="shadow rounded-lg p-6">
            <Heading
              title={`Nuevo Movimiento ${tipo}`}
              description={`Crea un nuevo movimiento de ${tipo}`}
            />

            <Form movimiento={null} tipo={tipo} clientes={clientes} caja={caja} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
