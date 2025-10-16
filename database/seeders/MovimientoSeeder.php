<?php
namespace Database\Seeders;

use App\Models\Caja;
use Illuminate\Database\Seeder;
use App\Models\Movimiento;

class MovimientoSeeder extends Seeder
{
    public function run(): void
    {
        $cajas = Caja::factory(10)->create();

        $cajas->each(function (Caja $caja) {
            Movimiento::factory()->count(5)->create([
                'caja_id' => $caja->id,
            ]);
        });


        $movimientos = Movimiento::factory()->count(20)->create();

        $movimientos->each(function (Movimiento $movimiento) use ($caja) {
            $caja->movimientos()->create([
                'user_id' => $movimiento->user_id,
                'tipo' => $movimiento->tipo,
                'monto' => $movimiento->total,
                'concepto' => $movimiento->descripcion,
                'referencia_id' => $movimiento->id,
                'referencia_type' => Movimiento::class,
            ]);
        });

        // // dd($movimientos);
        // $caja->update([
        //     'fecha_cierre' => now(),
        //     'total_ingresos' => $caja->movimientos()->where('tipo', 'INGRESO')->sum('monto'),
        //     'total_egresos' => $caja->movimientos()->where('tipo', 'EGRESO')->sum('monto'),
        //     'saldo_final' => $caja->saldo_inicial + $caja->movimientos()->where('tipo', 'INGRESO')->sum('monto') - $caja->movimientos()->where('tipo', 'EGRESO')->sum('monto'),
        //     'estado' => 'CERRADA',
        // ]);


    }
}
