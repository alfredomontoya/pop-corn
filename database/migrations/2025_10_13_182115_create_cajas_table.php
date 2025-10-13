<?php

// database/migrations/2025_10_13_000000_create_cajas_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('cajas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->dateTime('fecha_apertura');
            $table->dateTime('fecha_cierre')->nullable();
            $table->decimal('saldo_inicial', 12, 2)->default(0);
            $table->decimal('total_ingresos', 12, 2)->default(0);
            $table->decimal('total_egresos', 12, 2)->default(0);
            $table->decimal('saldo_final', 12, 2)->nullable();
            $table->enum('estado', ['abierta', 'cerrada'])->default('abierta');
            $table->text('observacion')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('cajas');
    }
};
