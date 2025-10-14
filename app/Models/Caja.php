<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caja extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fecha_apertura',
        'fecha_cierre',
        'saldo_inicial',
        'total_ingresos',
        'total_egresos',
        'saldo_final',
        'observacion',
        'estado',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function movimientos() {
        return $this->hasMany(MovimientoCaja::class);
    }

    public function ventas() {
        return $this->hasMany(Venta::class);
    }
}
