<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('productos', function (Blueprint $table) {
      $table->id();
      $table->string('nombre');
      $table->text('descripcion')->nullable();
      $table->unsignedBigInteger('categoria_id');
      $table->string('codigo')->nullable();
      $table->integer('stock_actual')->default(0);
      $table->integer('stock_minimo')->default(0);
      $table->string('unidad_medida')->nullable();
      $table->boolean('activo')->default(true);
      $table->unsignedBigInteger('user_id'); // creador
      $table->unsignedBigInteger('updated_by')->nullable(); // último editor
      $table->timestamps();

      $table->foreign('categoria_id')->references('id')->on('categorias')->onDelete('cascade');
      $table->foreign('user_id')->references('id')->on('users');
      $table->foreign('updated_by')->references('id')->on('users');
    });
  }

  public function down(): void {
    Schema::dropIfExists('productos');
  }
};
