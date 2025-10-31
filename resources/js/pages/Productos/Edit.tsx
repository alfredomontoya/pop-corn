import BuscarItem from "@/components/helpers/BuscarItem";
import { Categoria } from "@/interfaces/Categorias.Interface";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { ProductoCrear, Producto, SimpleProductoEdit } from "@/interfaces/Productos.Interface";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/helpers/TextInput";
import { TextArea } from "@/components/helpers/TextArea";
import { Label } from "@/components/ui/label";
import Toast from "@/components/Toast";
import FloatingCreateButton from "@/components/Productos/FloatingCreateButton";

interface Props {
  categorias: Categoria[];
  producto: Producto; // 🔹 Producto que se va a editar
  page: number; // 🔹 Página actual para mantener la paginación
}

const Edit = ({ categorias, producto, page }: Props) => {
  console.log('page in edit:', page);
  console.log(page)
  // Inicializar el formulario con los datos actuales del producto
  const { data, setData, put, reset, errors: rawErrors } = useForm<SimpleProductoEdit>({
    id: producto.id,
    categoria_id: producto.categoria_id || 0,
    nombre: producto.nombre || "",
    descripcion: producto.descripcion || "",
    precio_venta: producto.precio_activo?.precio_venta || 0,
  });

  const errors: Partial<Record<keyof ProductoCrear, string>> = rawErrors;

  const { flash } = usePage().props as any;
  const [toastMessage, setToastMessage] = useState(flash?.success || null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(
    producto.categoria || null
  );

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Productos", href: "/productos" },
    { title: "Editar", href: "#" },
  ];

  // Manejar envío del formulario
  const handleSubmit = () => {
    put(route("productos.update", producto.id)+`?page=${page}`, {
      onSuccess: (page) => {
        setToastMessage("Producto actualizado correctamente");
      },
      onError: (errs) => {
        console.log("Errores de validación:", errs);
      },
    });
  };

  const handleCancel = () => {
    reset();
    setCategoriaSeleccionada(null);
    window.history.back();
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <FloatingCreateButton />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Categoría */}
          <div className="mb-4">
            <Label className="block text-sm font-medium">Categoría</Label>
            <BuscarItem<Categoria>
              items={categorias}
              labelKey="nombre"
              placeholder="Buscar categoría"
              selected={categoriaSeleccionada}
              onSelect={(categoria) => {
                setData("categoria_id", categoria.id);
                setCategoriaSeleccionada(categoria);
              }}
              error={errors.categoria_id}
            />
          </div>

          {/* Nombre */}
          <div>
            <TextInput
              label="Nombre"
              placeholder="Nombre del producto"
              value={data.nombre}
              onChange={(val) => setData("nombre", val)}
              error={errors.nombre}
            />
          </div>

          {/* Descripción */}
          <div className="md:col-span-2 lg:col-span-3">
            <TextArea
              label="Descripción"
              value={data.descripcion}
              placeholder="Descripción del producto"
              onChange={(val) => setData("descripcion", val)}
              error={errors.descripcion ?? ""}
            />
          </div>

          {/* Precio Venta */}
          <div>
            <TextInput
              label="Precio de Venta"
              type="number"
              value={data.precio_venta}
              onChange={(val) => setData("precio_venta", Number(val))}
              error={errors.precio_venta}
            />
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="mt-6 flex space-x-2">
          <Button variant="default" onClick={handleSubmit}>Actualizar</Button>
          <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
        </div>

        {/* Toast */}
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
    </AppLayout>
  );
};

export default Edit;
