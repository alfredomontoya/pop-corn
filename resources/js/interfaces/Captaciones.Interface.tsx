import { User } from "@/types";

export interface Captacion {
  id: number;
  nro: number;
  asesor_id: number;
  lugar: string;
  precio: number;
  descripcion?: string | null;
  created_at: string;
  updated_at: string;
  asesor?: User
}
