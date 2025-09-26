import useVentas from '@/hooks/useVentas'
import { Venta } from '@/types'
import VentaForm from '@/components/Ventas/VentaForm'
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Props {
    venta: Venta
}

const breadcrumbs: BreadcrumbItem[] = [{ title: "ventas", href: "/ventas" }];

const Edit: React.FC<Props> = ({venta}) => {
  const { update } = useVentas()

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className='p-4'>
      <h1 className="text-xl font-bold mb-4">Editar Venta</h1>
      <VentaForm
        venta={venta}
        onSubmit={(data) => update(venta.id, data)}
      />
    </div>
    </AppLayout>
  )
}
