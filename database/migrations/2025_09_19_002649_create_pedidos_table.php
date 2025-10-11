<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cliente_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('estado_pedido_id')->references('id')->on('estado_pedidos')->constrained()->default(1);
            $table->date('fecha');
            $table->decimal('total', 10, 2)->default(0);
            $table->text('observacion')->nullable();
            $table->enum('estado', ['activo', 'anulado'])->default('activo');
            $table->timestamps();

            $table->foreign('cliente_id')->references('id')->on('clientes')->nullOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('pedidos');
    }
};
