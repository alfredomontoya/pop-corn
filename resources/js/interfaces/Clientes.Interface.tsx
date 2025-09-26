import { User } from "@/types";

export interface Cliente {
  id: number;
  user_id: number;
  user: User;
  cliente_id: number;
  cliente: Cliente;
  tipo_documento: string;
  tipo: string;
  numero_documento: string;
  nombre_razon_social: string;
  propietario: string;
  direccion: string;
  ubicacion: string;
  telefono: string;
  email: string;
  estado: string;
  notas: string;
  created_at: string;
  updated_at: string;
}

export type ClienteCrear = Omit<
  Cliente,
  "id" | "user_id" | "created_at" | "updated_at"
>;

export interface PaginatedClientes {
  data: Cliente[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  meta?: any;
}
