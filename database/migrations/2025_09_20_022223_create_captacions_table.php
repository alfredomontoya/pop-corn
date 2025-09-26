<?php

// database/migrations/xxxx_xx_xx_create_captaciones_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('captaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('asesor_id'); // Usuario que registra
            $table->integer('nro'); // nro secuencial por asesor
            $table->string('lugar');
            $table->decimal('precio', 12, 2);
            $table->text('descripcion')->nullable();
            $table->timestamps();

            $table->foreign('asesor_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('captaciones');
    }
};
