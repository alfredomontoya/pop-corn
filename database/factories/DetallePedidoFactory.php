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
        $precio = $this->faker->randomFloat(2, 5, 20);
        $cantidad = $this->faker->numberBetween(1, 10);

        return [
            'pedido_id' => Pedido::all('id')->random(),
            'producto_id' => Producto::all('id')->random(),
            'cantidad' => $cantidad,
            'precio' => $precio,
            'subtotal' => $cantidad * $precio,
        ];
    }
}
