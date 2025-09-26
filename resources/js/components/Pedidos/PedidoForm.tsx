import { FC, useEffect } from 'react';
import { DetallePedido, Pedido, PedidoFormData } from '@/interfaces/Pedidos.Interface';
import { Producto } from '@/interfaces/Productos.Interface';
import ClienteAutocomplete from '../Clientes/ClienteAutocomplete';
import PedidoDetalles from './PedidoDetalles';
import { Button } from '../ui/button';

interface Props {
  form: PedidoFormData;
  productos: Producto[];
  setData: (key: keyof PedidoFormData, value: any) => void;
  addDetalle: (detalle: DetallePedido) => void;
  updateDetalle: (index: number, detalle: DetallePedido) => void;
  removeDetalle: (index: number) => void;
  onSubmit: () => void;
  errors?: { [key: string]: string[] };
  pedido?: Pedido;
}

const PedidoForm: FC<Props> = ({
  form,
  productos,
  setData,
  addDetalle,
  updateDetalle,
  removeDetalle,
  onSubmit,
  errors = {},
  pedido
}) => {
  // Inicializar datos si es edición
  useEffect(() => {
    if (pedido) {
      setData('cliente_id', String(pedido.cliente_id));
      setData('fecha', pedido.fecha);
      setData('estado', pedido.estado);
      setData('observacion', pedido.observacion || '');
      setData(
        'detalles',
        pedido.detalles.map((d) => ({
          producto_id: String(d.producto_id),
          cantidad: Number(d.cantidad),
          precio: Number(d.precio),
          subtotal: Number(d.subtotal),
        }))
      );
      setData('total', Number(pedido.total));
    }
  }, [pedido?.id]);

  // Inicializar con productos por defecto (solo en creación)
  useEffect(() => {
    if (!pedido && form.detalles!.length === 0 && productos.length > 0) {
      const iniciales: DetallePedido[] = productos.slice(0, 3).map((p) => {
        const precio = Number(p.precio_activo?.precio_venta ?? 0);
        return {
          producto_id: String(p.id),
          cantidad: 0,
          precio,
          subtotal: 0,
        };
      });
      setData('detalles', iniciales);
    }
  }, [pedido, productos]);

  // Calcular total automáticamente al cambiar detalles
  useEffect(() => {
    const total = form.detalles?.reduce((acc, d) => acc + (d.subtotal ?? 0), 0) ?? 0;
    setData('total', total);
  }, [form.detalles]);

  const handleUpdateDetalle = (index: number, detalle: DetallePedido) => {
    const subtotal = detalle.cantidad * detalle.precio;
    updateDetalle(index, { ...detalle, subtotal });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Cliente */}
      <div>
        <label className="block font-bold">Cliente</label>
        <ClienteAutocomplete form={form} setData={setData} defaultCliente={pedido?.cliente ?? null} />
        {errors.cliente_id && <p className="text-red-500 text-sm">{errors.cliente_id[0]}</p>}
      </div>

      {/* Fecha */}
      <div>
        <label className="block font-bold">Fecha</label>
        <input
          type="date"
          value={form.fecha}
          onChange={(e) => setData('fecha', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha[0]}</p>}
      </div>

      {/* Estado */}
      <div>
        <label className="block font-bold">Estado</label>
        <select
          value={form.estado}
          onChange={(e) => setData('estado', e.target.value)}
          className="border p-2 w-full"
        >
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
          <option value="entregado">Entregado</option>
        </select>
        {errors.estado && <p className="text-red-500 text-sm">{errors.estado[0]}</p>}
      </div>

      {/* Detalles */}
      <PedidoDetalles
        detalles={form.detalles}
        productos={productos}
        addDetalle={(detalle) => {
          addDetalle({ ...detalle, subtotal: detalle.cantidad * detalle.precio });
        }}
        updateDetalle={handleUpdateDetalle}
        removeDetalle={removeDetalle}
        errors={errors}
      />

      {/* Total */}
      <div className="text-right">
        <span className="font-bold text-lg">Total: </span>
        <span className="text-2xl text-blue-600 font-bold">{form.total?.toFixed(2) ?? '0.00'}</span>
      </div>
      {errors.total && <p className="text-red-500 text-sm">{errors.total[0]}</p>}

      {/* Observación */}
      <div>
        <label className="block font-bold">Observación</label>
        <textarea
          value={form.observacion}
          onChange={(e) => setData('observacion', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.observacion && <p className="text-red-500 text-sm">{errors.observacion[0]}</p>}
      </div>

      {/* Botón Guardar */}
      <Button type="button" onClick={onSubmit} variant={'default'}>
        {pedido ? 'Actualizar' : 'Guardar'}
      </Button>
    </div>
  );
};

export default PedidoForm;
