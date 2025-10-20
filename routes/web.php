<?php

use App\Http\Controllers\CajaController;
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
    // return Inertia::render('welcome');
    return Inertia::render('auth/login');
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

    Route::prefix('pedidos')->middleware('auth')->group(function () {

        // Listar pedidos → solo admin y producción
        Route::get('/', [PedidoController::class, 'index'])
            ->middleware('role:admin,user,promotor,produccion,entrega')
            ->name('pedidos.index');

        // Crear pedido → admin y promotor
        Route::get('/create', [PedidoController::class, 'create'])
            ->middleware('role:admin,promotor')
            ->name('pedidos.create');

        Route::post('/store', [PedidoController::class, 'store'])
            ->middleware('role:admin,promotor')
            ->name('pedidos.store');

        // Ver pedido → admin, user y entrega
        Route::get('/{pedido}', [PedidoController::class, 'show'])
            ->middleware('role:admin,user,promotor,produccion,entrega')
            ->name('pedidos.show');

        // Editar pedido → admin y producción
        Route::get('/{pedido}/edit', [PedidoController::class, 'edit'])
            ->middleware('role:admin,promotor')
            ->name('pedidos.edit');

        Route::put('/update/{pedido}', [PedidoController::class, 'update'])
            ->middleware('role:admin,promotor')
            ->name('pedidos.update');

        // Eliminar pedido → solo admin
        Route::delete('/{pedido}', [PedidoController::class, 'destroy'])
            ->middleware('role:admin')
            ->name('pedidos.destroy');

        // Preparar pedido → Produccion
        Route::put('/{id}/preparar', [PedidoController::class, 'preparar'])
            ->middleware('role:admin,produccion')
            ->name('pedidos.procesar');

        // Entregar pedido → Produccion
        Route::put('/{id}/entregar', [PedidoController::class, 'entregar'])
            ->middleware('role:admin,entrega')
            ->name('pedidos.entregar');

        // Pagar pedido → Produccion
        Route::put('/{id}/pagar', [PedidoController::class, 'pagar'])
            ->middleware('role:admin,entrega')
            ->name('pedidos.pagar');
    });

    Route::resource('captaciones', CaptacionController::class);

     // 📋 Listar cajas
    Route::get('/cajas', [CajaController::class, 'index'])->name('cajas.index');

    // 🟢 Abrir nueva caja
    Route::post('/cajas', [CajaController::class, 'store'])->name('cajas.store');

    // 📄 Ver detalles de una caja (con movimientos)
    Route::get('/cajas/{caja}', [CajaController::class, 'show'])->name('cajas.show');

    // 🔴 Cerrar caja
    Route::post('/cajas/{caja}/cerrar', [CajaController::class, 'cerrar'])->name('cajas.cerrar');

    // 💵 Registrar movimiento manual en caja
    Route::post('/cajas/{caja}/movimiento', [CajaController::class, 'registrarMovimiento'])->name('cajas.movimiento');

    // 🟡 Actualizar caja (opcional)
    Route::put('/cajas/{caja}', [CajaController::class, 'update'])->name('cajas.update');

    // ❌ Eliminar caja (opcional)
    Route::delete('/cajas/{caja}', [CajaController::class, 'destroy'])->name('cajas.destroy');


    Route::prefix('cajas')->name('cajas.')->group(function () {
    Route::get('/', [CajaController::class, 'index'])->name('index');

    // Exportar PDF
    Route::get('/export/pdf', [CajaController::class, 'exportPdf'])->name('export.pdf');

    // Exportar Excel
    Route::get('/export/excel', [CajaController::class, 'exportExcel'])->name('export.excel');
});


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
