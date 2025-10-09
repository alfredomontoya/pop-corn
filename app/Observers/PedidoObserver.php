<?php

namespace App\Observers;

use App\Models\Movimiento;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Support\Facades\Auth;

class PedidoObserver
{
    /**
     * Handle the Pedido "created" event.
     */
    public function created(Pedido $pedido): void
    {
        //
    }

    /**
     * Handle the Pedido "updated" event.
     */
    public function updated(Pedido $pedido): void
    {
        // Solo si cambió el campo estado
        if ($pedido->wasChanged('estado_pedido_id')) {

            // Caso 1: preparado → aumentar stock
            if ($pedido->estadoPedido->estado === 'preparado') {
                $pedido->detalles->each(function ($detalle) {
                    $producto = Producto::find($detalle->producto_id);

                    if ($producto) {
                        $producto->update([
                            'stock_actual' => $producto->stock_actual + $detalle->cantidad
                        ]);
                    }
                });
            }

            // Caso 2: entregado → disminuir stock
            if ($pedido->estadoPedido->estado === 'entregado') {
                $pedido->detalles->each(function ($detalle) {
                    $producto = Producto::find($detalle->producto_id);

                    if ($producto) {
                        $producto->update([
                            'stock_actual' => $producto->stock_actual - $detalle->cantidad
                        ]);
                    }
                });

            }
            // Caso 3: Crear movimiento
            if ($pedido->estadoPedido->estado === 'pagado') {
                Movimiento::create([
                    'user_id' => Auth::id(),
                    'cliente_id' => $pedido->cliente_id,
                    'tipo' => 'ingreso',
                    'total' => $pedido->total,
                    'descripcion' => "Pedido_$pedido->id",
                    'fecha' => now(),

                ]);
            }
        }
    }

    /**
     * Handle the Pedido "deleted" event.
     */
    public function deleted(Pedido $pedido): void
    {
        //
    }

    /**
     * Handle the Pedido "restored" event.
     */
    public function restored(Pedido $pedido): void
    {
        //
    }

    /**
     * Handle the Pedido "force deleted" event.
     */
    public function forceDeleted(Pedido $pedido): void
    {
        //
    }
}
