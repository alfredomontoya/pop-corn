import React, { useEffect, useState } from "react";
import { useCaja } from "@/hooks/useCaja";
import { Caja } from "@/interfaces/Caja.Ingerface";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import CajaCreateModal from "@/components/Cajas/CajaCreateModa";
import CerrarCajaModal from "@/components/Cajas/CerrarCajaModal";
import CajaShowModal from "@/components/Cajas/CajaShowModal";
import CajasItemsTable from "@/components/Cajas/CajasItemsTable";
import Pagination from "@/components/Pagination";

export const Index: React.FC = () => {
  const { cajas, loading, fetchCajas, fecha } = useCaja();
  const [refreshing, setRefreshing] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [cajaToClose, setCajaToClose] = useState<Caja | null>(null);
  const [isCerrarModalOpen, setIsCerrarModalOpen] = useState(false);

  const [cajaToShow, setCajaToShow] = useState<Caja | null>(null);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const [fechaInicio, setFechaInicio] = useState<string | null>(null);
  const [fechaFin, setFechaFin] = useState<string | null>(null);

  // 🟢 Cargar cajas al montar el componente
  useEffect(() => {
    fetchCajas();
  }, []);

  const handleCreateSuccess = async () => {
    setIsCreateModalOpen(false);
    await fetchCajas();
  };

  const openCerrarCajaModal = (caja: Caja) => {
    setCajaToClose(caja);
    setIsCerrarModalOpen(true);
  };

  const openShowCajaModal = (caja: Caja) => {
    setCajaToShow(caja);
    setIsShowModalOpen(true);
  };

  const handleAperturarCaja = () => {
    setIsCreateModalOpen(true);
  };

  // 🔹 Totales
  const totalIngresos = cajas?.data?.reduce((sum, c) => sum + (c.total_ingresos || 0), 0) || 0;
  const totalEgresos = cajas?.data?.reduce((sum, c) => sum + (c.total_egresos || 0), 0) || 0;
  const totalSaldoFinal = cajas?.data?.reduce((sum, c) => sum + (c.saldo_final || 0), 0) || 0;

  return (
    <AppLayout breadcrumbs={[{ title: "Captaciones", href: route("captaciones.index") }]}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Cajas</h1>
          <Button onClick={handleAperturarCaja} variant="outline">Abrir Caja</Button>
        </div>

        {/* Filtros de fecha */}
        <div className="flex items-center space-x-2 mb-4">
          <label>Desde:</label>
          <input
            type="date"
            value={fechaInicio || ""}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <label>Hasta:</label>
          <input
            type="date"
            value={fechaFin || ""}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border rounded px-2 py-1"
          />

          <Button
            onClick={() => fetchCajas({ fechaInicio: fechaInicio || undefined, fechaFin: fechaFin || undefined })}
            variant="outline"
          >
            Filtrar
          </Button>

          <Button
            onClick={() => {
              setFechaInicio(null);
              setFechaFin(null);
              fetchCajas();
            }}
            variant="secondary"
          >
            Limpiar
          </Button>
        </div>

        {/* Exportar PDF / Excel */}
        <div className="flex space-x-2 mb-4">
          <Button
            variant="outline"
            onClick={() => window.open(route("cajas.export.pdf", {
              fechaInicio: fechaInicio || "",
              fechaFin: fechaFin || ""
            }), "_blank")}
          >
            Exportar PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(route("cajas.export.excel", {
              fechaInicio: fechaInicio || "",
              fechaFin: fechaFin || ""
            }), "_blank")}
          >
            Exportar Excel
          </Button>
        </div>

        {/* Tabla de cajas */}
        <CajasItemsTable
          cajas={cajas.data}
          loading={loading}
          refreshing={refreshing}
          onCerrarCaja={openCerrarCajaModal}
          onShowCaja={openShowCajaModal}
          totales={{
            totalIngresos,
            totalEgresos,
            totalSaldoFinal
          }}
        />

        {/* Paginación */}
        <Pagination
          currentPage={cajas?.current_page || 1}
          lastPage={cajas?.last_page || 1}
          onPageChange={(page) =>
            fetchCajas({ page, fechaInicio: fechaInicio || undefined, fechaFin: fechaFin || undefined })
          }
        />
      </div>

      {/* Modales */}
      <CajaCreateModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
      <CerrarCajaModal
        open={isCerrarModalOpen}
        onClose={() => setIsCerrarModalOpen(false)}
        caja={cajaToClose}
        onSuccess={fetchCajas}
      />
      <CajaShowModal
        open={isShowModalOpen}
        onClose={() => setIsShowModalOpen(false)}
        caja={cajaToShow}
      />
    </AppLayout>
  );
};

export default Index;
