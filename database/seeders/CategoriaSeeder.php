<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        // Categoria::factory(5)->create();
        // $categorias = [
        //     ['nombre' => 'Mesas de billar', 'descripcion' => 'Alquiler de mesas por hora.'],
        //     ['nombre' => 'Bebidas', 'descripcion' => 'Gaseosas, cervezas, energizantes y agua.'],
        //     ['nombre' => 'Snacks / Comidas rápidas', 'descripcion' => 'Hamburguesas, papas fritas, pizzas, salchipapas.'],
        //     ['nombre' => 'Accesorios de billar', 'descripcion' => 'Tacos, tizas, guantes, bolas y fundas.'],
        //     ['nombre' => 'Promociones y combos', 'descripcion' => 'Paquetes especiales con mesa, bebidas y snacks.'],
        // ];
        $categorias = [
            ['nombre' => 'Pipocas', 'descripcion' => 'Producto comestible a base de maiz'],
        ];

        foreach ($categorias as $data) {
            Categoria::factory()->create($data);
        }
    }
}
