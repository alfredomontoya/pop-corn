import { Cliente } from "./Clientes.Interface";

export interface Pedido {
  id: number;
  nro: number;
  cliente_id: string;
  cliente?: Cliente
  user_id: string;
  user?: { name: string };
  fecha: string;
  estado: 'pendiente' | 'preparado' | 'cancelado' | 'entregado';
  observacion?: string;
  total: number;
  detalles: DetallePedido[];
}

export interface DetallePedido {
  producto_id: string;
  cantidad: number;
  precio: number;
  subtotal?: number; // opcional, puede calcularse como cantidad * precio
}

export interface PedidoFormData {
  cliente_id: string;
  user_id: string;
  fecha: string;
  estado: 'pendiente' | 'preparado' | 'cancelado' | 'entregado';
//   detalles: DetallePedido[];
  observacion?: string;
  [key: string]: string | DetallePedido[] | undefined; // para tipado flexible
}

