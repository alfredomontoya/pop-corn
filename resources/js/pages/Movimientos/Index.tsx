import { ItemsTable } from "@/components/Movimientos/ItemsTable";
import { Totales } from "@/components/Movimientos/Totales";
import Pagination from "@/components/PaginationInertia";
import { Button } from "@/components/ui/button";
import { PaginatedMovimientos } from "@/interfaces/Movimientos.Interface";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Link, router } from "@inertiajs/react";

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
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-6">

        {/* Totales */}
        <Totales totalIngresos={totalIngresos} totalEgresos={totalEgresos} saldo={saldo} />

        {/* Botones Crear Ingreso / Egreso */}

        <div className="flex gap-2 mb-6">
          <Button
            variant={'default'}
            onClick={ () => router.visit("/movimientos/create?tipo=ingreso")}
          >
            Nuevo Ingreso
          </Button>
          <Button
            variant={'secondary'}
            onClick={ () => router.visit("/movimientos/create?tipo=egreso")}
          >
            Nuevo Egreso
          </Button>
        </div>

        {/* Tabla */}
        <ItemsTable movimientos={movimientos} />

      </div>
    </AppLayout>
  );
}
