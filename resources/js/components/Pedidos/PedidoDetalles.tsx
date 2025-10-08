// PedidoDetalles.tsx
import { FC } from 'react';
import { DetallePedido } from '@/interfaces/Pedidos.Interface';
import { Producto } from '@/interfaces/Productos.Interface';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';

interface Props {
  detalles: DetallePedido[];
  productos: Producto[];
  addDetalle: (detalle: DetallePedido) => void;
  updateDetalle: (index: number, detalle: DetallePedido) => void;
  removeDetalle: (index: number) => void;
  errors?: { [key: string]: string[] }; // errores de validación
}

const PedidoDetalles: FC<Props> = ({detalles, productos, addDetalle, updateDetalle, removeDetalle, errors = {},}) => {

  const handleProductoChange = (index: number, productoId: string) => {
    const producto = productos.find(p => String(p.id) === productoId);
    const precio = producto ? Number(producto.precio_activo?.precio_venta ?? 0) : 0;
    const cantidad = detalles[index].cantidad;

    updateDetalle(index, {
      ...detalles[index],
      producto_id: productoId,
      precio,
      subtotal: cantidad * precio,
    });
  };

  const handleCantidadChange = (index: number, cantidad: number) => {
    const precio = detalles[index].precio;
    updateDetalle(index, {
      ...detalles[index],
      cantidad,
      subtotal: cantidad * precio,
    });
  };

  return (
    <div className="mt-4 mb-4">
      <label className="block font-bold mb-2">Detalles</label>
      <div className="overflow-x-auto bg-default rounded-lg shadow">
        <table className="min-w-full border border-gray-300">
            <thead className="">
            <tr>
                <th className="border px-2 py-1">Producto</th>
                <th className="border px-2 py-1">Cantidad</th>
                <th className="border px-2 py-1">Precio</th>
                <th className="border px-2 py-1">Total</th>
                <th className="border px-2 py-1">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {detalles.map((detalle, index) => (
                <tr key={index}>
                <td className="border px-2 py-1">
                    <select
                    value={detalle.producto_id}
                    onChange={(e) => handleProductoChange(index, e.target.value)}
                    className="border p-1 w-full"
                    >
                    <option value="">Seleccione...</option>
                    {productos.map(p => (
                        <option key={p.id} value={String(p.id)}>
                        {p.nombre}
                        </option>
                    ))}
                    </select>
                    {errors[`detalles.${index}.producto_id`] && (
                    <p className="text-red-500 text-sm">
                        {errors[`detalles.${index}.producto_id`][0]}
                    </p>
                    )}
                </td>
                <td className="border px-2 py-1">
                    <input
                    type="number"
                    value={detalle.cantidad}
                    onChange={(e) => handleCantidadChange(index, Number(e.target.value))}
                    className="border p-1 w-full"
                    />
                    {errors[`detalles.${index}.cantidad`] && (
                    <p className="text-red-500 text-sm">
                        {errors[`detalles.${index}.cantidad`][0]}
                    </p>
                    )}
                </td>
                <td className="border px-2 py-1 text-right">
                    {detalle.precio.toFixed(2)}
                    {errors[`detalles.${index}.precio`] && (
                    <p className="text-red-500 text-sm">
                        {errors[`detalles.${index}.precio`][0]}
                    </p>
                    )}
                </td>
                <td className="border px-2 py-1 text-right">
                    {(detalle.subtotal ?? detalle.cantidad * detalle.precio).toFixed(2)}
                    {errors[`detalles.${index}.subtotal`] && (
                    <p className="text-red-500 text-sm">
                        {errors[`detalles.${index}.subtotal`][0]}
                    </p>
                    )}
                </td>
                <td className="border px-2 py-1 text-center">
                    <Button
                        variant={'destructive'}
                        onClick={() => removeDetalle(index)}
                    >
                    <Trash size={16} />
                    </Button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
      {/* {errors.detalles && <p className="text-red-500 text-sm">{errors.detalles[0]}</p>} */}

      <Button
        type="button"
        onClick={() => addDetalle({ producto_id: '', cantidad: 0, precio: 0, subtotal: 0 })}
        variant={'default'}
        className="mt-2"
      >
        Agregar Detalle
      </Button>
    </div>
  );
};

export default PedidoDetalles;
