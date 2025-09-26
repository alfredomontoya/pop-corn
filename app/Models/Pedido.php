<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'user_id',
        'nro',
        'fecha',
        'estado',
        'total',
        'observacion',
    ];

    public function cliente() {
        return $this->belongsTo(Cliente::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function detalles() {
        return $this->hasMany(DetallePedido::class);
    }
}
