<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Venta;
use App\Models\User;
use App\Models\Cliente;
use App\Models\TipoPago;

class VentaFactory extends Factory
{
    protected $model = Venta::class;

    public function definition(): array
    {
        $tipoPago = TipoPago::inRandomOrder()->first();
        $total = $this->faker->randomFloat(2, 50, 1000);
        $efectivo = $tipoPago->nombre === 'efectivo' ? $total : $this->faker->randomFloat(2, 0, $total);

        return [
            'user_id' => User::all('id')->random()->id ?? User::factory(),
            'tipo_pago_id' => $tipoPago->id ?? TipoPago::factory(),
            'cliente_id' => Cliente::all('id')->random()->id ?? Cliente::factory(),
            'total' => $total,
            'efectivo' => $efectivo,
            'cambio' => max($efectivo - $total, 0),
            'estado' => $tipoPago->nombre === 'credito' ? 'pendiente' : 'cancelado',
        ];
    }
}
