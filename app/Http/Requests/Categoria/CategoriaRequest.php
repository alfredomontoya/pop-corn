<?php

namespace App\Http\Requests\Categoria;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Categoria;

class CategoriaRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado a hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true; // Cambiar según tu lógica de autorización
    }

    /**
     * Reglas de validación.
     */
    public function rules(): array
    {
        $categoria = $this->categoria;

        // dd($categoria->nombre);

        return [
            'nombre' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categorias', 'nombre')->ignore($categoria ? $categoria->id:  null),
            ],
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|max:2048', // 2MB máximo
        ];
    }

    /**
     * Mensajes personalizados de validación.
     */
    public function messages(): array
    {
        return [
            'nombre.required' => 'El campo :attribute es obligatorio.',
            'nombre.unique' => 'Ya existe otra :attribute con este valor.',
            'nombre.max' => 'El :attribute no puede superar los :max caracteres.',
            'descripcion.string' => 'La :attribute debe ser texto.',
            'imagen.image' => 'El archivo de la :attribute debe ser una imagen.',
            'imagen.max' => 'La :attribute no puede superar los :max KB.',
        ];
    }

    /**
     * Nombres personalizados de los atributos.
     */
    public function attributes(): array
    {
        return [
            'nombre' => 'nombre de la categoría',
            'descripcion' => 'descripción',
            'imagen' => 'imagen',
        ];
    }
}
