import { Button } from '@/components/ui/button';
import { Pedido } from '@/interfaces/Pedidos.Interface';
import { Paginated } from '@/interfaces/Venta.Interface';
import { router } from '@inertiajs/react';
import { Check, Edit, Trash } from 'lucide-react';

import { FC, useCallback } from 'react';

interface Props {
  pedidos: Paginated<Pedido>;
  onDelete: (url: string, id: number) => void;
  search: string
}

const TablePedidos: FC<Props> = ({ pedidos, onDelete, search }) => {

    console.log(pedidos)

    const renderEstado = (estado: string) => {
        let count = 0;
        if (estado === "pendiente") count = 1;
        if (estado === "preparado") count = 2;
        if (estado === "entregado") count = 3;
        if (estado === "pagado") count = 4;



        return (
        <div className="flex gap-1 justify-center">
            {Array.from({ length: count }).map((_, i) => (
            <Check key={i} className="w-5 h-5 text-green-600" />
            ))}
        </div>
        );
    };

    const handleShow = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
        router.visit(`/pedidos/${id}`);
    }

    const handleEditar = useCallback((id: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // evita que el click llegue al <tr>
        router.visit(`/pedidos/${id}/edit`);
    }, []);



  return (
    <div className="overflow-x-auto bg-default rounded-lg shadow">

        <table className="dark:bg-white/10 min-w-full border">
        <thead>
            <tr>
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
                <tr className='border px-4 py-2 cursor-pointer' key={p.id} onClick={(e) => handleShow(p.id)}>
                    <td className="border px-4 py-2 cursor-pointer">{p.id}</td>
                    <td className="border px-4 py-2 cursor-pointer">{p.cliente?.nombre_razon_social}</td>
                    <td className="border px-4 py-2 cursor-pointer">{p.user?.name}</td>
                    <td className="border px-4 py-2 cursor-pointer">{new Date(p.fecha).toLocaleDateString("es-ES")}</td>
                    <td className="border px-4 py-2 cursor-pointer">{p.estadoPedido?.estado}</td>
                    <td className="border px-4 py-2 cursor-pointer">{p.total}</td>
                    <td className="border px-4 py-2 space-x-2">

                        {/* <Button variant={"default"} onClick={ () => router.visit(`/pedidos/${p.id}`) } >Ver</Button> */}
                        <Button
                            variant={'warning'}
                            onClick={ (e) => handleEditar(p.id, e)}
                        >
                            <Edit size={16} />
                            <span>Editar</span>
                        </Button>

                        {/* <a href={`/pedidos/${p.id}/edit`} className="text-blue-500">Editar</a> */}
                        <Button
                            variant={'destructive'}
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete(`/api/pedidos/${p.id}`, p.id)
                            }}
                        >
                            <Trash size={16} />
                            <span>Eliminar</span>
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default TablePedidos;
