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
        let color = 'blue'
        let text = 'white'
        if (estado === "pendiente") {
            count = 1; //warning
            color = 'yellow-500'
            text = 'white'
        }
        if (estado === "preparado"){
            count = 2; //success
            color = 'green-500'
            text = 'white'
        }
        if (estado === "entregado-500"){
            count = 3; //primary
            color = 'blue'
            text = 'white'
        }
        if (estado === "pagado"){
            count = 4; //secondary
            color = 'gray-300'
            text = 'text-gray dark:text-black'
        }



        return (
            <div className={`flex gap-1 justify-center bg-${color} ${text} rounded-full px-2`}>
                {/* {Array.from({ length: count }).map((_, i) => (
                <Check key={i} className="w-5 h-5 text-green-600" />
                ))} */}
                {estado}
            </div>
        );
    };

    const handleShow = (id: number, e: React.MouseEvent<HTMLTableRowElement>) => {
        e.stopPropagation()
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            // Hay texto seleccionado → no navegar
            return;
        }

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
                <tr className='border px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/20' key={p.id} onClick={(e) => handleShow(p.id, e)}>
                    <td className="border px-4 py-2 cursor-pointer">{p.id}</td>
                    <td className="border px-4 py-2 cursor-pointer">{p.cliente?.nombre_razon_social}</td>
                    <td className="border px-4 py-2 cursor-pointer">{p.user?.name}</td>
                    <td className="border px-4 py-2 cursor-pointer">{new Date(p.fecha).toLocaleDateString("es-ES")}</td>
                    <td className="border px-4 py-2 cursor-pointer">{renderEstado(p.estado_pedido?.estado)}</td>
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
