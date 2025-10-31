export interface Movimiento {
  id: number;
  user_id: number;
  cliente_id?: number;
  referencia_id?: number;
  referencia_type?: string;
  descripcion?: string;
  monto: number;
  tipo: "ingreso" | "egreso";
  fecha: string; // formato "YYYY-MM-DD"
  created_at: string;
  updated_at: string;
}

export interface MovimientoCreate {
  cliente_id?: number;
  descripcion?: string;
  monto: number;
  tipo: "ingreso" | "egreso";
  fecha?: string;       // opcional (se puede autollenar con la actual)
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

