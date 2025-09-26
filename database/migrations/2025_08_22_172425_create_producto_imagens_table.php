<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('producto_imagens', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('producto_id');
      $table->string('imagen')->nullable();
      $table->boolean('es_principal')->default(false);
      $table->unsignedBigInteger('user_id'); // quien subió la imagen
      $table->timestamps();

      $table->foreign('producto_id')->references('id')->on('productos')->onDelete('cascade');
      $table->foreign('user_id')->references('id')->on('users');
    });
  }

  public function down(): void {
    Schema::dropIfExists('producto_imagens');
  }
};
