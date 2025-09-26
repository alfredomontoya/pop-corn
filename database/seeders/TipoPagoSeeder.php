<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoPago;

class TipoPagoSeeder extends Seeder
{
    public function run(): void
    {
        $tipos = [
            ['nombre' => 'efectivo', 'activo' => true],
            ['nombre' => 'qr', 'activo' => true],
            ['nombre' => 'transferencia', 'activo' => true],
            ['nombre' => 'credito', 'activo' => true],
        ];

        foreach ($tipos as $tipo) {
            TipoPago::updateOrCreate(
                ['nombre' => $tipo['nombre']], // evita duplicados
                ['activo' => $tipo['activo']]
            );
        }
    }
}
