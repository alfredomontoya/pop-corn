<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pedido;
use App\Models\DetallePedido;
use App\Models\Producto;

class PedidoSeeder extends Seeder
{
    public function run(): void
    {
        Pedido::factory(3)->create(['total' => 0]);

        Pedido::all()->each(function($pedido) {
            $total = 0;
            Producto::all()->each(function ($producto) use ($pedido, &$total){
                $cantidad = random_int(5, 24);
                $precio = $producto->precioActivo->precio_venta ;
                $subtotal = $precio * $cantidad;
                $total = $total + $subtotal;
                DetallePedido::create([
                    'pedido_id' => $pedido->id,
                    'producto_id' => $producto->id,
                    'precio' => $precio,
                    'cantidad' => $cantidad,
                    'subtotal' => $precio * $cantidad
                ]);
            });
            $pedido->total = $total;
            $pedido->save();
            // dd($pedido);

        });

    }
}
