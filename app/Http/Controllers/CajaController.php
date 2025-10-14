<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use App\Models\MovimientoCaja;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CajaController extends Controller
{
    /**
     * 📋 Listar todas las cajas
     */
    public function index(Request $request)
{
    $cajas = Caja::with('user')
        ->latest('fecha_apertura')
        ->paginate(10)
        ->through(function ($caja) {
            return [
                'id' => $caja->id,
                'user_id' => $caja->user_id,
                'saldo_inicial' => (float) $caja->saldo_inicial,
                'total_ingresos' => (float) $caja->total_ingresos,
                'total_egresos' => (float) $caja->total_egresos,
                'saldo_final' => $caja->saldo_final !== null ? (float) $caja->saldo_final : null,
                'estado' => $caja->estado,
                'fecha_apertura' => $caja->fecha_apertura,
                'fecha_cierre' => $caja->fecha_cierre,
                'observacion' => $caja->observacion,
                'user' => $caja->user,
                'created_at' => $caja->created_at,
                'updated_at' => $caja->updated_at,
            ];
        });

    // 🧠 Si la solicitud viene de Axios o API (no de Inertia)
    if ($request->expectsJson() || $request->wantsJson()) {
        return response()->json($cajas);
    }

    // 🪶 Si la solicitud viene desde Inertia (navegación web)
    return Inertia::render('Cajas/Index', [
        'cajas' => $cajas,
    ]);
}

    /**
     * 🟢 Abrir una nueva caja
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'saldo_inicial' => 'required|numeric|min:0',
                'observacion' => 'required|string|max:255',
            ]);

            // Verificar si el usuario ya tiene una caja abierta
            $cajaAbierta = Caja::where('user_id', Auth::id())
                ->where('estado', 'ABIERTA')
                ->first();

            if ($cajaAbierta) {
                return response()->json([
                    'message' => 'Ya tienes una caja abierta.',
                ], 422);
            }

            $caja = Caja::create([
                'user_id' => Auth::id(),
                'fecha_apertura' => now(),
                'saldo_inicial' => $validated['saldo_inicial'],
                'total_ingresos' => 0,
                'total_egresos' => 0,
                'estado' => 'ABIERTA',
                'observacion' => $validated['observacion'] ?? null,
            ]);

            return response()->json([
                'message' => 'Caja abierta correctamente.',
                'caja' => $caja
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error inesperado.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * 📄 Mostrar detalles de una caja (movimientos)
     */
    public function show(Caja $caja)
    {
        $caja->load(['user', 'movimientos.user']);

        return Inertia::render('Cajas/Show', [
            'caja' => $caja,
        ]);
    }

    /**
     * 🔴 Cerrar caja
     */
    public function cerrar(Request $request, Caja $caja)
    {
        if ($caja->estado === 'CERRADA') {
            return response()->json([
                'success' => false,
                'message' => 'Esta caja ya está cerrada.'
            ], 422);
        }

        try {
            DB::transaction(function () use ($caja) {
                // Recalcular total ingresos y egresos (suponiendo relaciones)
                $totalIngresos = $caja->movimientos()->where('tipo', 'INGRESO')->sum('monto');
                $totalEgresos = $caja->movimientos()->where('tipo', 'EGRESO')->sum('monto');

                $caja->update([
                    'total_ingresos' => $totalIngresos,
                    'total_egresos' => $totalEgresos,
                    'saldo_final' => $caja->saldo_inicial + $totalIngresos - $totalEgresos,
                    'estado' => 'CERRADA',
                    'fecha_cierre' => now(),
                ]);
            });

            return response()->json([
                'success' => true,
                'message' => 'Caja cerrada correctamente.',
                'caja' => $caja->fresh(), // Devuelve la caja actualizada
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cerrar la caja.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * 💵 Registrar un movimiento manual (opcional)
     */
    public function registrarMovimiento(Request $request, Caja $caja)
    {
        $request->validate([
            'tipo' => 'required|in:INGRESO,EGRESO',
            'monto' => 'required|numeric|min:0.01',
            'concepto' => 'required|string|max:255',
        ]);

        if ($caja->estado === 'CERRADA') {
            return back()->withErrors(['msg' => 'No se pueden registrar movimientos en una caja cerrada.']);
        }

        MovimientoCaja::create([
            'caja_id' => $caja->id,
            'user_id' => Auth::id(),
            'tipo' => $request->tipo,
            'monto' => $request->monto,
            'concepto' => $request->concepto,
            'referencia_id' => null,
            'referencia_type' => null,
        ]);

        return back()->with('success', 'Movimiento registrado correctamente.');
    }
}
