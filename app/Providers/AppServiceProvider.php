<?php

namespace App\Providers;

use App\Models\Pedido;
use App\Models\ProductoPrecio;
use App\Observers\PedidoObserver;
use App\Observers\ProductoPrecioObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        ProductoPrecio::observe(ProductoPrecioObserver::class);
        Pedido::observe(PedidoObserver::class);
    }
}
