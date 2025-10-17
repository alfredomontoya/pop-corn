<?php

namespace Database\Seeders;

use App\Models\EstadoPedido;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstadoPedidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $estados = [
            ['estado' => 'PENDIENTE'],
            ['estado' => 'ENTREGADO'],
            ['estado' => 'PAGADO'],
            ['estado' => 'CANCELADO'],
        ];

        foreach ($estados as $estado) {
            EstadoPedido::create($estado);
        }
    }
}
