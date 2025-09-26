export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string; // opcional
  imagen?: string; // opcional
  created_at: string;
  updated_at: string;
}

export interface PaginatedCategorias {
  data: Categoria[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  meta?: any;
}
