import { PaginatedMovimientos } from "@/interfaces/Movimientos.Interface";
import Pagination from "../Pagination";
import { Link } from "@inertiajs/react";

interface Props {
    movimientos: PaginatedMovimientos;
}

const ItemsTable = ({ movimientos }: Props) => {

    // Función para formatear la fecha
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("es-BO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            // hour: "2-digit",
            // minute: "2-digit",
            // second: "2-digit",
        });
    };

    return (
        <>
        <table className="w-full mt-4 border">
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
              <tr key={m.id}>
                <td className="border p-2">{m.nro}</td>
                <td
                  className={`border p-2 ${m.tipo === "ingreso" ? "text-green-600" : "text-red-600"}`}
                >
                  {m.tipo}
                </td>
                <td className="border p-2">{formatDate(m.fecha)}</td>
                <td className="border p-2 text-right">{m.total}</td>
                <td className="border p-2 text-left">{m.descripcion}</td>

                <td className="border p-2">
                  <Link
                    href={`/movimientos/${m.id}/edit`}
                    className="text-blue-500 mr-2"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/movimientos/${m.id}`}
                    className="text-red-500"
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex gap-2 mt-4">
          <Pagination links={movimientos?.links ?? []} />
        </div>
        </>
    )
};

export { ItemsTable };
