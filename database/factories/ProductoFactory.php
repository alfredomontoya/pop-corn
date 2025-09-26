<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Producto;
use App\Models\User;
use App\Models\Categoria;

class ProductoFactory extends Factory
{
  protected $model = Producto::class;

  public function definition()
  {
    $user = User::inRandomOrder()->first() ?? User::factory()->create();
    $categoria = Categoria::inRandomOrder()->first() ?? Categoria::factory()->create();

    return [
      'nombre' => $this->faker->word(),
      'descripcion' => $this->faker->sentence(),
      'categoria_id' => $categoria->id,
      'codigo' => strtoupper($this->faker->bothify('PROD-###??')),
      'stock_actual' => $this->faker->numberBetween(0, 100),
      'stock_minimo' => $this->faker->numberBetween(0, 10),
      'unidad_medida' => $this->faker->randomElement(['unidad', 'caja', 'kg']),
      'activo' => true,
      'user_id' => $user->id,
      'updated_by' => $user->id,
    ];
  }
}
