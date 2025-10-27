import BuscarItem from "@/components/helpers/BuscarItem";
import { Categoria } from "@/interfaces/Categorias.Interface";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { ProductoCrear } from "@/interfaces/Productos.Interface";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/helpers/TextInput";
import { TextArea } from "@/components/helpers/TextArea";
import { Label } from "@/components/ui/label";
import Toast from "@/components/Toast";
import FloatingCreateButton from "@/components/Productos/FloatingCreateButton";

interface Props {
  categorias: Categoria[];
}

const Create = ({ categorias }: Props) => {
  // Formulario con useForm tipado
  const { data, setData, post, errors: rawErrors, reset } = useForm<ProductoCrear>({
    categoria_id: 0,
    nombre: "",
    descripcion: "",
    precio_venta: 0,
  });

  // Tipado correcto de errores
  const errors: Partial<Record<keyof ProductoCrear, string>> = rawErrors;

  const { flash } = usePage().props as any;
  const [toastMessage, setToastMessage] = useState<string | null>(flash?.success || null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [{ title: "Productos", href: "/productos" }];

  // Submit usando useForm.post
  const handleSubmit = () => {
    post(route("productos.store"), {
      onSuccess: () => {
        setToastMessage("Producto creado correctamente");
        reset(); // opcional: limpia el formulario
      },
      onError: (errs) => {
        console.log("Errores de validación:", errs);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <FloatingCreateButton />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>

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
                // Usamos callback para evitar error de "never"
                setData(prev => ({ ...prev, categoria_id: categoria.id }));
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
              onChange={(val) => setData(prev => ({ ...prev, nombre: val }))}
              error={errors.nombre}
            />
          </div>

          {/* Descripción */}
          <div className="md:col-span-2 lg:col-span-3">
            <TextArea
              label="Descripción"
              value={data.descripcion}
              placeholder="Descripción del producto"
              onChange={(val) => setData(prev => ({ ...prev, descripcion: val }))}
              error={errors.descripcion ?? ""}
            />
          </div>

          {/* Precio Venta */}
          <div>
            <TextInput
              label="Precio de Venta"
              type="number"
              value={data.precio_venta}
              onChange={(val) => setData(prev => ({ ...prev, precio_venta: Number(val) }))}
              error={errors.precio_venta}
            />
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="mt-6">
          <Button variant="default" onClick={handleSubmit}>Guardar</Button>
        </div>

        {/* Toast */}
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      </div>
    </AppLayout>
  );
};

export default Create;
