<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('movimientos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nro')->unique();
            $table->date('fecha');
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->integer('cantidad')->default(1);
            $table->string('umedida')->nullable();
            $table->decimal('precio', 12, 2)->default(0);
            $table->decimal('total', 14, 2)->default(0);
            $table->enum('tipo', ['ingreso', 'egreso']); // diferencia entre ingresos y egresos
            $table->unsignedBigInteger('cliente_id')->nullable(); // relación con clientes
            $table->unsignedBigInteger('user_id'); // relación con usuarios
            $table->timestamps();

            // Foreign keys
            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('movimientos');
    }
};
