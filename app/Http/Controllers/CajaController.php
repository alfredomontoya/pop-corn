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
    public function index()
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

        return Inertia::render('Cajas/Index', [
            'cajas' => $cajas
        ]);
    }

    /**
     * 🟢 Abrir una nueva caja
     */
    public function store(Request $request)
    {
        $request->validate([
            'saldo_inicial' => 'required|numeric|min:0',
            'observacion' => 'nullable|string|max:255',
        ]);

        // Verificar si el usuario ya tiene una caja abierta
        $cajaAbierta = Caja::where('user_id', Auth::id())
            ->where('estado', 'ABIERTA')
            ->first();

        if ($cajaAbierta) {
            return back()->withErrors(['msg' => 'Ya tienes una caja abierta.']);
        }

        Caja::create([
            'user_id' => Auth::id(),
            'fecha_apertura' => now(),
            'saldo_inicial' => $request->saldo_inicial,
            'total_ingresos' => 0,
            'total_egresos' => 0,
            'estado' => 'ABIERTA',
            'observacion' => $request->observacion,
        ]);

        return redirect()->route('cajas.index')->with('success', 'Caja abierta correctamente.');
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
            return back()->withErrors(['msg' => 'Esta caja ya está cerrada.']);
        }

        DB::transaction(function () use ($caja) {
            $caja->update([
                'fecha_cierre' => now(),
                'saldo_final' => $caja->saldo_inicial + $caja->total_ingresos - $caja->total_egresos,
                'estado' => 'CERRADA',
            ]);
        });

        return redirect()->route('cajas.index')->with('success', 'Caja cerrada correctamente.');
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
