import { ItemsTable } from "@/components/Movimientos/ItemsTable";
import { Totales } from "@/components/Movimientos/Totales";
import PaginationInertia from "@/components/PaginationInertia";
import Pagination from "@/components/PaginationInertia";
import Toast from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { PaginatedMovimientos } from "@/interfaces/Movimientos.Interface";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Movimientos", href: "/movimientos" },
];

interface Props {
  movimientos: PaginatedMovimientos; // Cambia 'any' por el tipo correcto si lo tienes
  totalIngresos: number;
  totalEgresos: number;
  saldo: number;
}
export default function Index({ movimientos, totalIngresos, totalEgresos, saldo }: Props) {
  // 🔹 Filtros de fecha
  const [fechaInicio, setFechaInicio] = useState<string | null>(null);
  const [fechaFin, setFechaFin] = useState<string | null>(null);

  const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
  const [toastMessage, setToastMessage] = useState(flash?.success || null);

  // 🔹 Detectar cambio en flash.success (cuando se redirige desde store)
  useEffect(() => {
    if (flash?.success) {
      setToastMessage(flash.success);
    }
  }, [flash?.success]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-6">

        {/* Totales */}
        <Totales totalIngresos={totalIngresos} totalEgresos={totalEgresos} saldo={saldo} />

        {/* Botones Crear Ingreso / Egreso */}

        <div className="flex gap-2 mb-6">
          <Button
            variant={'default'}
            onClick={ () => router.visit("/movimientos/create?tipo=INGRESO")}
          >
            Nuevo Ingreso
          </Button>
          <Button
            variant={'secondary'}
            onClick={ () => router.visit("/movimientos/create?tipo=EGRESO")}
          >
            Nuevo Egreso
          </Button>
        </div>

        {/* filtro de fecha */}
        <div className="flex items-center space-x-2 mb-3">
          <label>Filtrar por fecha Desde:</label>
          <input
            type="date"
            value={fechaInicio || ""}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border rounded px-2 py-1"
          />

          <label>Hasta:</label>
          <input
            type="date"
            value={fechaFin || ""}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border rounded px-2 py-1"
          />

          <Button
            onClick={() => {
              router.visit('/movimientos', {
                method: 'get',
                data: {
                  fechaInicio,
                  fechaFin,
                },
                preserveState: true, // mantiene la paginación y scroll
              });
            }}
            variant="default"
          >
            Filtrar
          </Button>
        </div>

        {/* Tabla */}
        <ItemsTable movimientos={movimientos} />
        {/* Paginación */}
        <div className="flex gap-2 mt-4">
          <PaginationInertia
            links={movimientos.links}
            onPageChange={(url) => {
              if (url) router.visit(url, { preserveState: true })
            }}
          />
        </div>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
    </AppLayout>
  );
}
