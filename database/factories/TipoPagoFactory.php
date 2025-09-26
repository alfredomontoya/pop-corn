<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TipoPago;

class TipoPagoFactory extends Factory
{
    protected $model = TipoPago::class;

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->unique()->randomElement(['efectivo', 'tarjeta', 'qr', 'transferencia', 'credito']),
            'activo' => true,
        ];
    }
}
