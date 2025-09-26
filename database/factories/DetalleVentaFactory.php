<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\DetalleVenta;
use App\Models\Venta;
use App\Models\Producto;
use App\Models\ProductoPrecio;

class DetalleVentaFactory extends Factory
{
    protected $model = DetalleVenta::class;

    public function definition(): array
    {
        $producto = Producto::all()->random();
        $precio = $producto->precioActivo; // se obtiene de la relacion con producto precio

        $cantidad = $this->faker->numberBetween(1, 5);
        $precioUnitario = $precio->precio_venta;
        $subtotal = $cantidad * $precioUnitario;

        return [
            'venta_id' => Venta::all('id')->random()->id ?? Venta::factory(),
            'producto_id' => $producto->id,
            'producto_precio_id' => $precio->id,
            'cantidad' => $cantidad,
            'precio_unitario' => $precioUnitario,
            'subtotal' => $subtotal,
        ];
    }
}
