import React from "react";
import { router } from "@inertiajs/react";
import Pagination from "@/components/Pagination";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Cliente, PaginatedClientes } from "@/interfaces/Clientes.Interface";

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
            <th className="px-4 py-2 border">Referencias</th>
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
                {/* <td className="px-4 py-2">{cli.id}</td> */}
                {/* <td className="px-4 py-2">
                  {`${cli.tipo ?? ""} ${cli.tipo_documento ?? ""} ${
                    cli.numero_documento ?? ""
                  }`}
                </td> */}
                <td className="px-4 py-2">{cli.nombre_razon_social}</td>
                <td className="px-4 py-2">{cli.propietario}</td>
                <td className="px-4 py-2">
                  {[cli.email, cli.telefono, cli.direccion]
                    .filter(Boolean)
                    .join(" | ")} 
                    <p>
                      {cli.ubicacion && (
                      <a
                        href={cli.ubicacion}
                        target="_blank"        // abrir en nueva pestaña
                        rel="noopener noreferrer" // seguridad al abrir nueva pestaña
                        onClick={(e) => e.stopPropagation()} // detener propagación del click
                        className="text-blue-500 underline"
                      >
                        Ver en mapa
                      </a>
                    )}
                    </p>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(cli);
                    }}
                    variant={"warning"}
                    className="px-2 py-1"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(cli);
                    }}
                    variant={"destructive"}
                    className="px-2 py-1"
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

      {/* Paginación */}
      <Pagination links={clientes?.links ?? []} />
    </div>
  );
};

export default ClienteItemsTable;
