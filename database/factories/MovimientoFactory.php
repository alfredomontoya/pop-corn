<?php

namespace Database\Factories;

use App\Models\Caja;
use App\Models\Cliente;
use App\Models\Movimiento;
use App\Models\Pedido;
use App\Models\User;
use App\Models\Venta;
use Illuminate\Database\Eloquent\Factories\Factory;

class MovimientoFactory extends Factory
{
    protected $model = Movimiento::class;

    public function definition(): array
    {
         // Tipos de movimiento
        $tipo = $this->faker->randomElement(['INGRESO', 'EGRESO']);

        return [
            'user_id' => User::all('id')->random()->id,
            'caja_id' => Caja::all('id')->random()->id,
            'cliente_id' => Cliente::all('id')->random()->id,
            'referencia_id' => null,
            'referencia_type' => null,
            // 'nro' => Movimiento::getSiguienteNroAttribute(),
            'descripcion' => $this->faker->sentence(),
            'monto' => $this->faker->randomFloat(2, 10, 5000),
            'tipo' => $tipo,
            'fecha' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
