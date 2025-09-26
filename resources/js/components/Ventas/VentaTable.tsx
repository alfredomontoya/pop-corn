// resources/js/Components/VentaTable.tsx
import { Link } from '@inertiajs/react'
import Pagination from '../Pagination'
import { Paginated, Venta } from '@/interfaces/Venta.Interface'

interface Props {
  ventas: Paginated<Venta>
}

export default function VentaTable({ ventas }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Total</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.data.map((venta) => (
            <tr key={venta.id} className="border-t">
              <td className="p-2">{venta.id}</td>
              <td className="p-2">{venta.cliente?.nombre_razon_social ?? '-'}</td>
              <td className="p-2">{venta.total}</td>
              <td className="p-2">{venta.estado}</td>
              <td className="p-2 flex gap-2">
                <Link href={`/ventas/${venta.id}`} className="text-blue-500">Ver</Link>
                <Link href={`/ventas/${venta.id}/edit`} className="text-yellow-500">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 mt-4">
        {/* Paginación */}
        <Pagination links={ventas?.links ?? []} />
      </div>
    </div>
  )
}
