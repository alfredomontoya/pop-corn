<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Venta;
use App\Models\DetalleVenta;

class VentaSeeder extends Seeder
{
    public function run(): void
    {
        Venta::factory(10)->create();
    }
}
