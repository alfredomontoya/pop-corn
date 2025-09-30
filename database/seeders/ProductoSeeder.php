<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\ProductoPrecio;
use App\Models\Categoria;
use App\Models\User;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        // Producto::factory()->count(15)->create();
        $productos = [
            // Mesas de billar (categoria_id = 1)
            ['nombre' => 'Grande', 'categoria_id' => 1, 'descripcion' => 'Mesa estándar disponible para alquiler por una hora.'],
            ['nombre' => 'Mediano', 'categoria_id' => 1, 'descripcion' => 'Mesa profesional de alta calidad, alquiler por una hora.'],
            ['nombre' => 'Chico', 'categoria_id' => 1, 'descripcion' => 'Mesa doble ideal para grupos, alquiler por una hora.'],

            // // Bebidas (categoria_id = 2)
            // ['nombre' => 'Coca-Cola 500ml', 'categoria_id' => 2, 'descripcion' => 'Botella de Coca-Cola de 500ml.'],
            // ['nombre' => 'Pepsi 500ml', 'categoria_id' => 2, 'descripcion' => 'Botella de Pepsi de 500ml.'],
            // ['nombre' => 'Agua mineral 500ml', 'categoria_id' => 2, 'descripcion' => 'Botella de agua mineral de 500ml.'],
            // ['nombre' => 'Cerveza Pilsen 330ml', 'categoria_id' => 2, 'descripcion' => 'Cerveza Pilsen en botella de 330ml.'],
            // ['nombre' => 'Energizante Red Bull 250ml', 'categoria_id' => 2, 'descripcion' => 'Lata de Red Bull de 250ml para energía extra.'],
            // ['nombre' => 'Cerveza Corona 330ml', 'categoria_id' => 2, 'descripcion' => 'Cerveza Corona en botella de 330ml.'],

            // // Snacks / Comidas rápidas (categoria_id = 3)
            // ['nombre' => 'Hamburguesa clásica', 'categoria_id' => 3, 'descripcion' => 'Hamburguesa clásica con carne, queso, lechuga y tomate.'],
            // ['nombre' => 'Papas fritas medianas', 'categoria_id' => 3, 'descripcion' => 'Porción de papas fritas medianas, crujientes y calientes.'],
            // ['nombre' => 'Pizza pepperoni', 'categoria_id' => 3, 'descripcion' => 'Pizza de tamaño mediano con pepperoni y queso.'],
            // ['nombre' => 'Salchipapas', 'categoria_id' => 3, 'descripcion' => 'Porción de salchipapas con salsa especial.'],
            // ['nombre' => 'Hamburguesa doble con queso', 'categoria_id' => 3, 'descripcion' => 'Hamburguesa con doble carne y queso derretido.'],
            // ['nombre' => 'Alitas BBQ 6 unidades', 'categoria_id' => 3, 'descripcion' => 'Seis alitas con salsa BBQ, crujientes y jugosas.'],

            // Accesorios de billar (categoria_id = 4)
            // ['nombre' => 'Taco profesional', 'categoria_id' => 4, 'descripcion' => 'Taco de billar profesional para juego avanzado.'],
            // ['nombre' => 'Tiza azul', 'categoria_id' => 4, 'descripcion' => 'Tiza azul para mejorar el agarre del taco.'],
            // ['nombre' => 'Guante de billar', 'categoria_id' => 4, 'descripcion' => 'Guante para mejorar el control del taco.'],
            // ['nombre' => 'Set bolas 16 piezas', 'categoria_id' => 4, 'descripcion' => 'Set completo de 16 bolas de billar.'],
            // ['nombre' => 'Funda para taco', 'categoria_id' => 4, 'descripcion' => 'Funda protectora para tacos de billar.'],
            // ['nombre' => 'Triángulo para bolas', 'categoria_id' => 4, 'descripcion' => 'Triángulo para acomodar las bolas antes del juego.'],

            // // Promociones y combos (categoria_id = 5)
            // ['nombre' => 'Combo 1: Mesa + 2 bebidas', 'categoria_id' => 5, 'descripcion' => 'Alquiler de mesa por 1 hora con 2 bebidas incluidas.'],
            // ['nombre' => 'Combo 2: Mesa + bebida + snack', 'categoria_id' => 5, 'descripcion' => 'Mesa por 1 hora con una bebida y un snack a elección.'],
            // ['nombre' => 'Combo 3: Mesa VIP + 2 bebidas + snack', 'categoria_id' => 5, 'descripcion' => 'Mesa VIP por 1 hora con 2 bebidas y snack incluido.'],
            // ['nombre' => 'Promoción bebidas 3x2', 'categoria_id' => 5, 'descripcion' => 'Compra 3 bebidas y paga solo 2.'],
            // ['nombre' => 'Combo 4: 2 mesas + 4 bebidas', 'categoria_id' => 5, 'descripcion' => 'Alquiler de 2 mesas por 1 hora con 4 bebidas.'],
            // ['nombre' => 'Combo 5: Mesa + snack grande', 'categoria_id' => 5, 'descripcion' => 'Mesa por 1 hora con un snack grande a elección.'],
        ];

        foreach ($productos as $data) {
            Producto::factory()->create($data);
        }


        ProductoPrecio::factory(1)->create([
            'producto_id' => 1,
            'precio_venta' => 10.00,
        ]);

        ProductoPrecio::factory(1)->create([
            'producto_id' => 2,
            'precio_venta' => 5.00,
        ]);

        ProductoPrecio::factory(1)->create([
            'producto_id' => 3,
            'precio_venta' => 3.00,
        ]);

    }
}
