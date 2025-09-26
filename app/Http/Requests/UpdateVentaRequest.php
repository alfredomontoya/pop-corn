<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVentaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tipo_pago_id' => ['required', 'exists:tipo_pagos,id'],
            'cliente_id' => ['nullable', 'exists:clientes,id'],
            'total' => ['required', 'numeric', 'min:0'],
            'efectivo' => ['nullable', 'numeric', 'min:0'],
            'cambio' => ['nullable', 'numeric', 'min:0'],
            'estado' => ['required', 'in:pendiente,completado,anulado'],
        ];
    }
}
