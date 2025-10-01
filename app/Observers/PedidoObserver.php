<?php

namespace App\Observers;

use App\Models\Pedido;
use App\Models\Producto;

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
    if ($pedido->wasChanged('estado')) {

        // Caso 1: preparado → aumentar stock
        if ($pedido->estado === 'preparado') {
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
        if ($pedido->estado === 'entregado') {
            $pedido->detalles->each(function ($detalle) {
                $producto = Producto::find($detalle->producto_id);

                if ($producto) {
                    $producto->update([
                        'stock_actual' => $producto->stock_actual - $detalle->cantidad
                    ]);
                }
            });
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
