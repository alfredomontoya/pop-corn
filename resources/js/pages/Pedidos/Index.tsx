// Elegir Cliente
// Ver Ubicación, dirección y teléfono del cliente
// registrar Detalle
// 	Producto	Cantidad	Total
// 	####		###		###
// 	####		###		###

// 	####		###		###

// Total 100 (Se calcula automaticamente)
// Tipo Pago: Inicialmente Vacio: QR, Transferencia, Efectivo
// Pago Inicial 20
// Saldo 80

// Pago Final 100
// Cambio:	20
// Estado: Pendiente | Cancelado
// Fecha: Actual

import usePedidosCRUD from '@/hooks/Pedido/usePedidosCRUD';
import { useEffect, useState } from 'react';
import TablePedidos from './TablePedidos';
import { Pedido } from '@/interfaces/Pedidos.Interface';
import AppLayout from '@/layouts/app-layout';
import { Paginated } from '@/interfaces/Venta.Interface';
import { Link, router } from '@inertiajs/react';
import SearchComponent from '@/components/helpers/SearchComponent';
import Pagination from '@/components/Pagination';
import usePedido from '@/hooks/Pedido/usePedido';
import useSearch from '@/hooks/Pedido/useSearch';
import { Button } from '@/components/ui/button';
import ResumenProductos from '@/components/Pedidos/ResumenProductos';
import HeadingSmall from '@/components/heading-small';
// import TablePedidos from './components/TablePedidos';

interface Totales {
  grandes: number
  medianos: number
  pequenos: number
  total: number
}

interface Props {
  pedidos: {
    data: Pedido[]
    links: any[]
    current_page: number
    last_page: number
  }
  filters: {
    search?: string
    sort?: string
    direction?: string
  }
  totales: {
    pendientes: Totales
    preparados: Totales
    entregados: Totales
  }
}


export default function Index({ pedidos, filters, totales }: Props) {

    const { deletePedido } = usePedidosCRUD();
    const { search, setSearch, handleSearch } = useSearch(filters?.search || '');


  return (
    <AppLayout breadcrumbs={[{ title: 'Pedidos', href: '/pedidos' }]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Pedidos</h1>

        {/* Componente de resumen arriba */}
        <HeadingSmall title={`Peidos pendientes ${totales.pendientes.total}`} description='Listado de pedidos pendientes'/>
        <ResumenProductos resumen={totales.pendientes} />

        <HeadingSmall title={`Peidos preparados ${totales.preparados.total}`} description='Listado de pedidos preparados'/>
        <ResumenProductos resumen={totales.preparados} />

        <HeadingSmall title={`Peidos entregados ${totales.entregados.total}`} description='Listado de pedidos entregados'/>
        <ResumenProductos resumen={totales.entregados} />

        <Button variant={'default'} onClick={() => router.visit('/pedidos/create')} className="mb-4">
          Nuevo Pedido
        </Button>

        <SearchComponent search={search} setSearch={setSearch} handleSearch={handleSearch} />
        <TablePedidos pedidos={pedidos} onDelete={deletePedido} search={search} />
        <Pagination links={pedidos.links} />
      </div>
    </AppLayout>
  );
}
