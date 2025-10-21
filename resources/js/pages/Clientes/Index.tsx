import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import ClienteItemsTable from "@/components/Clientes/ClienteItemsTable";
import ClienteCreateModal from "@/components/Clientes/ClienteCreateModal";
import ClienteEditModal from "@/components/Clientes/ClienteEditModal";
import ClienteDetailModal from "@/components/Clientes/ClienteDetailModal";
import ConfirmModal from "@/components/ConfirmModal";
import Toast from "@/components/Toast";
import Search from "@/components/Clientes/ClienteSearch";
import { Cliente, PaginatedClientes } from "@/interfaces/Clientes.Interface";
import { Button } from "@/components/ui/button";
import PaginationInertia from "@/components/PaginationInertia";

interface Props {
  clientes: PaginatedClientes;
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

const Index: React.FC<Props> = ({ clientes, filters }) => {
  const { flash } = usePage().props as any;
  const [toastMessage, setToastMessage] = useState(flash?.success || null);

  const [showCreate, setShowCreate] = useState(false);
  const [editCliente, setEditCliente] = useState<Cliente | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Cliente | null>(null);
  const [detailCliente, setDetailCliente] = useState<Cliente | null>(null);

  const [url, setUrl] = useState("/api/ventas")

  const handleDelete = (cliente: Cliente) => {
    router.delete(`/clientes/${cliente.id}`, {
      onSuccess: () =>
        setToastMessage(
          `Cliente '${cliente.nombre_razon_social}' eliminado correctamente.`
        ),
    });
    setConfirmDelete(null);
  };

  const handleSaved = (msg: string) => {
    setToastMessage(msg);
  };

  const handlePageChange = (newUrl: string) => {
    if (newUrl) {
      router.visit(newUrl, {
        preserveScroll: true,
        preserveState: true,
      });
    }
  }
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Clientes", href: "/clientes" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        {/* Botón para crear nuevo cliente */}
        <Button
          onClick={() => setShowCreate(true)}
          variant={"default"}
          className="mb-4"
        >
          Nuevo Cliente
        </Button>

        {/* Componente de búsqueda */}
        <Search initialSearch={filters.search} />

        {/* Tabla de clientes */}
        <ClienteItemsTable
          clientes={clientes}
          filters={filters}
          onEdit={setEditCliente}
          onDelete={setConfirmDelete}
          onDetail={setDetailCliente}
        />

         {/* Paginación */}
        <PaginationInertia links={clientes?.links ?? []} onPageChange={handlePageChange}/>

        {/* Modales */}
        {showCreate && (
          <ClienteCreateModal
            onClose={() => setShowCreate(false)}
            onSaved={(msg: string) => handleSaved(msg)}
          />
        )}

        {editCliente && (
          <ClienteEditModal
            cliente={editCliente}
            onClose={() => setEditCliente(null)}
            onSaved={(msg: string) => handleSaved(msg)}
          />
        )}

        {detailCliente && (
          <ClienteDetailModal
            cliente={detailCliente}
            onClose={() => setDetailCliente(null)}
          />
        )}

        {confirmDelete && (
          <ConfirmModal
            text={confirmDelete.nombre_razon_social}
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

export default Index;
