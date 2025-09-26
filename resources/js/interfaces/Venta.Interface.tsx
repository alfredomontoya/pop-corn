import { User } from "@/types"
import { Cliente } from "./Clientes.Interface"

// VENTAS
export interface Venta {
  id: number
  user_id: number
  user: User
  tipo_pago_id: number
  cliente_id?: number | null
  cliente?: Cliente
  total: number
  efectivo?: number | null
  cambio?: number | null
  estado: 'pendiente' | 'completado' | 'anulado'
  created_at?: string
  updated_at?: string
  tipoPago?: { id: number; nombre: string }
  detalles?: [] // luego lo defines mejor si quieres
}

export interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface Paginated<T> {
  data: T[]
  links: PaginationLink[]
}

// TIPOS DE PAGO
export interface TipoPago {
  id: number
  nombre: string
  activo: boolean
}

export interface DetalleVenta {
  id?: number;                // opcional, solo si ya existe en BD
  venta_id?: number;          // opcional, lo puedes mandar al guardar
  producto_id: number;
  producto_precio_id?: number; // depende de tu lógica de precios
  cantidad: number;
  precio_unitario: number;
  subtotal: number;

  // Campos auxiliares (solo frontend, no necesariamente en la BD)
  nombre?: string;            // para mostrar en tabla
}


import type { FormDataConvertible } from "@inertiajs/core";

export interface DetalleVenta {
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface VentaPayload {
  cliente_id?: number;
  tipo_pago_id?: number;
  total: number;
  efectivo: number;
  cambio: number;
  estado: string;
  detalles: DetalleVenta[];
}