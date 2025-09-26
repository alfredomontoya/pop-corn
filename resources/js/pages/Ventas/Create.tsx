import { Head } from "@inertiajs/react";
import { Cliente } from "@/interfaces/Clientes.Interface";
import { Producto } from "@/interfaces/Productos.Interface";
import { TipoPago, Venta } from "@/interfaces/Venta.Interface";
import AppLayout from "@/layouts/app-layout";
import VentaForm from "@/components/Ventas/VentaForm";
import { useVentas } from "@/hooks/Ventas/useVentas";

interface Props {
  clientes: Cliente[];
  tiposPago: TipoPago[];
  productos: Producto[];
}

export default function Create({ clientes, tiposPago, productos }: Props) {
  const { saveVenta } = useVentas("");

  const handleSubmit = (data: Partial<Venta>) => {
    saveVenta(data); // 👈 usa tu hook (POST automáticamente)
  };

  return (
    <AppLayout>
      <Head title="Nueva Venta" />

      <div className="py-6">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <VentaForm
              clientes={clientes}
              tiposPago={tiposPago}
              productos={productos}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
