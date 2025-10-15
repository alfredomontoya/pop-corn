<?php

namespace App\Http\Controllers;

use App\Models\Movimiento;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MovimientoController extends Controller
{
    public function index()
    {
        $movimientos = Movimiento::orderBy('id', 'desc')->paginate(10);

        $totalIngresos = Movimiento::where('tipo', 'ingreso')->sum('total');
        $totalEgresos  = Movimiento::where('tipo', 'egreso')->sum('total');
        $saldo         = $totalIngresos - $totalEgresos;

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
        return Inertia::render('Movimientos/Create', [
            'tipo' => $request->query('tipo', 'ingreso'),
            'clientes' => $clientes
        ]);
    }

   public function store(Request $request)
    {
        $validated = $request->validate([
            'fecha' => 'required|date',
            'nombre' => 'required|string|max:255',
            'cliente_id' => 'nullable|exists:clientes,id',
            'descripcion' => 'nullable|string',
            'cantidad' => 'required|integer|min:1',
            'umedida' => 'nullable|string|max:50',
            'precio' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'tipo' => 'required|in:ingreso,egreso',
        ]);

        $validated['user_id'] = Auth::id();

        Movimiento::create($validated);

        return redirect()->route('movimientos.index')->with('success', 'Movimiento creado con éxito.');
    }

    public function edit(Movimiento $movimiento)
    {
        return Inertia::render('Movimientos/Edit', [
            'movimiento' => $movimiento
        ]);
    }

    public function update(Request $request, Movimiento $movimiento)
    {
        $data = $request->validate([
            'nro' => 'required|unique:movimientos,nro,' . $movimiento->id,
            'fecha' => 'required|date',
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'cantidad' => 'required|integer|min:1',
            'precio' => 'required|numeric|min:0',
            'tipo' => 'required|in:ingreso,egreso',
        ]);

        $data['total'] = $data['cantidad'] * $data['precio'];

        $movimiento->update($data);

        return redirect()->route('movimientos.index')->with('success', 'Movimiento actualizado');
    }

    public function destroy(Movimiento $movimiento)
    {
        $movimiento->delete();
        return redirect()->route('movimientos.index')->with('success', 'Movimiento eliminado');
    }
}
