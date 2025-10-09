<?php

namespace Database\Seeders;

use App\Models\Cliente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea 10 clientes de ejemplo

        Cliente::factory(['nombre_razon_social' => 'Tigo', 'propietario' => 'Gabriela'])
            ->create();
        Cliente::factory(['nombre_razon_social' => 'Pentagol', 'propietario' => 'Diego'])
            ->create();
    }
}
