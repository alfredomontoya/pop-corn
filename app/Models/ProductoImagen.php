<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoImagen extends Model
{
  use HasFactory;

  protected $fillable = [
    'producto_id',
    'imagen',
    'es_principal',
    'user_id'
  ];

  // Producto al que pertenece
  public function producto()
  {
    return $this->belongsTo(Producto::class);
  }

  // Usuario que subió la imagen
  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
