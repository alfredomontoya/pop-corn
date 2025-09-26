import { usePage, Link } from '@inertiajs/react'
import { BreadcrumbItem, Venta } from '@/types'
import React from 'react'
import AppLayout from '@/layouts/app-layout';

interface Props {
  venta: Venta
}

const breadcrumbs: BreadcrumbItem[] = [{ title: "ventas", href: "/ventas" }];

const Show: React.FC<Props> = ({venta}) => {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className='p-4'>
      <h1 className="text-xl font-bold mb-4">Detalle Venta #{venta.id}</h1>
      <p><strong>Total:</strong> {venta.total}</p>
      <p><strong>Estado:</strong> {venta.estado}</p>
      <p><strong>Usuario:</strong> {venta.user?.name}</p>

      <Link href="/ventas" className="mt-4 inline-block text-blue-500">← Volver</Link>
    </div>
  </AppLayout>
  )
}

export default Show
