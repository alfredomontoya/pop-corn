<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\ProductoPrecio;
use App\Models\User;

class ProductoPrecioSeeder extends Seeder
{
    public function run(): void
    {
        $productos = Producto::all();

        $productos->each(function ($producto)  {
            ProductoPrecio::factory(3)->create([
                'producto_id' => $producto->id,
            ]);
        });
    }
}
