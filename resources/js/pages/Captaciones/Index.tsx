import { Captacion } from "@/interfaces/Captaciones.Interface";
import { Paginated } from "@/interfaces/Venta.Interface";
import { Link } from "@inertiajs/react";
import CaptacionFilter from "./CaptacionFilter";
import AppLayout from "@/layouts/app-layout";

interface Asesor {
  id: number;
  name: string;
}

interface Props {
  captaciones: Paginated<Captacion>;
  asesores: Asesor[];
  filters: {
    asesor_id?: string;
    lugar?: string;
    descripcion?: string;
  };
}

export default function Index({ captaciones, asesores, filters }: Props) {
  return (
    <AppLayout breadcrumbs={[{ title: "Captaciones", href: route("captaciones.index") }]}>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Captaciones</h1>

      <div className="flex justify-between items-center mb-4">
        <Link
          href={route("captaciones.create")}
          className="px-3 py-2 bg-blue-600 text-white rounded-md"
        >
          Nueva Captación
        </Link>

        <CaptacionFilter asesores={asesores} filters={filters} />
      </div>

      <table className="w-full mt-4 border">
        <thead>
          <tr>
            <th className="p-2 border">Nro</th>
            <th className="p-2 border">Asesor</th>
            <th className="p-2 border">Lugar</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {captaciones.data.length > 0 ? (
            captaciones.data.map((c) => (
              <tr key={c.id}>
                <td className="border p-2">{c.nro}</td>
                <td className="border p-2">{c.asesor?.name}</td>
                <td className="border p-2">{c.lugar}</td>
                <td className="border p-2">
                  {new Intl.NumberFormat("es-BO", {
                    style: "currency",
                    currency: "BOB",
                  }).format(c.precio)}
                </td>
                <td className="border p-2 flex gap-2">
                  <Link
                    href={route("captaciones.show", c.id)}
                    className="text-blue-600"
                  >
                    Ver
                  </Link>
                  <Link
                    href={route("captaciones.edit", c.id)}
                    className="text-green-600"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No se encontraron captaciones
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="mt-4 flex gap-2">
        {captaciones.links.map((link, idx) => (
          <Link
            key={idx}
            href={link.url || "#"}
            className={`px-3 py-1 border rounded ${
              link.active ? "bg-blue-500 text-white" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </div>
    </AppLayout>
  );
}
