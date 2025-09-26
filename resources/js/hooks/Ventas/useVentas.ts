import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import { VentaPayload } from "@/interfaces/Venta.Interface";

export function useVentas(initialSearch: string = "") {
  // --- Manejo de búsqueda ---
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route("ventas.index"), { search }, { preserveState: true });
  };

  // --- Manejo de formulario para crear/actualizar ventas ---
  const form = useForm<VentaPayload>({
    cliente_id: undefined,
    tipo_pago_id: undefined,
    total: 0,
    efectivo: 0,
    cambio: 0,
    estado: "pendiente",
    detalles: [],
  });

  const saveVenta = (data: VentaPayload, id?: number) => {
    form.setData({
      cliente_id: data.cliente_id,
      tipo_pago_id: data.tipo_pago_id,
      total: data.total,
      efectivo: data.efectivo,
      cambio: data.cambio,
      estado: data.estado,
      detalles: (data.detalles ?? []).map((d) => ({
        producto_id: d.producto_id,
        cantidad: d.cantidad,
        precio_unitario: d.precio_unitario,
        subtotal: d.subtotal,
      })),
    });

    if (id) {
      form.put(route("ventas.update", id), {
        onSuccess: () => form.reset(),
        onError: (errors) => console.error("❌ Errores al actualizar:", errors),
      });
    } else {
      form.post(route("ventas.store"), {
        onSuccess: () => form.reset(),
        onError: (errors) => console.error("❌ Errores al crear:", errors),
      });
    }
  };

  return { search, setSearch, handleSearch, form, saveVenta };
}
