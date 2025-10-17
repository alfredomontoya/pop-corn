<?php

namespace Database\Seeders;

use App\Models\Captacion;
use App\Models\Categoria;
use App\Models\Producto;
use App\Models\ProductoImagen;
use App\Models\ProductoPrecio;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->truncateTables([
            'users',
            'clientes',
            'categorias',
            'productos',
            'producto_imagens',
            'producto_precios',
            'tipo_pagos',
            'cajas',
            'ventas',
            'detalle_ventas',
            'movimientos',
            'estado_pedidos',
            'pedidos',
            'detalle_pedidos',
        ]);



        $this->call([
            UserSeeder::class,
            ClienteSeeder::class,
            CategoriaSeeder::class,
            ProductoSeeder::class,
            CajaSeeder::class,
            // // ProductoImagenSeeder::class,
            // // ProductoPrecioSeeder::class,
            // TipoPagoSeeder::class,
            // VentaSeeder::class,
            // DetalleVentaSeeder::class,
            EstadoPedidoSeeder::class,
            PedidoSeeder::class,
            // MovimientoSeeder::class,
            // CaptacionSeeder::class,
        ]);
    }

    protected function truncateTables(array $tables){
        DB::Statement('SET FOREIGN_KEY_CHECKS = 0;');
        foreach($tables as $table){
            DB::table($table)->truncate();
        }
        DB::Statement('SET FOREIGN_KEY_CHECKS = 1;');
    }
}
