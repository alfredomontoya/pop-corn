import BuscarItem from "@/components/helpers/BuscarItem";
import { Categoria } from "@/interfaces/Categorias.Interface";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Producto, ProductoCrear } from "@/interfaces/Productos.Interface";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextInput } from "@/components/helpers/TextInput";
import { TextArea } from "@/components/helpers/TextArea";
import { Label } from "@/components/ui/label";
import Toast from "@/components/Toast";
import axios from "axios";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import FloatingCreateButton from "@/components/Productos/FloatingCreateButton";
import ProductoImagenesManager from "@/components/Productos/ProductoImagenManager";
import ProductoPrecioManager from "@/components/Productos/ProductoPrecioManager";

interface Props {
  producto: Producto | null;
  categorias: Categoria[];
  onSaved?: (msg: string) => void;
}

const ProductoCreate = ({ categorias, onSaved, producto }: Props) => {
    // Formulario con Inertia useForm

  const { data, setData, errors } = useForm<ProductoCrear & Record<string, any>>({
  id: producto?.id || null,
  nombre: producto?.nombre || "",
  descripcion: producto?.descripcion || "",
  categoria_id: producto?.categoria_id || 0,
  codigo: producto?.codigo || null,
  stock_actual: producto?.stock_actual || 0,
  stock_minimo: producto?.stock_minimo || 0,
  unidad_medida: producto?.unidad_medida || "",
  activo: producto?.activo ?? true,
  precio_compra: producto?.precio_activo?.precio_compra ?? 0,
  precio_venta: producto?.precio_activo?.precio_venta ?? 0,
  saludo: "Hola",
});

  const { flash } = usePage().props as any;
  const [toastMessage, setToastMessage] = useState(flash?.success || null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(
    producto?.categoria || null
  );

  const breadcrumbs: BreadcrumbItem[] = [{ title: "Productos", href: "/productos" }];

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [initialData, setInitialData] = useState(data); // referencia de datos guardados

  // ----------------------
  // Submit con Axios
  // ----------------------
  const handleSubmit = () => {
    const isEditing = Boolean(initialData?.id);
    console.log('initialData', initialData);
    const url = isEditing
      ? route("productos.update", initialData?.id)
      : route("productos.store");

    const method = isEditing ? "put" : "post";

    axios[method](url, data)
      .then((res) => {
        setToastMessage(res.data.success);

        // actualizar referencia de datos guardados
        setInitialData({ ...data, id: res.data.producto.id });
        setData("id", res.data.producto.id); // actualizar id en el formulario

        setUnsavedChanges(false);

        // Callback al padre
        onSaved?.(res.data.success);
      })
      .catch((err) => {
        if (err.response?.status === 422) {
          console.log(err.response.data.errors);
        } else {
          console.error(err);
        }
      });
  };

  // Detectar cambios comparando contra initialData
  useEffect(() => {
    console.log('data changed:', data);
    console.log('initialData:', initialData);
    const hasChanges =
      data.nombre !== initialData.nombre ||
      data.descripcion !== initialData.descripcion ||
      data.codigo !== initialData.codigo ||
      data.stock_actual !== initialData.stock_actual ||
      data.stock_minimo !== initialData.stock_minimo ||
      data.unidad_medida !== initialData.unidad_medida ||
      data.activo !== initialData.activo ||
      data.categoria_id !== initialData.categoria_id ||
      Number(data.precio_venta) !== Number(initialData.precio_venta) ||
      Number(data.precio_compra) !== Number(initialData.precio_compra);

    setUnsavedChanges(hasChanges);
  }, [data, initialData]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <FloatingCreateButton />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          {initialData?.id ? "Editar" : "Crear"} Producto{" "}
          <span className="text--secondary">{initialData?.id && `#${initialData.id}`}</span>
        </h1>

        {/* Aviso de cambios sin guardar o guardado */}
        {unsavedChanges ? (
          <div className="mb-4 flex items-center gap-2 rounded-md bg-yellow-100 p-2 text-yellow-800 text-sm shadow">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span>Tienes cambios sin guardar</span>
          </div>
        ) : (
          producto?.id && (
            <div className="mb-4 flex items-center gap-2 rounded-md bg-green-100 p-2 text-green-800 text-sm shadow">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Producto guardado</span>
            </div>
          )
        )}

        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Selección de categoría */}
          <div className="mb-4">
            <Label className="block text-sm font-medium">Categoria</Label>
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
              type="text"
              placeholder="Nombre del producto"
              value={data.nombre}
              onChange={(val) => setData("nombre", val)}
              error={errors.nombre}
            />
          </div>

          {/* Código */}
          <div>
            <TextInput
              label="Código"
              type="text"
              placeholder="Código del producto"
              value={data.codigo ?? ""}
              onChange={(val) => setData("codigo", val)}
              error={errors.codigo}
            />
          </div>

          {/* Descripción */}
          <div className="md:col-span-2 lg:col-span-3">
            <TextArea
              label="Descripción"
              value={data.descripcion}
              placeholder="Descripción del producto"
              onChange={(val) => setData("descripcion", val)}
              error={errors.descripcion}
            />
          </div>

          {/* Stock Actual */}
          <div>
            <TextInput
              label="Stock Actual"
              type="number"
              value={data.stock_actual}
              onChange={(val) => setData("stock_actual", Number(val))}
              error={errors.stock_actual}
            />
          </div>

          {/* Stock Mínimo */}
          <div>
            <TextInput
              label="Stock Mínimo"
              type="number"
              value={data.stock_minimo}
              onChange={(val) => setData("stock_minimo", Number(val))}
              error={errors.stock_minimo}
            />
          </div>

          {/* Unidad de Medida */}
          <div>
            <TextInput
              label="Unidad de Medida"
              type="text"
              placeholder="Ej: kg, unid, lt"
              value={data.unidad_medida}
              onChange={(val) => setData("unidad_medida", val)}
              error={errors.unidad_medida}
            />
          </div>

          {/* Precio de Compra */}
          <div>
            <TextInput
              label="Precio de Compra"
              type="number"
              value={data.precio_compra}
              onChange={(val) => setData("precio_compra", Number(val))}
              error={errors.precio_compra}
            />
          </div>

          {/* Precio de Venta */}
          <div>
            <TextInput
              label="Precio de Venta"
              type="number"
              value={data.precio_venta}
              onChange={(val) => setData("precio_venta", Number(val))}
              error={errors.precio_venta}
            />
          </div>



          {/* Activo */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="activo"
              name="activo"
              checked={data.activo}
              onClick={() => setData("activo", !data.activo)}
            />
            <label htmlFor="activo" className="text-sm">
              Activo
            </label>
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="mt-6">
          <Button variant="default" onClick={handleSubmit}>
            Guardar
          </Button>
        </div>

        <div className="mb-6"></div>

        <ProductoImagenesManager
            productoId={producto?.id || initialData.id}
            imagenesGuardadas={producto?.imagenes || []}
            onUpdated={ (message) => {
              setToastMessage(message)
            }}
            />
        <ProductoPrecioManager
            productoId={producto?.id || initialData.id}
            preciosGuardados={producto?.precios || []}
            onUpdated={ (message) => {
              setToastMessage(message)
            }}
        />

        {/* Toast */}
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
    </AppLayout>
  );
};

export default ProductoCreate;
