<?php

namespace App\Http\Requests\Pedido;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePedidoRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'estado' => ['required','in:pendiente,confirmado,cancelado,entregado'],
            'observacion' => ['nullable','string'],
        ];
    }

    public function messages(): array {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'in' => 'El campo :attribute tiene un valor no permitido.',
            'string' => 'El campo :attribute debe ser un texto válido.',
        ];
    }

    public function attributes(): array {
        return [
            'estado' => 'estado del pedido',
            'observacion' => 'observación',
        ];
    }
}
