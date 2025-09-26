<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DetalleVenta;
use App\Models\Venta;

class DetalleVentaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $ventas = Venta::all();
        foreach ($ventas as $venta) {
            $detalles = DetalleVenta::factory(rand(1, 5))->create(['venta_id' => $venta->id]);
        }
    }
}
