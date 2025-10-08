<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pedido\StorePedidoRequest;
use App\Http\Requests\Pedido\UpdatePedidoRequest;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoController extends Controller
{
    // Listar pedidos
    public function index()
    {
        try {
            $pedidos = Pedido::query()
                ->with(['cliente', 'user', 'detalles.producto'])
                ->when(request('search'), function ($query, $search) {
                    $query->where('id', 'like', "%{$search}%")
                        ->orWhere('observacion', 'like', "%{$search}%")
                        ->orWhereHas('cliente', fn($q) => $q->where('nombre_razon_social', 'like', "%{$search}%"));
                        // ->orWhereHas('observacion', fn($q) => $q->where('observacion', 'like', "%{$search}%"));
                })
                ->orderBy(
                    request('sort', 'id') ?? 'id',
                    request('direction', 'desc') ?? 'desc'
                )
                ->paginate(5);
            $pedidos_pendientes = Pedido::with(['detalles.producto', 'user'])->where('estado', 'pendiente')->get();
            $pedidos_preparados = Pedido::with(['detalles.producto'])->where('estado', 'preparado')->get();
            $pedidos_entregados = Pedido::with(['detalles.producto', 'user'])->where('estado', 'entregado')->get();

            $totales_pendientes = [
                'grandes' => $pedidos_pendientes->sum(fn($p) =>
                    $p->detalles->where('producto.nombre', 'Grande')->sum('cantidad')
                ),
                'medianos' => $pedidos_pendientes->sum(fn($p) =>
                    $p->detalles->where('producto.nombre', 'Mediano')->sum('cantidad')
                ),
                'pequenos' => $pedidos_pendientes->sum(fn($p) =>
                    $p->detalles->where('producto.nombre', 'Chico')->sum('cantidad')
                ),
                'total' => $pedidos_pendientes->sum(fn($p) =>
                    $p->detalles->sum('subtotal')
                ),
            ];

            $totales_preparados = [
                'grandes' => $pedidos_preparados->sum(fn($p) =>
                    $p->detalles->where('producto.nombre', 'Grande')->sum('cantidad')
                ),
                'medianos' => $pedidos_preparados->sum(fn($p) =>
                    $p->detalles->where('producto.nombre', 'Mediano')->sum('cantidad')
                ),
                'pequenos' => $pedidos_preparados->sum(fn($p) =>
                    $p->detalles->where('producto.nombre', 'Chico')->sum('cantidad')
                ),
                'total' => $pedidos_preparados->sum(fn($p) =>
                    $p->detalles->sum('subtotal')
                ),
            ];

            $totales_entregados = [
                'grandes' => $pedidos_entregados->sum(fn($p) =>
                    $p->detalles->where('producto.nombre', 'Grande')->sum('cantidad')
                ),
                'medianos' => $pedidos_entregados->sum(fn($p) =>
                    $p->detalles->where('producto.nombre', 'Mediano')->sum('cantidad')
                ),
                'pequenos' => $pedidos_entregados->sum(fn($p) =>
                    $p->detalles->where('producto.nombre', 'Chico')->sum('cantidad')
                ),
                'total' => $pedidos_entregados->sum(fn($p) =>
                    $p->detalles->sum('subtotal')
                ),
            ];
            // dd($totales);

            return Inertia::render('Pedidos/Index', [
                'pedidos' => $pedidos,
                'filters' => request()->only('search', 'sort', 'direction'),
                'totales' => [
                    'pendientes' => $totales_pendientes,
                    'preparados' => $totales_preparados,
                    'entregados' => $totales_entregados
                ],
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al cargar los pedidos',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function show($id)
    {
        $pedido = Pedido::with([
            'cliente',
            'user',
            'detalles.producto' // importante: cargar producto en cada detalle
        ])->findOrFail($id);

        return Inertia::render('Pedidos/Show', [
            'pedido' => $pedido
        ]);
    }

    public function create()
    {
        $productos = Producto::orderBy('id', 'desc')->with('precioActivo')->get();
        return Inertia::render('Pedidos/Create', [
            'productos' => $productos
        ]);
    }

    public function edit(Pedido $pedido)
    {
        $pedido->load('detalles.producto', 'cliente');

        $productos = Producto::orderBy('id', 'desc')->with('precioActivo')->get();
        return Inertia::render('Pedidos/Edit', [
            'pedido' => $pedido,
            'productos' => $productos
        ]);
    }

    // Crear pedido con transacción y manejo de errores
    public function store(StorePedidoRequest $request): JsonResponse
    {
        // dd($request->all());
        try {
            $pedido = DB::transaction(function () use ($request) {
                $pedido = Pedido::create($request->validated());


                foreach ($request->detalles as $detalle) {
                    $pedido->detalles()->create($detalle);
                }

                // return $pedido;
            });

            return response()->json([
                'message' => 'Pedido creado correctamente',
                'pedido' => $pedido,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al crear el pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Actualizar pedido con transacción y manejo de errores
    public function update(UpdatePedidoRequest $request, Pedido $pedido): JsonResponse
    {

        try {
            DB::transaction(function () use ($request, $pedido) {
                $pedido->update($request->validated());

                // Actualizamos detalles: eliminamos y recreamos
                $pedido->detalles()->delete();
                foreach ($request->detalles as $detalle) {
                    $pedido->detalles()->create($detalle);
                }
            });

            return response()->json([
                'message' => 'Pedido actualizado correctamente',
                'pedido' => $pedido->load('detalles')
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function preparar($id) {
        // dd($request->all());
        $estado = 'preparado';
        try {
            //code...
            $pedido = Pedido::find($id);
            $pedido->estado = $estado;
            $pedido->save();

            return response()->json([
                'message' => 'Pedido procesado correctamente',
                'estado' => $estado
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al procesar pedido',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function entregar($id) {
        // dd($request->all());
        $estado = 'entregado';
        try {
            //code...
            $pedido = Pedido::find($id);
            $pedido->estado = $estado;
            $pedido->save();

            return response()->json([
                'message' => 'Pedido entregado correctamente',
                'estado' => $estado
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al entregar pedido',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function pagar($id) {
        // dd($request->all());
        $estado = 'pagado';
        try {
            //code...
            $pedido = Pedido::find($id);
            $pedido->estado = $estado;
            $pedido->save();

            return response()->json([
                'message' => 'Pedido pagado correctamente',
                'estado' => $estado
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al pagar pedido',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    // Eliminar pedido con manejo de errores
    public function destroy(Pedido $pedido): JsonResponse
    {
        try {
            $pedido->delete();
            return response()->json([
                'message' => 'Pedido eliminado correctamente'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
