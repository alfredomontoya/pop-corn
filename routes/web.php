<?php

use App\Http\Controllers\CaptacionController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProductoImagenController;
use App\Http\Controllers\ProductoPrecioController;
use App\Http\Controllers\MovimientoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\VentaController;
use App\Http\Middleware\SetUserId;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', SetUserId::class])->group(function () {
    Route::get('/clientes/search', [ClienteController::class, 'search']);  // Buscar clientes (opcional)
    Route::resource('clientes', ClienteController::class);
    Route::resource('categorias', CategoriaController::class);
    Route::get('productos/createOrUpdate/{id}', [ProductoController::class, 'createOrUpdate'])->name('productos.createOrUpdate');
    Route::post('productos/{id}/storeImages', [ProductoController::class, 'storeImages'])->name('productos.storeImages');
    Route::resource('productos', ProductoController::class);

    Route::patch('productoimagenes/{id}/setPrincipal', [ProductoImagenController::class, 'setPrincipal'])->name('productoimagenes.setPrincipal');
    Route::resource('productoimagenes', ProductoImagenController::class);

    Route::post('producto-precios', [ProductoPrecioController::class, 'store'])->name('producto-precios.store');

    Route::resource('ventas', VentaController::class);
    Route::resource('movimientos', MovimientoController::class);

    Route::prefix('pedidos')->group(function () {
        Route::get('/', [PedidoController::class, 'index'])->name('pedidos.index');            // Listar pedidos

        Route::get('/create', [PedidoController::class, 'create'])->name('pedidos.create');     // Formulario para crear pedido
        Route::get('/{pedido}/edit', [PedidoController::class, 'edit'])->name('pedidos.edit');   // Formulario para editar pedido
        Route::post('/store', [PedidoController::class, 'store'])->name('pedidos.store');      // Crear pedido
        Route::get('/{pedido}', [PedidoController::class, 'show'])->name('pedidos.show');     // Ver un pedido (opcional)
        Route::put('/update/{pedido}', [PedidoController::class, 'update'])->name('pedidos.update'); // Actualizar pedido
        Route::delete('/{pedido}', [PedidoController::class, 'destroy'])->name('pedidos.destroy');    // Eliminar pedido
    });

    Route::resource('captaciones', CaptacionController::class);


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
