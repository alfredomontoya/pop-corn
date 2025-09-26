<?php

namespace Database\Factories;

use App\Models\Pedido;
use App\Models\User;
use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class PedidoFactory extends Factory
{
    protected $model = Pedido::class;

    public function definition(): array {
        return [
            'cliente_id' => Cliente::all('id')->random(),
            'user_id' => User::all('id')->random(),
            // 'nro' => $this->faker->unique()->numberBetween(1, 9999),
            'fecha' => $this->faker->date(),
            // 'estado' => $this->faker->randomElement(['pendiente','confirmado','cancelado','entregado']),
            'estado' => 'pendiente',
            'total' => $this->faker->randomFloat(2, 50, 500),
            'observacion' => $this->faker->sentence(),
        ];
    }
}
