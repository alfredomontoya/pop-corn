import React from "react";
import { router } from "@inertiajs/react";
import Pagination from "@/components/PaginationInertia";
import { Producto, PaginatedProductos } from "@/interfaces/Productos.Interface";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import PaginationInertia from "@/components/PaginationInertia";

interface Props {
  productos: PaginatedProductos;
  filters: {
    sort?: string;
    direction?: string;
  };
  page?: number;
  onDelete: (producto: Producto) => void;
  onDetail: (producto: Producto) => void;
  onSelect: (producto: Producto) => void;
}

const ProductoItemsTable: React.FC<Props> = ({ productos, filters, onDelete, onDetail, onSelect, page }) => {
  console.log('ProductoItemsTable page prop:', page);
  const handleSort = (field: string) => {
    const direction = filters.sort === field && filters.direction === "asc" ? "desc" : "asc";
    router.get("/productos", { sort: field, direction }, { preserveState: true });
  };

  const renderSortIcon = (field: string) => {
    if (filters.sort !== field) return null;
    return filters.direction === "asc" ? (
      <ChevronUp className="inline-block w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline-block w-4 h-4 ml-1" />
    );
  };

  const handlePageChange = (url: string) => {
    router.get(url, {}, { preserveState: true, replace: true });
  }

  return (
    <div className="overflow-x-auto bg-default rounded-lg shadow">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-default">
          <tr>
            <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("id")}>
              ID {renderSortIcon("id")}
            </th>
            <th className="px-4 py-2 border">Imagen</th>
            <th className="px-4 py-2 border cursor-pointer">
              Categoria
            </th>
            {/* Nombre producto */}
            <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort("nombre")}>
              Nombre {renderSortIcon("nombre")}
            </th>
            <th className="px-4 py-2 border cursor-pointer text-right" onClick={() => handleSort("precio")}>
              Precio {renderSortIcon("precio")}
            </th>
            <th className="px-4 py-2 border text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos?.data?.length ? (
            productos.data.map((prod) => (
              <tr
                key={prod.id}
                className="border-t hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                onClick={() => onDetail(prod)}
              >
                <td className="px-4 py-2">{prod.id}</td>
                <td className="px-4 py-2">
                  {prod.imagen_principal ? (
                    <img
                      src={prod.imagen_principal.imagen?.startsWith("http") ? prod.imagen_principal.imagen : `/storage/${prod.imagen_principal.imagen}`}
                      alt={prod.nombre}
                      className="w-12 h-12 object-cover rounded"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={`/images/default-product.png`}
                      alt={prod.nombre}
                      className="w-12 h-12 object-cover rounded"
                      loading="lazy"
                    />
                  )}
                </td>
                <td className="px-4 py-2">{prod.categoria?.nombre}</td>
                <td className="px-4 py-2">{prod.nombre}</td>
                <td className="px-4 py-2 text-right">Bs. {prod.precio_activo?.precio_venta}</td>
                <td className="px-4 py-2 space-x-2 text-center">
                  {/* <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.visit(`/productos/${prod.id}`)
                    }}
                    variant={"warning"}
                    className="px-2 py-1"
                  >
                    Detalle
                  </Button> */}
                  <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        router.get(`/productos/${prod.id}/edit?page=${page}`);
                    }}
                    variant={"warning"}
                    className="px-2 py-1 w-15 m-2"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(prod);
                    }}
                    variant={"destructive"}
                    className="px-2 py-1 w-15"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center text-gray-500">
                No hay productos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <PaginationInertia links={productos?.links ?? []} onPageChange={handlePageChange} />
    </div>
  );
};

export default ProductoItemsTable;
