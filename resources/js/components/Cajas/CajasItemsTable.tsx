import React from "react";
import { Link } from "@inertiajs/react";
import { Caja } from "@/interfaces/Caja.Ingerface";
import { Button } from "@/components/ui/button";

interface Props {
  cajas: Caja[];
  loading: boolean;
  refreshing: boolean;
  onCerrarCaja: (caja: Caja) => void;
}

const CajasItemsTable: React.FC<Props> = ({ cajas, loading, refreshing, onCerrarCaja }) => {
  if (loading || refreshing) return <p>Cargando...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full shadow rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Saldo Inicial</th>
            <th className="px-4 py-2">Ingresos</th>
            <th className="px-4 py-2">Egresos</th>
            <th className="px-4 py-2">Saldo Final</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cajas.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-2 text-center">
                No hay cajas registradas.
              </td>
            </tr>
          ) : (
            cajas.map((caja) => (
              <tr key={caja.id} className="border-t hover:bg-gray-50/50">
                <td className="px-4 py-2">{caja.id}</td>
                <td className="px-4 py-2">{caja.user_id}</td>
                <td className="px-4 py-2">{caja.saldo_inicial.toFixed(2)}</td>
                <td className="px-4 py-2">{caja.total_ingresos.toFixed(2)}</td>
                <td className="px-4 py-2">{caja.total_egresos.toFixed(2)}</td>
                <td className="px-4 py-2">{caja.saldo_final?.toFixed(2) ?? "-"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      caja.estado === "ABIERTA" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {caja.estado}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/cajas/${caja.id}`}
                    className="px-2 py-1 rounded hover:bg-gray-300"
                  >
                    Ver
                  </Link>
                  {caja.estado === "ABIERTA" && (
                    <button
                      onClick={() => onCerrarCaja(caja)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Cerrar
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CajasItemsTable;
