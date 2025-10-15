import { PaginatedMovimientos } from "@/interfaces/Movimientos.Interface";
import Pagination from "../PaginationInertia";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs"
import { Button } from "../ui/button";


interface Props {
    movimientos: PaginatedMovimientos;
}

const ItemsTable = ({ movimientos }: Props) => {
  return (
    <div className="overflow-x-auto bg-default rounded-lg shadow">
      <table className="w-full dark:bg-white/10">
        <thead>
          <tr>
            <th className="p-2 border">Nro</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Descripcion</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.data.map((m: any) => (
            <tr key={m.id} className="hover:bg-gray-200 dark:hover:bg-white/20">
              <td className="p-2">{m.nro}</td>
              <td
                className={`p-2 ${m.tipo === "ingreso" ? "text-green-600" : "text-red-600"}`}
              >
                {m.tipo}
              </td>
              <td className="p-2">{dayjs(m.fecha).format("DD/MM/YYYY HH:mm")}</td>
              <td className="p-2 text-right">{m.total}</td>
              <td className="p-2 text-left">{m.descripcion}</td>

              <td className="p-2 text-center">
                <Button
                  variant={'warning'}
                  className="m-1 w-20"
                >
                  Editar
                </Button>
                <Button
                  variant={'destructive'}
                  className="m-1 w-20"
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex gap-2 mt-4">
        <Pagination links={movimientos?.links ?? []} />
      </div>
    </div>
  )
};

export { ItemsTable };
