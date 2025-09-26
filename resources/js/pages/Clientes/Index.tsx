import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useClientes } from "@/hooks/Clientes/useClientes";
import ClientesSearchForm from "./ClientesSearchForm";
import ClientesTable from ".//ClientesTable";
import ClientesPagination from "./ClientesPagination";
import ClienteDetailModal from "./ClienteDetailModal";
import { Cliente } from "@/interfaces/Clientes.Interface";
import CreateClienteModal from "./ClienteCreateModal";
import { Button } from "@/components/ui/button";
import ConfirmacionRegistro from "@/components/ConfirmacionRegistro";
import ClienteUpdateModal from "./ClienteUpdateModal";
import DeleteModal from "@/components/DeleteModal";
import SuccessModal from "@/components/SuccessModal";

interface Props {
  clientes: {
    data: Cliente[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  filters?: { search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Clientes", href: "/clientes" },
];

export default function Index({ clientes, filters }: Props) {
  const { search, setSearch, handleSearch } = useClientes(filters?.search || "");
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clientes" />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4"> Clientes
        </h1>
        <div className="flex gap-2">
            <ClientesSearchForm
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />

            {/* <Link
                href={route("clientes.create")}
                className="bg-secondary text-black px-3 py-1 rounded-sm gap-2 mb-4"
            >
                Nuevo
            </Link> */}
            <Button className="mb-4" variant={"secondary"} size={"sm"} onClick={() => setOpenCreateModal(true)}>Nuevo Cliente</Button>
        </div>


        <ClientesTable
            clientes={clientes.data}
            onSelect={(cliente) => {
                setClienteSeleccionado(cliente);
                setOpenDetailModal(true); // para abrir detalle
            }}
            onEdit={(cliente) => {
                setClienteSeleccionado(cliente);
                setOpenUpdateModal(true); // para abrir modal de edición
            }}
            onDelete={(cliente) => {
                setClienteSeleccionado(cliente);
                setOpenDeleteModal(true);
            }}
        />

        <ClientesPagination links={clientes.links} />

        {/* Ver detalle de cliente */}
        {openDetailModal && clienteSeleccionado && (
            <ClienteDetailModal
                cliente={clienteSeleccionado}
                onClose={() => {
                    setOpenDetailModal(false)
                    setClienteSeleccionado(null)
                }}
            />
        )}

        {/* Create Cliente Modal */}
        <CreateClienteModal
            open={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            onSuccess={() => {
              setOpenCreateModal(false);
              setShowConfirm(true);
            }}
        />

        {/* Update Cliente Modal */}
        {openUpdateModal && clienteSeleccionado && (
            <ClienteUpdateModal
                open={openUpdateModal}
                cliente={clienteSeleccionado}
                onClose={() => {
                    setOpenUpdateModal(false)
                    setClienteSeleccionado(null)
                }}
                onSuccess={() => {
                    setOpenUpdateModal(false)
                    setClienteSeleccionado(null);
                    setShowConfirm(true);
                }}
            />
        )}

        {/* Eliminar cliente */}
        <DeleteModal
            open={openDeleteModal}
            onClose={() => {
                setOpenDeleteModal(false);
                setClienteSeleccionado(null);
            }}
            onConfirm={() => {
                if (clienteSeleccionado) {
                    router.delete(route("clientes.destroy", clienteSeleccionado.id), {
                        onSuccess: () => {
                            setOpenDeleteModal(false);

                            setOpenSuccessModal(true);
                        },
                        onError: () => {
                            // Manejar error
                        }
                    });

                }
            }}
            itemName={clienteSeleccionado?.nombre_razon_social || ""}
        />

        <SuccessModal
            open={openSuccessModal}
            onClose={() => {
                setOpenSuccessModal(false)
                setClienteSeleccionado(null);
            }}
            message={`El cliente ${clienteSeleccionado?.nombre_razon_social ?? ""} fue eliminado correctamente.`}
        />

        <ConfirmacionRegistro open={showConfirm} onClose={() => setShowConfirm(false)} />
      </div>
    </AppLayout>
  );
}
