// =========================
// Interfaz para MovimientoCaja
// =========================
export interface MovimientoCaja {
  id: number
  caja_id: number
  user_id: number
  tipo: "INGRESO" | "EGRESO"
  monto: number
  concepto: string
  referencia_id?: number | null
  referencia_type?: string | null
  created_at?: string
  updated_at?: string
}

// =========================
// Interfaz para Caja
// =========================
export interface Caja {
  id: number
  user_id: number
  fecha_apertura: string
  fecha_cierre?: string | null
  saldo_inicial: number
  total_ingresos: number
  total_egresos: number
  saldo_final?: number | null
  estado: "ABIERTA" | "CERRADA"
  observacion?: string | null
  created_at?: string
  updated_at?: string

  // Relaciones
  movimientos?: MovimientoCaja[]  // Movimientos asociados a la caja
}
