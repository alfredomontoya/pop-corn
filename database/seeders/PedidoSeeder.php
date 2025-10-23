<?php

namespace Database\Seeders;

use App\Models\Caja;
use Illuminate\Database\Seeder;
use App\Models\Pedido;
use App\Models\DetallePedido;
use App\Models\Producto;
use Carbon\Carbon;


class PedidoSeeder extends Seeder
{
    public function run(): void
    {
        //El seeder de estado pedidos debe haberse ejecutado antes
        // Crear 50 pedidos con estado 'PENDIENTE' y total 0
        $pedidos = Pedido::factory(50)->create(['total' => 0, 'estado_pedido_id' => 1]);


        // Para cada pedido, agregar detalles de pedido con productos aleatorios
        $pedidos->each(function($pedido) {
            $total = 0;
            Producto::all()->each(function ($producto) use ($pedido, &$total){
                $cantidad = random_int(5, 24);
                $precio = $producto->precioActivo->precio_venta ?? 0;
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
        });

        $pedidos->each(function ($pedido){
            $pedido->entregar();
            $pedido->pagar(Caja::all('id')->random()->id);
        });

        $start = Carbon::now()->startOfMonth(); // Primer día del mes
        $end   = Carbon::now()->endOfMonth();   // Último día del mes

        $randomDate = Carbon::createFromTimestamp(rand($start->timestamp, $end->timestamp));

        Caja::all()->each(function (Caja $caja) use ($randomDate) {
            $caja->cerrar($randomDate);
        });

    }
}
