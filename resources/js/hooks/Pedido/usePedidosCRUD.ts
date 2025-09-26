import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Cliente } from '@/interfaces/Clientes.Interface';
import { DetallePedido, PedidoFormData } from '@/interfaces/Pedidos.Interface';

export interface Pedido {
  id: number;
  nro: number;
  cliente_id: string;
  cliente?: Cliente
  user_id: string;
  user?: { name: string };
  fecha: string;
  estado: 'pendiente' | 'confirmado' | 'cancelado' | 'entregado';
  total: number;
  detalles: DetallePedido[];
}

export default function usePedidosCRUD() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // Obtener todos los pedidos
  const fetchPedidos = async (url: string): Promise<void> => {
    try {
      const response: AxiosResponse<{ data: Pedido[] }> = await axios.get(url);
      setPedidos(response.data.data);
    } catch (error) {
      console.error('Error al cargar pedidos', error);
    }
  };

  // Crear pedido
  const createPedido = async (url: string, form: PedidoFormData): Promise<void> => {
    try {
    const res = await axios.post(url, form);
    // refresca la lista si quieres
    await fetchPedidos(url.replace('/store', ''));
    return res.data; // ✅ devuelve datos al handleSubmit
  } catch (error: any) {
    // ✅ devuelve el error para manejarlo afuera
    if (error.response?.status === 422) {
      // errores de validación
      return Promise.reject(error.response.data.errors);
    } else {
      return Promise.reject(error);
    }
  }
  };

  // Actualizar pedido
  const updatePedido = async (url: string, form: PedidoFormData): Promise<void> => {
    try {
      await axios.put(url, form);
    //   await fetchPedidos(url.replace(`/update/${form['id']}`, ''));
    } catch (error) {
      console.error('Error al actualizar pedido', error);
    }
  };

  // Preparar pedido
  const procesarPedido = async (url: string): Promise<AxiosResponse<any> | void> => {
    if (!confirm('¿Deseas preparar este pedido?')) return;
    try {
      const response = await axios.put(url);
      return  response
    //   await fetchPedidos(url.replace(`/update/${form['id']}`, ''));
    } catch (error) {
      console.error('Error al preparar pedido', error);
    }
  };

  // Eliminar pedido
  const deletePedido = async (url: string, id: number): Promise<void> => {
    if (!confirm('¿Deseas eliminar este pedido?')) return;
    try {
      await axios.delete(url);
      setPedidos(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar pedido', error);
    }
  };

  return { pedidos, fetchPedidos, createPedido, updatePedido, deletePedido, procesarPedido };
}
