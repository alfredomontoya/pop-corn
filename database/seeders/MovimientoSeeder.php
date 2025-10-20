<?php
namespace Database\Seeders;

use App\Models\Caja;
use Illuminate\Database\Seeder;
use App\Models\Movimiento;

class MovimientoSeeder extends Seeder
{
    public function run(): void
    {
        //El seeder de cajas debe haberse ejecutado antes
        $cajas = Caja::all();




        $cajas->each(function (Caja $caja) {
            Movimiento::factory()->count(5)->create([
                'caja_id' => $caja->id,
            ]);
        });

    }
}
