import { Caja } from "@/interfaces/Caja.Ingerface";
import dayjs from "dayjs"
import { Button } from "../ui/button";
interface Props {
  cajas: Caja[];
  loading: boolean;
  refreshing: boolean;
  onCerrarCaja: (caja: Caja) => void;
  onShowCaja?: (caja: Caja) => void; // <-- agregar esta línea
}

const CajasItemsTable: React.FC<Props> = ({
  cajas,
  loading,
  refreshing,
  onCerrarCaja,
  onShowCaja,
}) => {
  return (
    <div className="overflow-x-auto bg-default rounded-lg shadow">
      <table className="w-full dark:bg-white/10 table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Fecha apertura</th>
            <th>Fecha cierre</th>
            <th>Total Ingresos</th>
            <th>Total Egresos</th>
            <th>Saldo Final</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cajas.map((caja) => (
            <tr key={caja.id} className="hover:bg-gray-200 dark:hover:bg-white/20">
              <td className="p-2">{caja.id}</td>
              <td className="p-2">{caja.user?.name || "Desconocido"}</td>
              <td className="p-2">{dayjs(caja.fecha_apertura).format("DD/MM/YYYY HH:mm")}</td>
              <td className="p-2">{dayjs(caja.fecha_cierre).format("DD/MM/YYYY HH:mm") || "Abierta"}</td>
              <td className="p-2 text-right">{caja.total_ingresos.toFixed(2) || "N/A"}</td>
              <td className="p-2 text-right">{caja.total_egresos.toFixed(2) || "N/A"}</td>
              <td className="p-2 text-right">{caja.saldo_final?.toFixed(2)  || "N/A"}</td>
              <td className="p-2">{caja.estado}</td>
              <td className="p-2 text-center">
                <Button
                  variant={'default'}
                  className="mb-1 w-20"
                  onClick={() => onShowCaja?.(caja)} // <-- llamar prop
                >
                  Ver
                </Button>
                <Button
                  variant={'warning'}
                  className="mb-1 w-20"
                  onClick={() => onCerrarCaja(caja)}
                >
                  Cerrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CajasItemsTable;
