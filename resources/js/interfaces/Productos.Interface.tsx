import { Categoria } from "./Categorias.Interface";

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  categoria_id: number;
  codigo?: string | null;
  stock_actual: number | null;
  stock_minimo: number | null;
  unidad_medida: string | null;
  activo: boolean;

  // Relaciones
  imagenes?: ProductoImagen[];
  imagen_principal?: ProductoImagen; // alias de imagenPrincipal en Eloquent
  precios?: ProductoPrecio[];
  precio_activo?: ProductoPrecio; // alias de precioActivo en Eloquent
  categoria?: Categoria;
  user?: User;
  updated_by_user?: User; // alias de updatedBy

  created_at: string;
  updated_at: string;
}

/** Para creación (sin id, timestamps ni relaciones) */
export interface ProductoCrear extends Omit<
  Producto,
  | "created_at"
  | "updated_at"
  | "imagenes"
  | "imagen_principal"
  | "precios"
  | "precio_activo"
  | "categoria"
  | "user"
  | "updated_by_user"
> {
  saludo?: string;
  precio_compra?: number | null;
  precio_venta?: number | null;
}

/** Paginación */
export interface PaginatedProductos {
  data: Producto[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  meta?: any;
}

/** Interfaces relacionadas */
export interface ProductoImagen {
  id: number;
  producto_id: number;
  imagen: string; // ruta o URL
  es_principal: boolean;
  user_id: number;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface ProductoImagenCreate extends Omit<ProductoImagen, "created_at" | "updated_at"> {
    producto_id: number;
    imagen: string;
    es_principal: boolean;
    user_id: number;
}

export interface ProductoPrecio {
  id: number;
  producto_id: number;
  precio_venta: number;
  precio_compra: number;
  activo: boolean;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  user_id: number;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
