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

        return [
            'user_id' => User::all('id')->random(),
            'tipo_documento' => $tipoDocumento,
            'tipo' => $tipo,
            'numero_documento' => $this->faker->unique()->numerify('##########'),
            'nombre_razon_social' => $this->faker->company(),
            'propietario' => $this->faker->name(),
            'direccion' => $this->faker->address(),
            'telefono' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'estado' => $estado,
            'notas' => $this->faker->optional()->sentence(),
        ];
    }
}
