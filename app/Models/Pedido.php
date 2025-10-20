<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

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
    public function pagar($caja_id): bool
    {
        try {
            return DB::transaction(function () use ($caja_id) {
                $estado = EstadoPedido::where('estado', 'PAGADO')->firstOrFail();

                // Evita pagos duplicados
                if ($this->estadoPedido?->estado === 'PAGADO') {
                    throw new \Exception('El pedido ya está pagado.');
                }

                $this->estado_pedido_id = $estado->id;

                Movimiento::create([
                    'user_id' => $this->user_id,
                    'caja_id' => $caja_id,
                    'tipo' => 'INGRESO',
                    'referencia_id' => $this->id,
                    'referencia_type' => self::class,
                    'descripcion' => 'Pago de pedido Nro. ' . $this->id,
                    'monto' => $this->total,
                    // 'fecha' => now(),
                    'fecha' => Util::randomDateInRange('2025-10-01', '2025-10-31'), // PARA TESTING
                ]);

                return $this->save();
            });
        } catch (Throwable $e) {
            // Rollback automático ya ocurrió
            Log::error('Error al pagar pedido: ' . $e->getMessage());
            echo 'Error al pagar pedido: ' . $e->getMessage();
            return false;
        }
    }
}
