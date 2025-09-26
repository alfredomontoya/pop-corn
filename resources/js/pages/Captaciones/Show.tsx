import { Captacion } from "@/interfaces/Captaciones.Interface";
import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";

interface Props {
  captacion: Captacion;
}

export default function Show({ captacion }: Props) {
  return (
    <AppLayout breadcrumbs={[{ title: "Captaciones", href: route("captaciones.index") }]}>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalle de Captación</h1>

      <div className="space-y-2">
        <p>
          <strong>Nro:</strong> {captacion.nro}
        </p>
        <p>
          <strong>Asesor:</strong> {captacion.asesor?.name}
        </p>
        <p>
          <strong>Lugar:</strong> {captacion.lugar}
        </p>
        <p>
          <strong>Precio:</strong>{" "}
          {new Intl.NumberFormat("es-BO", {
            style: "currency",
            currency: "BOB",
          }).format(captacion.precio)}
        </p>
        <p>
          <strong>Descripción:</strong> {captacion.descripcion}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={route("captaciones.edit", captacion.id)}
          className="px-3 py-2 bg-green-600 text-white rounded-md"
        >
          Editar
        </Link>
        <Link
          href={route("captaciones.index")}
          className="px-3 py-2 bg-gray-600 text-white rounded-md"
        >
          Volver
        </Link>
      </div>
    </div>
    </AppLayout>
  );
}
