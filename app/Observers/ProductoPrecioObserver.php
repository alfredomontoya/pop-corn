<?php

namespace App\Observers;

use App\Models\ProductoPrecio;
use Carbon\Carbon;

class ProductoPrecioObserver
{

    /**
     * Handle the ProductoPrecio "creating" event.
     */
    public function creating(ProductoPrecio $productoPrecio): void
    {
        // Buscar el precio activo actual de este producto
        $precioActivo = ProductoPrecio::where('producto_id', $productoPrecio->producto_id)
            ->where('activo', true)
            ->latest('fecha_inicio')
            ->first();

        if ($precioActivo) {
            $precioActivo->update([
                'activo' => false,
                'fecha_fin' => Carbon::today(),
            ]);
        }
    }
    /**
     * Handle the ProductoPrecio "created" event.
     */
    public function created(ProductoPrecio $productoPrecio): void
    {
        //
    }

    /**
     * Handle the ProductoPrecio "updated" event.
     */
    public function updated(ProductoPrecio $productoPrecio): void
    {
        //
    }

    /**
     * Handle the ProductoPrecio "deleted" event.
     */
    public function deleted(ProductoPrecio $productoPrecio): void
    {
        //
    }

    /**
     * Handle the ProductoPrecio "restored" event.
     */
    public function restored(ProductoPrecio $productoPrecio): void
    {
        //
    }

    /**
     * Handle the ProductoPrecio "force deleted" event.
     */
    public function forceDeleted(ProductoPrecio $productoPrecio): void
    {
        //
    }
}
