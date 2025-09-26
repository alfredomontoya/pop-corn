import { Button } from '@/components/ui/button';
import { Pedido } from '@/interfaces/Pedidos.Interface';
import { Paginated } from '@/interfaces/Venta.Interface';
import { router } from '@inertiajs/react';

import { FC } from 'react';

interface Props {
  pedidos: Paginated<Pedido>;
  onDelete: (url: string, id: number) => void;
  search: string
}

const TablePedidos: FC<Props> = ({ pedidos, onDelete, search }) => {
  return (
    <div className="overflow-x-auto bg-default rounded-lg shadow">

    <table className="min-w-full border">
      <thead>
        <tr className="">
          <th className="border px-4 py-2">Nro</th>
          <th className="border px-4 py-2">Cliente</th>
          <th className="border px-4 py-2">Usuario</th>
          <th className="border px-4 py-2">Fecha</th>
          <th className="border px-4 py-2">Estado</th>
          <th className="border px-4 py-2">Total</th>
          <th className="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.data.map(p => (
          <tr key={p.id}>
            <td className="border px-4 py-2">{p.id}</td>
            <td className="border px-4 py-2">{p.cliente?.nombre_razon_social}</td>
            <td className="border px-4 py-2">{p.user?.name}</td>
            <td className="border px-4 py-2">{p.fecha}</td>
            <td className="border px-4 py-2">{p.estado}</td>
            <td className="border px-4 py-2">{p.total}</td>
            <td className="border px-4 py-2 space-x-2">

                <Button variant={"default"} onClick={ () => router.visit(`/pedidos/${p.id}`) } >Ver</Button>

              <a href={`/pedidos/${p.id}/edit`} className="text-blue-500">Editar</a>
              <button
                onClick={() => onDelete(`/api/pedidos/${p.id}`, p.id)}
                className="text-red-500"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default TablePedidos;
