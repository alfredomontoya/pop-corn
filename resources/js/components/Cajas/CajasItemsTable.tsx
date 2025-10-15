import { Caja } from "@/interfaces/Caja.Ingerface";

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
    <table className="w-full table-auto">
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
          <tr key={caja.id}>
            <td>{caja.id}</td>
            <td>{caja.user?.name || "Desconocido"}</td>
            <td>{caja.fecha_apertura}</td>
            <td>{caja.fecha_cierre || "Abierta"}</td>
            <td>{caja.total_ingresos || "N/A"}</td>
            <td>{caja.total_egresos || "N/A"}</td>
            <td>{caja.saldo_final || "N/A"}</td>
            <td>{caja.estado}</td>
            <td className="flex space-x-2">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => onShowCaja?.(caja)} // <-- llamar prop
              >
                Ver
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => onCerrarCaja(caja)}
              >
                Cerrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CajasItemsTable;
