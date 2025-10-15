<?php

namespace Database\Factories;

use App\Models\Movimiento;
use Illuminate\Database\Eloquent\Factories\Factory;

class MovimientoFactory extends Factory
{
    protected $model = Movimiento::class;

    public function definition(): array
    {
        $cantidad = $this->faker->numberBetween(1, 10);
        $precio = $this->faker->randomFloat(2, 10, 500);

        return [
            'nro' => strtoupper($this->faker->bothify('MOV-####')),
            'fecha' => now(),
            'descripcion' => $this->faker->sentence(),
            'total' => $cantidad * $precio,
            'tipo' => $this->faker->randomElement(['ingreso', 'egreso']),
            'user_id' => \App\Models\User::all('id')->random(),
            'cliente_id' => \App\Models\Cliente::all('id')->random(),
        ];
    }
}
