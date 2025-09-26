<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductoPrecioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'producto_id'   => 'required|exists:productos,id',
            'precio_venta'  => 'required|numeric|min:0',
            'precio_compra' => 'required|numeric|min:0',
            'activo'        => 'boolean',
            'fecha_inicio'  => 'required|date',
            'fecha_fin'     => 'nullable|date|after_or_equal:fecha_inicio',
            'user_id'       => 'required|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'producto_id.required' => 'El producto es obligatorio.',
            'producto_id.exists'   => 'El producto seleccionado no existe.',
            'precio_venta.required'=> 'El precio de venta es obligatorio.',
            'precio_compra.required'=> 'El precio de compra es obligatorio.',
            'activo.boolean'       => 'El campo activo debe ser verdadero o falso.',
            'fecha_inicio.required'=> 'Debe indicar la fecha de inicio.',
            'fecha_fin.after_or_equal' => 'La fecha de fin debe ser posterior o igual a la fecha de inicio.',
            'user_id.exists'       => 'El usuario asignado no existe.',
        ];
    }
}
