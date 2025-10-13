<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovimientoCaja extends Model
{
    use HasFactory;

    protected $table = 'movimiento_caja';

    protected $fillable = [
        'caja_id',
        'user_id',
        'tipo',
        'monto',
        'concepto',
        'referencia_id',
        'referencia_type',
    ];

    public function caja() {
        return $this->belongsTo(Caja::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function referencia() {
        return $this->morphTo();
    }
}
