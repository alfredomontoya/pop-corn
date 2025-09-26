<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductoPrecioRequest;
use App\Models\Producto;
use App\Models\ProductoPrecio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductoPrecioController extends Controller
{
    //
    public function store(StoreProductoPrecioRequest $request)
    {
        // opcional: asignar el user_id automáticamente

        $data = $request->validated();
        $data['user_id'] = Auth::id();

        DB::beginTransaction();
        try {

            // Crear el nuevo precio, antes el observer se encargará de desactivar el precio anterior
            $productoPrecio = ProductoPrecio::create($data);

            $productoPrecios = ProductoPrecio::where('producto_id', $data['producto_id'])
                ->orderBy('fecha_inicio', 'desc')
                ->get();

            DB::commit();

            return response()->json([
                'message' => 'Precio registrado correctamente.',
                'precio' => $productoPrecio,
                'productoPrecios' => $productoPrecios,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al registrar el precio.',
                'error' => $e->getMessage()
            ], 500);
        }

    }
}
