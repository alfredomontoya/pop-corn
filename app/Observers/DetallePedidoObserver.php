<?php

namespace App\Observers;

use App\Models\DetallePedido;

class DetallePedidoObserver
{
    /**
     * Handle the DetallePedido "created" event.
     */
    public function created(DetallePedido $detallePedido): void
    {
        //
    }

    /**
     * Handle the DetallePedido "updated" event.
     */
    public function updated(DetallePedido $detallePedido): void
    {
        //
    }

    /**
     * Handle the DetallePedido "deleted" event.
     */
    public function deleted(DetallePedido $detallePedido): void
    {
        //
    }

    /**
     * Handle the DetallePedido "restored" event.
     */
    public function restored(DetallePedido $detallePedido): void
    {
        //
    }

    /**
     * Handle the DetallePedido "force deleted" event.
     */
    public function forceDeleted(DetallePedido $detallePedido): void
    {
        //
    }
}
