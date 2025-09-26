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
            'fecha' => $this->faker->date(),
            'nombre' => $this->faker->words(2, true),
            'descripcion' => $this->faker->sentence(),
            'cantidad' => $cantidad,
            'umedida' => $this->faker->randomElement(['unidad', 'kg', 'litro', 'metro']),
            'precio' => $precio,
            'total' => $cantidad * $precio,
            'tipo' => $this->faker->randomElement(['ingreso', 'egreso']),
            'user_id' => \App\Models\User::all('id')->random(),
            'cliente_id' => \App\Models\Cliente::all('id')->random(),
        ];
    }
}
