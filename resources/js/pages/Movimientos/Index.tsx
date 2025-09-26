import { ItemsTable } from "@/components/Movimientos/ItemsTable";
import { Totales } from "@/components/Movimientos/Totales";
import Pagination from "@/components/Pagination";
import { PaginatedMovimientos } from "@/interfaces/Movimientos.Interface";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Link } from "@inertiajs/react";

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
          <Link
            href="/movimientos/create?tipo=ingreso"
            as="button"
            method="get"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Nuevo Ingreso
          </Link>
          <Link
            href="/movimientos/create?tipo=egreso"
            as="button"
            method="get"
            data={{ tipo: "egreso" }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Nuevo Egreso
          </Link>
        </div>

        {/* Tabla */}
        <ItemsTable movimientos={movimientos} />

      </div>
    </AppLayout>
  );
}
