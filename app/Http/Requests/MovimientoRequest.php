<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovimientoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Permitir para todos los usuarios autenticados
    }

    public function rules(): array
    {
        return [
            'caja_id' => 'required|exists:cajas,id',
            'cliente_id' => 'required|exists:clientes,id',
            'descripcion' => 'nullable|string|max:255',
            'monto' => 'required|numeric|min:1',
            'tipo' => 'required|in:INGRESO,EGRESO',
            'fecha' => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'caja_id.required' => 'Debe haber una caja abierta para registrar el movimiento.',
            'cliente_id.required' => 'Debe seleccionar un cliente.',
            'monto.min' => 'El monto debe ser mayor a 0.',
            'tipo.in' => 'El tipo debe ser INGRESO o EGRESO.',
            'fecha.required' => 'La fecha es obligatoria.',
        ];
    }
}
