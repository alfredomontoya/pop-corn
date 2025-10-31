<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('movimientos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('caja_id');
            $table->unsignedBigInteger('cliente_id')->nullable();
            $table->nullableMorphs('referencia'); // referencia_id y referencia_type
            // $table->unsignedBigInteger('nro')->unique();
            $table->text('descripcion')->nullable();
            $table->decimal('monto', 14, 2)->default(0);
            $table->enum('tipo', ['INGRESO', 'EGRESO']); // diferencia entre ingresos y egresos
            $table->dateTime('fecha')->default(now());
            $table->timestamps();

            // Foreign keys
            $table->foreign('caja_id')->references('id')->on('cajas');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down(): void {
        Schema::dropIfExists('movimientos');
    }
};
