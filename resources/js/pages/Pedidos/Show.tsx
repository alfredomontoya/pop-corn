import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';
import { Pedido } from '@/interfaces/Pedidos.Interface';
import { Button } from '@/components/ui/button';
import usePedidosCRUD from '@/hooks/Pedido/usePedidosCRUD';
import { useState } from 'react';

interface Props {
  pedido: Pedido;
}

export default function Show({ pedido }: Props) {
    const { procesarPedido } = usePedidosCRUD();
    const [estadoPedido, setEstadoPedido] = useState(pedido.estado??'pendiente')

    const handlePreparar = async(estado: string) => {
        const response = await procesarPedido(`/pedidos/${pedido.id}/procesar?estado=${estado}`)
        if (response?.status == 200){
            // console.log(response.data.estado)
            setEstadoPedido(response.data.estado)
        }

    }
  return (
    <AppLayout breadcrumbs={[
      { title: 'Pedidos', href: '/pedidos' },
      { title: `Pedido #${pedido.nro}`, href: `/pedidos/${pedido.id}` }
    ]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Detalle del Pedido</h1>

        <div className="mb-4">
          <Button variant="default" className='mr-1' onClick={() => router.visit(`/pedidos`)}>
            Volver
          </Button>
          <Button disabled = {estadoPedido!=='pendiente' ? true: false} variant="default" className='mr-1' onClick={ () => handlePreparar('preparado') }>
            Preparar
          </Button>
          <Button disabled = {estadoPedido!=='preparado' ? true: false}  variant="default" className='mr-1' onClick={ () => handlePreparar('entregado') }>
            Entregar
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Información del Pedido</h2>
          <p><strong>Número:</strong> {pedido.nro}</p>
          <p><strong>Fecha:</strong> {pedido.fecha}</p>
          <p><strong>Estado:</strong> {estadoPedido}</p>
          <p><strong>Total:</strong> {pedido.total}</p>
          <p><strong>Cliente:</strong> {pedido.cliente?.nombres} {pedido.cliente?.apellidos}</p>
          <p><strong>Usuario:</strong> {pedido.user?.name}</p>
          <p><strong>Observación:</strong> {pedido.observacion || '-'}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Detalles</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-left">Producto</th>
                <th className="border px-2 py-1 text-right">Cantidad</th>
                <th className="border px-2 py-1 text-right">Precio</th>
                <th className="border px-2 py-1 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {pedido.detalles?.map((detalle, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{detalle.producto?.nombre}</td>
                  <td className="border px-2 py-1 text-right">{detalle.cantidad}</td>
                  <td className="border px-2 py-1 text-right">{detalle.precio}</td>
                  <td className="border px-2 py-1 text-right">{(detalle.cantidad * detalle.precio).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
