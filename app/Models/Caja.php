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

    // 🔹 Accessors calculados sin sobrescribir columnas
    protected $appends = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function movimientos() {
        return $this->hasMany(MovimientoCaja::class);
    }

    public function ventas() {
        return $this->hasMany(Venta::class);
    }

    public function getIngresosCalculadosAttribute()
    {
        if ($this->relationLoaded('movimientos')) {
            return $this->movimientos->where('tipo', 'INGRESO')->sum('monto');
        }

        return $this->movimientos()->where('tipo', 'INGRESO')->sum('monto');
    }

    public function getEgresosCalculadosAttribute()
    {
        if ($this->relationLoaded('movimientos')) {
            return $this->movimientos->where('tipo', 'EGRESO')->sum('monto');
        }

        return $this->movimientos()->where('tipo', 'EGRESO')->sum('monto');
    }

    public function getSaldoFinalCalculadoAttribute()
    {
        return ($this->saldo_inicial ?? 0)
            + $this->ingresos_calculados
            - $this->egresos_calculados;
    }
}
