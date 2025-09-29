<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pedido;
use App\Models\DetallePedido;

class PedidoSeeder extends Seeder
{
    public function run(): void
    {
        Pedido::factory(3)
            ->has(DetallePedido::factory()->count(3), 'detalles')
            ->create();
    }
}
