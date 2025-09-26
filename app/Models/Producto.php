<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
  use HasFactory;

  protected $fillable = [
    'nombre',
    'descripcion',
    'categoria_id',
    'codigo',
    'stock_actual',
    'stock_minimo',
    'unidad_medida',
    'activo',
    'user_id',
    'updated_by'
  ];

  // Relación con imágenes
  public function imagenes()
  {
    return $this->hasMany(ProductoImagen::class);
  }

  // Imagen principal
  public function imagenPrincipal()
  {
    return $this->hasOne(ProductoImagen::class)->where('es_principal', true);
  }

  // Relación con precios
  public function precios()
  {
    return $this->hasMany(ProductoPrecio::class);
  }

  // Precio activo
  public function precioActivo()
  {
    return $this->hasOne(ProductoPrecio::class)->where('activo', true);
  }

  // Usuario creador
  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  // Usuario que actualizó
  public function updatedBy()
  {
    return $this->belongsTo(User::class, 'updated_by');
  }

  // Relación con categoría
  public function categoria()
  {
    return $this->belongsTo(Categoria::class);
  }
}
