<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tipo_pago_id')->constrained('tipo_pagos');
            $table->foreignId('cliente_id')->constrained('clientes');
            $table->decimal('total', 12, 2);
            $table->decimal('efectivo', 12, 2)->nullable();
            $table->decimal('cambio', 12, 2)->nullable();
            $table->enum('estado', ['pendiente', 'cancelado'])->default('pendiente');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};
