import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import { Cliente } from "@/interfaces/Clientes.Interface";
import Form from "./Form";

interface Props {
  clientes: Cliente[];
}

export default function Create({ clientes }: Props) {
  return (
    <AppLayout>
      <Head title="Nuevo Movimiento" />

      <div className="py-6">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <Form movimiento={null} tipo="ingreso" clientes={clientes} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
