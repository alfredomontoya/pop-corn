<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    protected $model = Cliente::class;

    public function definition()
    {
        $tipoDocumento = $this->faker->randomElement(['CI', 'NIT']);
        $tipo = $this->faker->randomElement(['NATURAL', 'JURIDICO']);
        $estado = $this->faker->randomElement(['activo', 'inactivo']);

        $ciNit = $tipoDocumento === 'CI'
            ? $this->faker->unique()->numerify('#########')  // ejemplo: 9 dígitos
            : $this->faker->unique()->numerify('##########'); // ejemplo: 10 dígitos para NIT

        // 📍 Centro de Santa Cruz de la Sierra (Plaza 24 de Septiembre aprox.)
        $centerLat = -17.7833;
        $centerLng = -63.1821;
        $radiusMeters = 20000; // 20 km

        $point = $this->randomPointNear($centerLat, $centerLng, $radiusMeters);

        $ubicacion = "{$point['lat']},{$point['lng']}";
        $ubicacion_url = "https://www.google.com/maps?q={$point['lat']},{$point['lng']}";

        return [
            'user_id' => User::all('id')->random(),
            'tipo_documento' => $tipoDocumento,
            'tipo' => $tipo,
            'numero_documento' => $this->faker->unique()->numerify('##########'),
            'nombre_razon_social' => $this->faker->company(),
            'propietario' => $this->faker->name(),
            'direccion' => $this->faker->address(),
            'ubicacion' => $ubicacion,
            'telefono' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'estado' => $estado,
            'notas' => $this->faker->optional()->sentence(),
        ];
    }

    protected function randomPointNear(float $centerLat, float $centerLng, int $radiusMeters): array
    {
        // Convert meters to degrees (aprox.)
        $radiusInDegrees = $radiusMeters / 111320.0;

        $u = $this->faker->randomFloat(8, 0, 1);
        $v = $this->faker->randomFloat(8, 0, 1);

        $w = $radiusInDegrees * sqrt($u);
        $t = 2 * M_PI * $v;
        $x = $w * cos($t);
        $y = $w * sin($t);

        // Corrección por longitud
        $newLat = $centerLat + $y;
        $newLng = $centerLng + $x / cos(deg2rad($centerLat));

        return ['lat' => round($newLat, 6), 'lng' => round($newLng, 6)];
    }
}
