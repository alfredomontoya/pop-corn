<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movimiento;

class MovimientoSeeder extends Seeder
{
    public function run(): void
    {
        Movimiento::factory()->count(20)->create();
    }
}
