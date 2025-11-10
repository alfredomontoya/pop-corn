<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovimientoRequest;
use App\Models\Caja;
use App\Models\Movimiento;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MovimientoController extends Controller
{
    public function index(Request $request)
    {
        $query = Movimiento::with(['cliente'])->orderBy('id', 'desc');

        // 🔹 Filtrar por fecha si vienen parámetros
        if ($request->filled('fechaInicio')) {
            $query->whereDate('fecha', '>=', $request->fechaInicio);
        }

        if ($request->filled('fechaFin')) {
            $query->whereDate('fecha', '<=', $request->fechaFin);
        }

        $movimientos = $query->paginate(10);

        // 🔹 Calcular totales según el filtro
        $totalIngresos = Movimiento::where('tipo', 'ingreso')
            ->when($request->filled('fechaInicio'), fn($q) => $q->whereDate('fecha', '>=', $request->fechaInicio))
            ->when($request->filled('fechaFin'), fn($q) => $q->whereDate('fecha', '<=', $request->fechaFin))
            ->sum('monto');

        $totalEgresos = Movimiento::where('tipo', 'egreso')
            ->when($request->filled('fechaInicio'), fn($q) => $q->whereDate('fecha', '>=', $request->fechaInicio))
            ->when($request->filled('fechaFin'), fn($q) => $q->whereDate('fecha', '<=', $request->fechaFin))
            ->sum('monto');

        $saldo = $totalIngresos - $totalEgresos;

        return Inertia::render('Movimientos/Index', [
            'movimientos'   => $movimientos,
            'totalIngresos' => $totalIngresos,
            'totalEgresos'  => $totalEgresos,
            'saldo'         => $saldo,
        ]);
    }


    public function create(Request $request)
    {
        $clientes = Cliente::all();
        $cajaAbierta = Caja::cajaAbierta(Auth::id());
        // DD($cajaAbierta);
        return Inertia::render('Movimientos/Create', [
            'tipo' => $request->query('tipo', 'ingreso'),
            'clientes' => $clientes,
            'caja' => $cajaAbierta
        ]);
    }

    public function store(MovimientoRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();

        Movimiento::create($validated);

        return redirect()->route('movimientos.index')
            ->with('success', 'Movimiento creado con éxito.');
    }

    public function edit(Movimiento $movimiento)
    {
        $clientes = Cliente::all();
        $cajaAbierta = Caja::cajaAbierta(Auth::id());
        return Inertia::render('Movimientos/Edit', [
            'movimiento' => $movimiento,
            'clientes' => $clientes,
            'caja' => $cajaAbierta
        ]);
    }

    public function update(MovimientoRequest $request, Movimiento $movimiento)
    {
        $validated = $request->validated();
        $movimiento->update($validated);

        return redirect()->route('movimientos.index')->with('success', 'Movimiento actualizado');
    }

    public function destroy(Movimiento $movimiento)
    {
        $movimiento->delete();
        return redirect()->route('movimientos.index')->with('success', 'Movimiento eliminado');
    }
}
