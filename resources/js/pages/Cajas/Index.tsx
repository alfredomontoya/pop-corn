import React, { useEffect, useState } from "react";
import { useCaja } from "@/hooks/useCaja";
import { Caja } from "@/interfaces/Caja.Ingerface";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import CajaCreateModal from "@/components/Cajas/CajaCreateModa";
import CerrarCajaModal from "@/components/Cajas/CerrarCajaModal";
import CajaShowModal from "@/components/Cajas/CajaShowModal";
import CajasItemsTable from "@/components/Cajas/CajasItemsTable";

export const Index: React.FC = () => {
  console.log(new Date().toLocaleString());
  const { cajas, loading, fetchCajas, fecha } = useCaja();
  const [refreshing, setRefreshing] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 🔹 Para cerrar caja
  const [cajaToClose, setCajaToClose] = useState<Caja | null>(null);
  const [isCerrarModalOpen, setIsCerrarModalOpen] = useState(false);

  // 🔹 Para ver caja
  const [cajaToShow, setCajaToShow] = useState<Caja | null>(null);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  // 🟢 Cargar cajas al montar el componente
  useEffect(() => {
    fetchCajas();
  }, []);

  // 🟢 Refrescar lista después de crear una caja
  const handleCreateSuccess = async () => {
    setIsCreateModalOpen(false);
    await fetchCajas();
  };

  // 🟢 Abrir modal de cerrar caja
  const openCerrarCajaModal = (caja: Caja) => {
    setCajaToClose(caja);
    setIsCerrarModalOpen(true);
  };

  // 🟢 Abrir modal de mostrar caja
  const openShowCajaModal = (caja: Caja) => {
    setCajaToShow(caja);
    setIsShowModalOpen(true);
  };

  // 🟢 Manejar apertura del modal de crear caja
  const handleAperturarCaja = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Captaciones", href: route("captaciones.index") }]}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Cajas</h1>
          <Button
            onClick={handleAperturarCaja}
            variant={'default'}
          >
            Abrir Caja
          </Button>
        </div>

        <CajasItemsTable
          cajas={cajas.data}
          loading={loading}
          refreshing={refreshing}
          onCerrarCaja={openCerrarCajaModal}
          onShowCaja={openShowCajaModal} // <-- nuevo
        />
      </div>

      {/* Modal de crear caja */}
      <CajaCreateModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Modal de cerrar caja */}
      <CerrarCajaModal
        open={isCerrarModalOpen}
        onClose={() => setIsCerrarModalOpen(false)}
        caja={cajaToClose}
        onSuccess={fetchCajas} // refresca la lista al cerrar
      />

      {/* Modal de mostrar caja */}
      <CajaShowModal
        open={isShowModalOpen}
        onClose={() => setIsShowModalOpen(false)}
        caja={cajaToShow}
      />
    </AppLayout>
  );
};

export default Index;
