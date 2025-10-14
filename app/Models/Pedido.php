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
        'estado_pedido_id',
        'fecha',
        'total',
        'observacion',
        'estado',
    ];

    public function cliente() {
        return $this->belongsTo(Cliente::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function estadoPedido() {
        return $this->belongsTo(EstadoPedido::class);
    }

    public function detalles() {
        return $this->hasMany(DetallePedido::class);
    }

    public function movimientosCaja() {
        return $this->morphMany(MovimientoCaja::class, 'referencia');
    }

    /**
     * Marca el pedido como preparado
     */
    public function preparar(): bool
    {
        $estado = EstadoPedido::where('estado', 'PREPARADO')->firstOrFail();
        $this->estado_pedido_id = $estado->id;
        return $this->save();
    }

    /**
     * Marca el pedido como entregado
     */
    public function entregar(): bool
    {
        $estado = EstadoPedido::where('estado', 'ENTREGADO')->firstOrFail();
        $this->estado_pedido_id = $estado->id;
        return $this->save();
    }

    /**
     * Marca el pedido como pagado
     */
    public function pagar(): bool
    {
        $estado = EstadoPedido::where('estado', 'PAGADO')->firstOrFail();
        $this->estado_pedido_id = $estado->id;
        return $this->save();
    }
}
