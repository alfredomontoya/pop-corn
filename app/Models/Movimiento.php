<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'caja_id',
        'referencia_id',
        'referencia_type',
        'nro',
        'descripcion',
        'monto',
        'tipo',
        'fecha',
    ];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($movimiento) {
            $ultimo = Movimiento::max('nro') ?? 0;
            $movimiento->nro = $ultimo + 1; // autoincremental desde 1
        });
    }

    static public function getSiguienteNroAttribute()
    {
        $ultimo = Movimiento::max('nro') ?? 0;
        return $ultimo + 1;
    }

    public function caja()
    {
        return $this->belongsTo(Caja::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
