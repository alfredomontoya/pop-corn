export interface Movimiento {
  id: number;
  user_id: number;
  cliente_id?: number;
  nro: number;
  fecha: string; // formato "YYYY-MM-DD"
  nombre: string;
  descripcion?: string;
  cantidad: number;
  umedida: string;
  precio: number;
  total: number;
  tipo: "ingreso" | "egreso";
  created_at: string;
  updated_at: string;
}

export interface MovimientoCreate {
  fecha?: string;       // opcional (se puede autollenar con la actual)
  nombre: string;
  cliente_id?: number;
  descripcion?: string;
  cantidad: number;
  umedida: string;
  precio: number;
  total: number;
  tipo: "ingreso" | "egreso";
}

export interface PaginatedMovimientos {
  data: Movimiento[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  meta?: any;
}

