<?php

// database/migrations/2025_10_13_000001_create_movimientos_caja_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('movimiento_caja', function (Blueprint $table) {
            $table->id();
            $table->foreignId('caja_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('tipo', ['INGRESO', 'EGRESO']);
            $table->decimal('monto', 12, 2);
            $table->string('concepto');
            $table->morphs('referencia'); // referencia_id y referencia_type
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('movimiento_caja');
    }
};
