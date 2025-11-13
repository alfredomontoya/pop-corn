import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import Heading from "@/components/heading";
import HeadingSmall from "@/components/heading-small";
import { Cliente } from "@/interfaces/Clientes.Interface";
import { Caja } from "@/interfaces/Caja.Ingerface";
import { Movimiento } from "@/interfaces/Movimientos.Interface";
import { Button } from "@/components/ui/button";

interface Props {
  movimiento: Movimiento;
  cliente?: Cliente | null;
  caja?: Caja | null;
}

export default function Show({ movimiento, cliente, caja }: Props) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Movimientos", href: "/movimientos" },
        { title: `Movimiento #${movimiento.id}`, href: `/movimientos/${movimiento.id}` },
      ]}
    >
      <Head title={`Movimiento #${movimiento.id}`} />

      <div className="py-2">
        <div className="max-w-4xl">
          <div className="shadow rounded-lg p-6">
            <Heading
              title={`Detalle del Movimiento #${movimiento.id}`}
              description="Información completa del movimiento registrado"
            />

            <div className="mt-6 space-y-4 text-gray-700">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <HeadingSmall title="Tipo" />
                  <p className="text-sm font-medium capitalize">{movimiento.tipo}</p>
                </div>

                <div>
                  <HeadingSmall title="Monto" />
                  <p className="text-sm font-medium">{movimiento.monto} Bs.</p>
                </div>

                <div>
                  <HeadingSmall title="Fecha" />
                  <p className="text-sm font-medium">{movimiento.fecha}</p>
                </div>

                <div>
                  <HeadingSmall title="Cliente" />
                  <p className="text-sm font-medium">
                    {cliente ? `${cliente.nombre_razon_social}` : "—"}
                  </p>
                </div>

                <div>
                  <HeadingSmall title="Caja" />
                  <p className="text-sm font-medium">{caja?.id ?? "—"}</p>
                </div>

                <div>
                  <HeadingSmall title="Descripción" />
                  <p className="text-sm font-medium">
                    {movimiento.descripcion || "Sin descripción"}
                  </p>
                </div>

                <div>
                  <HeadingSmall title="Registrado" />
                  <p className="text-sm font-medium">
                    {movimiento.created_at}
                  </p>
                </div>
                <div>
                  <HeadingSmall title="Última actualización" />
                  <p className="text-sm font-medium">
                    {movimiento.updated_at}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  variant={'default'}
                  onClick={() => window.history.back()}

                >
                  ← Volver al listado
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
