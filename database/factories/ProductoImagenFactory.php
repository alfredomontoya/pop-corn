<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ProductoImagen;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class ProductoImagenFactory extends Factory
{
  protected $model = ProductoImagen::class;

  public function definition()
  {
    $producto = Producto::inRandomOrder()->first() ?? Producto::factory()->create();
    $user = User::inRandomOrder()->first() ?? User::factory()->create();

    return [
      'producto_id' => $producto->id,
      // 'imagen' => function () {
      //         $filename = 'productos/' . uniqid() . '.jpg';
      //         $url = 'https://dummyimage.com/640x480/' . ltrim($this->faker->hexColor(), '#'). '/' . ltrim($this->faker->hexColor(), '#'). '.png&text=' . $this->faker->text(5);
      //         $response = Http::timeout(20)->get($url); // Timeout 20s
      //         Storage::disk('public')->put($filename, $response->body());
      //         return $filename;
      // },
      'imagen' => null,
      'es_principal' => $this->faker->boolean(30), // 30% chance
      'user_id' => $user->id,
    ];
  }
}
