export interface Categoria {
  id: number;
  nombre: string | null;
  descripcion?: string; // opcional
  imagen?: string; // opcional
  created_at: string;
  updated_at: string;
}

export type CreateCategoria = Omit<Categoria, 'id' | 'created_at' | 'updated_at'>


export interface PaginatedCategorias {
  data: Categoria[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  meta?: any;
}
