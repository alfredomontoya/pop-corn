// resources/js/Hooks/useVentas.ts
import { router } from '@inertiajs/react'

export default function useVentas() {
  const store = (values: Partial<Venta>, onSuccess?: () => void) => {
    router.post('/ventas', values, { onSuccess })
  }

  const update = (id: number, values: Partial<Venta>, onSuccess?: () => void) => {
    router.put(`/ventas/${id}`, values, { onSuccess })
  }

  const destroy = (id: number) => {
    if (confirm('¿Seguro que deseas eliminar esta venta?')) {
      router.delete(`/ventas/${id}`)
    }
  }

  return { store, update, destroy }
}
