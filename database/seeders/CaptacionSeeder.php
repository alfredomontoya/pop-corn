<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Captacion;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CaptacionSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            [
                'asesor' => 'Saul Perez',
                'lugar' => 'calle Tarija a una cuadra de la av Irala',
                'precio' => '12000',
                'descripcion' => 'Casa en alquiler. Sala amplia, suite, 2 dormitorios, 2 salas de estar, cocina comedor, dependencia de empleada, lavandería, garaje 1 vehículo, patio trasero.',
            ],
            [
                'asesor' => 'Lena Perez',
                'lugar' => 'Edificio INFINITY by ELITE Sirari Equipetrol',
                'precio' => '3700',
                'descripcion' => 'Departamento amoblado en alquiler. 1 dormitorio con cama 2 plazas, mesas de luz, cómoda, TV, aire acondicionado, ropero empotrado, heladera, extractor, comedor diario, vajilla, área de lavado, amplio balcón.',
            ],
            [
                'asesor' => 'Silvia Ricaldez',
                'lugar' => 'Zona Sur – Entre 5to y 6to anillo',
                'precio' => '1015000',
                'descripcion' => 'Casa en venta zona sur. Dpto1: 3 habitaciones, baño, sala, cocina amoblada, área de lavado. Dpto2: sala comedor, cocina amoblada, 2 habitaciones, amplio patio, gas domiciliario.',
            ],
            [
                'asesor' => 'Silvia Ricaldez',
                'lugar' => 'Zona Norte – Av. Banzer entre 5to y 6to anillo',
                'precio' => '210000',
                'descripcion' => 'Casa en venta. 3 dormitorios (1 en suite), living comedor, cocina, baño compartido, patio trasero y delantero, churrasquera techada, garaje 2 vehículos, lavandería techada.',
            ],
            [
                'asesor' => 'Silvia Ricaldez',
                'lugar' => 'Av. Grigotá 5to anillo',
                'precio' => '63000',
                'descripcion' => 'Departamento en venta. 2 dormitorios, baño, sala comedor, cocina, lavandería y garaje.',
            ],
            [
                'asesor' => 'Yesica Cortez',
                'lugar' => 'Zona Radial 10 4to anillo',
                'precio' => '95000',
                'descripcion' => 'Casa en venta. 3 dormitorios, baño, living comedor, cocina, garaje para 1 vehículo, patio.',
            ],
            [
                'asesor' => 'Yesica Cortez',
                'lugar' => 'Zona Av. Virgen de Luján 6to anillo',
                'precio' => '135000',
                'descripcion' => 'Casa en venta. 3 dormitorios, sala comedor, cocina amoblada, 3 baños, patio trasero, garaje 2 vehículos.',
            ],
            [
                'asesor' => 'Yesica Cortez',
                'lugar' => 'Av. Paurito 5to anillo',
                'precio' => '75000',
                'descripcion' => 'Terreno en venta de 300 m² con todos los servicios básicos.',
            ],
            [
                'asesor' => 'Yesica Cortez',
                'lugar' => 'Carretera al Norte Km 12',
                'precio' => '18000',
                'descripcion' => 'Terreno en venta de 360 m².',
            ],
            [
                'asesor' => 'Yesica Cortez',
                'lugar' => 'Zona Los Lotes 7mo anillo',
                'precio' => '23000',
                'descripcion' => 'Terreno en venta de 250 m².',
            ],
            [
                'asesor' => 'Yesica Cortez',
                'lugar' => 'Zona La Guardia',
                'precio' => '30000',
                'descripcion' => 'Terreno en venta de 500 m².',
            ],
            [
                'asesor' => 'Yesica Cortez',
                'lugar' => 'Carretera a Cotoca 5to anillo',
                'precio' => '28000',
                'descripcion' => 'Terreno en venta de 400 m².',
            ],
            [
                'asesor' => 'Yesica Cortez',
                'lugar' => 'Zona Radial 13',
                'precio' => '20000',
                'descripcion' => 'Terreno en venta de 300 m².',
            ],
        ];

        $usuarios = [];

        User::factory()->create([
            'name' => 'Gabriel Vaca Chavez',
            'email' => 'gabriel.vaca@gmail.com',
        ]);

        foreach ($rows as $row) {
            $slug = Str::slug($row['asesor'], '.');
            $email = $slug . '@example.com';

            if (!isset($usuarios[$row['asesor']])) {
                $user = User::firstOrCreate(
                    ['email' => $email],
                    [
                        'name' => $row['asesor'],
                        'password' => Hash::make('password123'),
                    ]
                );
                $usuarios[$row['asesor']] = $user->id;
            }

            $asesorId = $usuarios[$row['asesor']];
            $maxNro = Captacion::where('asesor_id', $asesorId)->max('nro') ?? 0;
            $nro = $maxNro + 1;

            Captacion::create([
                'asesor_id' => $asesorId,
                'nro' => $nro,
                'lugar' => $row['lugar'],
                'precio' => $row['precio'],
                'descripcion' => $row['descripcion'],
            ]);
        }
    }
}
