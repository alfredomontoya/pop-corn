<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tipo_documento',
        'tipo',
        'numero_documento',
        'nombre_razon_social',
        'direccion',
        'ubicacion',
        'propietario',
        'telefono',
        'email',
        'estado',
        'notas',
    ];

    // Opcional: relación con usuario que registró
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
