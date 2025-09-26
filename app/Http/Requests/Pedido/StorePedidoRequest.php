<?php

namespace App\Http\Requests\Pedido;

use Illuminate\Foundation\Http\FormRequest;

class StorePedidoRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'cliente_id' => ['required','exists:clientes,id'],
            'user_id' => ['required','exists:users,id'],
            'fecha' => ['required','date'],
            'estado' => ['required','in:pendiente,confirmado,cancelado,entregado'],
            'observacion' => ['nullable','string'],
            'detalles' => ['required','array','min:1'],
            'detalles.*.producto_id' => ['required','exists:productos,id'],
            'detalles.*.cantidad' => ['required','integer','min:1'],
            'detalles.*.precio' => ['required','numeric','min:1'],
            'detalles.*.subtotal' => ['required','numeric','min:1'],
            'total' => ['required', 'numeric', 'min:1']
        ];
    }

    public function messages(): array {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'exists' => 'El campo :attribute seleccionado no es válido.',
            'date' => 'El campo :attribute debe tener un formato de fecha válido.',
            'array' => 'El campo :attribute debe ser un arreglo.',
            'min' => 'El valor del campo :attribute no puede ser menor que :min.',
            'integer' => 'El campo :attribute debe ser un número entero.',
            'numeric' => 'El campo :attribute debe ser un número válido.',
            'in' => 'El campo :attribute tiene un valor no permitido.',
        ];
    }

    public function attributes(): array {
        return [
            'cliente_id' => 'cliente',
            'user_id' => 'usuario',
            'fecha' => 'fecha del pedido',
            'estado' => 'estado del pedido',
            'detalles' => 'detalle del pedido',
            'detalles.*.producto_id' => 'producto',
            'detalles.*.cantidad' => 'cantidad',
            'detalles.*.precio' => 'precio',
            'detalles.*.subtotal' => 'subtotal',
            'total' => 'total'
        ];
    }
}
