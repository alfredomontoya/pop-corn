<?php

namespace Database\Factories;

use App\Models\DetallePedido;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Database\Eloquent\Factories\Factory;

class DetallePedidoFactory extends Factory
{
    protected $model = DetallePedido::class;

    public function definition(): array {
        $producto = Producto::all()->random();
        $precio = $producto->precioActivo->precio_venta;
        $cantidad = $this->faker->numberBetween(1, 10);

        return [
            'pedido_id' => Pedido::all('id')->random(),
            'producto_id' => $producto->id,
            'cantidad' => $cantidad,
            'precio' => $precio,
            'subtotal' => $cantidad * $precio,
        ];
    }
}
