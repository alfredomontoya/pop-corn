import { Cliente } from "./Clientes.Interface";

export interface EstadoPedido{
    id: number;
    estado: string;
}

export interface Pedido {
  id: number;
  cliente_id: string;
  user_id: string;
  estado_pedido_id: number;
  cliente?: Cliente
  estado_pedido: EstadoPedido;
  user?: { name: string };
  fecha: string;
  estado: 'activo' | 'anulado';
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
  cliente_id: string
  user_id: string
  fecha: string
  estado_pedido_id: string
  total: string
  estado: 'activo' | 'anulado';
  observacion?: string;
//   detalles: DetallePedido[];
  [key: string]: string | DetallePedido[] | undefined; // para tipado flexible
}

