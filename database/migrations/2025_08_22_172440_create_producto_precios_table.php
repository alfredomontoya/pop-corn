<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('producto_precios', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('producto_id');
      $table->decimal('precio_venta', 10, 2);
      $table->decimal('precio_compra', 10, 2)->nullable();
      $table->boolean('activo')->default(true);
      $table->timestamp('fecha_inicio')->nullable();
      $table->timestamp('fecha_fin')->nullable();
      $table->unsignedBigInteger('user_id'); // quien creó/modificó
      $table->timestamps();

      $table->foreign('producto_id')->references('id')->on('productos')->onDelete('cascade');
      $table->foreign('user_id')->references('id')->on('users');
    });
  }

  public function down(): void {
    Schema::dropIfExists('producto_precios');
  }
};
