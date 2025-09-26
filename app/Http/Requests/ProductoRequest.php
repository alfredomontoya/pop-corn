<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Cambia según tus políticas de autorización
    }

    public function rules(): array
    {
        return [
            'id' => 'nullable|exists:productos,id',
            'nombre' => 'required|string|max:255|unique:productos,nombre,' . $this->id,
            'descripcion' => 'nullable|string',
            'categoria_id' => 'required|exists:categorias,id',
            'codigo' => 'nullable|string|max:50',
            'stock_actual' => 'required|numeric|min:0',
            'stock_minimo' => 'required|numeric|min:0',
            'unidad_medida' => 'required|string|max:20',
            'activo' => 'required|boolean',
            'imagenes.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'precio_venta' => 'nullable|numeric|min:0',
            'precio_compra' => 'nullable|numeric|min:0',
        ];
    }
}
