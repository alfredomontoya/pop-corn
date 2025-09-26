import React, { useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import ProductoItemsTable from "@/components/Productos/ProductoItemsTable";
import ProductoResumenModal from "@/components/Productos/ProductoResumenModal";
import ConfirmModal from "@/components/ConfirmModal";
import Toast from "@/components/Toast";
import ProductoSearch from "@/components/Productos/ProductoSearch";
import { Producto, PaginatedProductos } from "@/interfaces/Productos.Interface";
import { Categoria } from "@/interfaces/Categorias.Interface";
import { BreadcrumbItem } from "@/types";
import FloatingCreateButton from "@/components/Productos/FloatingCreateButton";

interface Props {
  productos: PaginatedProductos;
  categorias: Categoria[];
  filters: {
    search?: string;
    sort?: string;
    direction?: string;
  };
}


const ProductoIndex: React.FC<Props> = ({ productos, categorias, filters }) => {
  const { flash } = usePage().props as any;
  const [toastMessage, setToastMessage] = useState(flash?.success || null);

  const [showCreate, setShowCreate] = useState(false);
  const [editProducto, setEditProducto] = useState<Producto | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Producto | null>(null);
  const [detailProducto, setDetailProducto] = useState<Producto | null>(null);

    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(productos.data[0]);

  const handleDelete = (producto: Producto) => {
    router.delete(`/productos/${producto.id}`, {
      onSuccess: () =>
        setToastMessage(`Producto '${producto.nombre}' eliminado correctamente.`),
    });
    setConfirmDelete(null);
  };

  const handleSaved = (msg: string) => {
    setToastMessage(msg);
  };

  const breadcrumbs: BreadcrumbItem[] = [{ title: "Productos", href: "/productos" }];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        <FloatingCreateButton />
        <Link
          href="/productos/create"
          className="mb-4 bg-black text-white px-4 py-2 rounded hover:bg-black/50 decoration-none inline-block"
        >
          Nuevo Producto
        </Link>

        <ProductoSearch initialSearch={filters.search} />

        <ProductoItemsTable
          productos={productos}
          filters={filters}
          onEdit={setEditProducto}
          onDelete={setConfirmDelete}
          onDetail={setDetailProducto}
          onSelect={(prod) => {
            setSelectedProduct(prod);
            // setShowImagenes(true);
          }}
        />

        {detailProducto && (
          <ProductoResumenModal
            producto={detailProducto}
            onClose={() => setDetailProducto(null)}
          />
        )}

        {confirmDelete && (
          <ConfirmModal
            text={confirmDelete.nombre}
            onConfirm={() => handleDelete(confirmDelete)}
            onClose={() => setConfirmDelete(null)}
          />
        )}

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
      {/* <ProductoImagenes
        productoSeleccionado={ selectedProduct }
        onClose={() => setSelectedProduct(null)}
        /> */}
    </AppLayout>
  );
};

export default ProductoIndex;
