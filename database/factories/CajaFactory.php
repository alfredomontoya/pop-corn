<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Caja>
 */
class CajaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'        => User::all('id')->random(), // crea un usuario asociado
            'fecha_apertura' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'fecha_cierre'   => null, // al inicio no está cerrada
            'saldo_inicial'  => $this->faker->randomFloat(2, 0, 1000),
            'total_ingresos' => 0,
            'total_egresos'  => 0,
            'saldo_final'    => 0,
            'observacion'    => $this->faker->sentence(),
            'estado'         => 'ABIERTA',
        ];
    }
}
