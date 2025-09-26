<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ProductoPrecio;
use App\Models\Producto;
use App\Models\User;

class ProductoPrecioFactory extends Factory
{
  protected $model = ProductoPrecio::class;

  public function definition()
  {
    $producto = Producto::inRandomOrder()->first() ?? Producto::factory()->create();
    $user = User::inRandomOrder()->first() ?? User::factory()->create();

    $precioCompra = $this->faker->randomFloat(2, 10, 100);
    $precioVenta = $precioCompra + $this->faker->randomFloat(2, 5, 50);

    return [
      'producto_id' => $producto->id,
      'precio_venta' => $precioVenta,
      'precio_compra' => $precioCompra,
      'activo' => true,
      'fecha_inicio' => now(),
      'fecha_fin' => null,
      'user_id' => $user->id,
    ];
  }
}
