import { DetallePedido, PedidoFormData } from '@/interfaces/Pedidos.Interface';
import { useState } from 'react';



export default function usePedido(initial: PedidoFormData) {
  const [form, setForm] = useState<PedidoFormData>(initial);

  const setData = <K extends keyof PedidoFormData>(key: K, value: PedidoFormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const addDetalle = (detalle: DetallePedido) => {
    setForm(prev => ({ ...prev, detalles: [...prev.detalles, detalle] }));
  };

  const updateDetalle = (index: number, detalle: DetallePedido) => {
    setForm(prev => {
      const newDetalles = [...prev.detalles];
      newDetalles[index] = detalle;
      return { ...prev, detalles: newDetalles };
    });
  };

  const removeDetalle = (index: number) => {
    setForm(prev => {
      const newDetalles = [...prev.detalles];
      newDetalles.splice(index, 1);
      return { ...prev, detalles: newDetalles };
    });
  };

  const resetForm = () => setForm(initial);

  return { form, setData, addDetalle, updateDetalle, removeDetalle, resetForm };
}
