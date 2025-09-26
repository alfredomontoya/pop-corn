<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cliente_id',
        'nro',
        'fecha',
        'nombre',
        'descripcion',
        'cantidad',
        'umedida',
        'precio',
        'total',
        'tipo',
    ];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($movimiento) {
            $ultimo = Movimiento::max('nro') ?? 0;
            $movimiento->nro = $ultimo + 1; // autoincremental desde 1
        });
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
