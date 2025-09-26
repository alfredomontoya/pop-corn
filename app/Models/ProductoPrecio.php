<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoPrecio extends Model
{
  use HasFactory;

  protected $fillable = [
    'producto_id',
    'precio_venta',
    'precio_compra',
    'activo',
    'fecha_inicio',
    'fecha_fin',
    'user_id'
  ];

  // Producto al que pertenece
  public function producto()
  {
    return $this->belongsTo(Producto::class);
  }

  // Usuario que creó/modificó
  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
