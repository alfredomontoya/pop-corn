import React from "react";
import { router } from "@inertiajs/react";
import Pagination from "@/components/PaginationInertia";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Cliente, PaginatedClientes } from "@/interfaces/Clientes.Interface";
import PaginationInertia from "@/components/PaginationInertia";

interface Props {
  clientes: PaginatedClientes;
  filters: {
    sort?: string;
    direction?: string;
  };
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
  onDetail: (cliente: Cliente) => void;
}

const ClienteItemsTable: React.FC<Props> = ({
  clientes,
  filters,
  onEdit,
  onDelete,
  onDetail,
}) => {
    const handleSort = (field: string) => {
    let direction: string;

    if (filters.sort === field) {
        // Si ya estoy ordenando esta columna, alterno entre asc/desc
        direction = filters.direction === "asc" ? "desc" : "asc";
    } else {
        // Si es otra columna nueva, empiezo con asc
        direction = "asc";
    }

    router.get(
        "/clientes",
        { sort: field, direction },
        { preserveState: true }
    );
    };


  const renderSortIcon = (field: string) => {
    if (filters.sort !== field) return null;
    return filters.direction === "asc" ? (
      <ChevronUp className="inline-block w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline-block w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="overflow-x-auto bg-default rounded-lg shadow">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-default">
          <tr>
            {/* <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ID {renderSortIcon("id")}
            </th>
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("numero_documento")}
            >
              Documento {renderSortIcon("numero_documento")}
            </th> */}
            <th
              className="px-4 py-2 border cursor-pointer"
              onClick={() => handleSort("nombre_razon_social")}
            >
              Nombre/Razón Social {renderSortIcon("nombre_razon_social")}
            </th>
            <th className="px-4 py-2 border">Propietario</th>
            <th className="px-4 py-2 border">Teléfono</th>
            <th className="px-4 py-2 border">Dirección</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes?.data?.length ? (
            clientes.data.map((cli) => (
              <tr
                key={cli.id}
                className="border-t hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                onClick={() => onDetail(cli)}
              >
                <td className="px-4 py-2">{cli.nombre_razon_social}</td>
                <td className="px-4 py-2">{cli.propietario}</td>
                <td className="px-4 py-2">
                  {cli.telefono}
                </td>
                <td>
                  {cli.direccion}&nbsp;
                  <span>
                      {cli.ubicacion && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                            window.open(`https://www.google.com/maps?q=${cli.ubicacion}`, "_blank", "noopener,noreferrer");
                        }}
                        rel="noopener noreferrer" // seguridad al abrir nueva pestaña
                      >
                        Ver en mapa
                      </Button>
                    )}
                    </span>
                </td>
                <td className="px-4 text-center">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(cli);
                    }}
                    variant={"warning"}
                    className="my-1 w-20"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(cli);
                    }}
                    variant={"destructive"}
                    className="my-1 w-20"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-2 text-center text-gray-500"
              >
                No hay clientes disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>


    </div>
  );
};

export default ClienteItemsTable;
