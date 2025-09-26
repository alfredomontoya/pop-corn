import usePedido from '@/hooks/Pedido/usePedido';
import { PedidoFormData } from '@/interfaces/Pedidos.Interface';
import usePedidosCRUD from '@/hooks/Pedido/usePedidosCRUD';
import PedidoForm from '@/components/Pedidos/PedidoForm';
import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';
import { Producto } from '@/interfaces/Productos.Interface';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  productos: Producto[];
}

export default function Create({ productos }: Props) {
  const { form, setData, addDetalle, updateDetalle, removeDetalle } = usePedido({
    cliente_id: '',
    user_id: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'pendiente',
    detalles: [],
    observacion: ''
  } as PedidoFormData);

  const { createPedido } = usePedidosCRUD();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const handleSubmit = async () => {
    try {
      await createPedido('/pedidos/store', form);
      setErrors({});
      alert('Pedido creado correctamente');
      router.visit('/pedidos');
    } catch (err: any) {
      console.log('Errores de validación:', err);
      setErrors(err);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Pedidos', href: '/pedidos' }]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Crear Pedido</h1>
        <Button variant={'default'} onClick={() => router.visit('/pedidos/create')} className="mb-4">
          Nuevo Pedido
        </Button>

        <PedidoForm
          form={form}
          setData={setData}
          addDetalle={addDetalle}
          updateDetalle={updateDetalle}
          removeDetalle={removeDetalle}
          onSubmit={handleSubmit}
          productos={productos}
          errors={errors}
        />
      </div>
    </AppLayout>
  );
}
