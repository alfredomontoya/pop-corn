<?php

// app/Models/Captacion.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Captacion extends Model
{
    use HasFactory;

    protected $table = 'captaciones';

    protected $fillable = [
        'asesor_id',
        'nro',
        'lugar',
        'precio',
        'descripcion',
    ];

    public function asesor()
    {
        return $this->belongsTo(User::class, 'asesor_id');
    }
}
