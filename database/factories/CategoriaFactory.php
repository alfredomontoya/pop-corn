<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class CategoriaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->word(),
            'descripcion' => $this->faker->sentence(),
            // 'imagen' => function() {
            //     $response = Http::get('https://picsum.photos/640/480?random=' . rand(1, 1000));
            //     $filename = 'categorias/' . uniqid() . '.jpg';
            //     Storage::disk('public')->put($filename, $response->body());
            //     return $filename;
            // },
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(), // 🆕
        ];
    }
}
