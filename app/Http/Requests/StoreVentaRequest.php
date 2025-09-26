<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVentaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // aquí podrías validar roles/permisos
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'tipo_pago_id' => ['required', 'exists:tipo_pagos,id'],
            'cliente_id' => ['required', 'exists:clientes,id'],
            'total' => ['required', 'numeric', 'min:0'],
            'efectivo' => ['nullable', 'numeric', 'min:0'],
            'cambio' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}
