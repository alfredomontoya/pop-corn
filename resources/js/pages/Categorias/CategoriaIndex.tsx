import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import CategoriaItemsTable from "@/components/Categorias/CatgoriaItemsTable";
import CategoriaCreateModal from "@/components/Categorias/CategoriaCreateModal";
import CategoriaEditModal from "@/components/Categorias/CategoriaEditModal";
import CategoriaDetailModal from "@/components/Categorias/CategoriaDetailModal";
import ConfirmModal from "@/components/ConfirmModal";
import Toast from "@/components/Toast";
import Search from "@/components/Categorias/CategoriaSearch";
import { Categoria, PaginatedCategorias } from "@/interfaces/Categorias.Interface";
import { Button } from "@/components/ui/button";

interface Props {
  categorias: PaginatedCategorias;
  filters: {
    search?: string;
    sort?: string;
    direction?: string;
  };
}

interface BreadcrumbItem {
  title: string;
  href: string;
}

const CategoriaIndex: React.FC<Props> = ({ categorias, filters }) => {
  const { flash } = usePage().props as any;
  const [toastMessage, setToastMessage] = useState(flash?.success || null);

  const [showCreate, setShowCreate] = useState(false);
  const [editCategoria, setEditCategoria] = useState<Categoria | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Categoria | null>(null);
  const [detailCategoria, setDetailCategoria] = useState<Categoria | null>(null);

  const handleDelete = (categoria: Categoria) => {
    router.delete(`/categorias/${categoria.id}`, {
      onSuccess: () =>
        setToastMessage(`Categoría '${categoria.nombre}' eliminada correctamente.`),
    });
    setConfirmDelete(null);
  };

  const handleSaved = (msg: string) => {
    setToastMessage(msg);
  };


  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Categorias", href: "/categorias" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        {/* Botón para crear nueva categoría */}
        <Button
          onClick={() => setShowCreate(true)}
          variant={"default"}
          className="mb-4"
        >
          Nueva Categoría
        </Button>

        {/* Componente de búsqueda */}
        <Search initialSearch={filters.search} />

        {/* Tabla de categorías */}
        <CategoriaItemsTable
          categorias={categorias}
          filters={filters}
          onEdit={setEditCategoria}
          onDelete={setConfirmDelete}
          onDetail={setDetailCategoria}
        />

        {/* Modales */}
        {showCreate &&
          <CategoriaCreateModal
            onClose={() => setShowCreate(false)}
            onSaved={(msg: string) => handleSaved(msg)}
          />
        }

        {editCategoria && (
          <CategoriaEditModal
            categoria={editCategoria}
            onClose={() => setEditCategoria(null)}
            onSaved={(msg: string) => handleSaved(msg)}
          />
        )}

        {detailCategoria && (
        <CategoriaDetailModal
            categoria={detailCategoria}
            onClose={() => setDetailCategoria(null)}
        />
        )}

        {confirmDelete && (
          <ConfirmModal
            text={confirmDelete.nombre}
            onConfirm={() => handleDelete(confirmDelete)}
            onClose={() => setConfirmDelete(null)}
          />
        )}

        {/* Toast de confirmación */}
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
    </AppLayout>
  );
};

export default CategoriaIndex;
