<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use App\Http\Requests\StoreVentaRequest;
use App\Http\Requests\UpdateVentaRequest;
use App\Models\Cliente;
use App\Models\TipoPago;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VentaController extends Controller
{
    public function index(Request $request)
    {
        $ventas = Venta::with(['user', 'tipoPago', 'cliente'])
            ->when($request->search, function ($query, $search) {
                $query->where('id', 'like', "%$search%")
                      ->orWhereHas('user', fn($q) => $q->where('name', 'like', "%$search%"));
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Ventas/Index', [
            'ventas' => $ventas,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        $clientes = Cliente::all();
        $tiposPago = TipoPago::all();

        return Inertia::render('Ventas/Create', [
            'clientes' => $clientes,
            'tiposPago' => $tiposPago,
        ]);
    }

    public function store(StoreVentaRequest $request)
    {
        $venta = Venta::create($request->validated());

        return redirect()->route('ventas.index')
            ->with('success', 'Venta registrada correctamente.');
    }

    public function show(Venta $venta)
    {
        $venta->load(['detalles.producto', 'user', 'tipoPago']);

        return Inertia::render('Ventas/Show', [
            'venta' => $venta,
        ]);
    }

    public function edit(Venta $venta)
    {
        $venta->load(['detalles', 'user', 'tipoPago']);

        return Inertia::render('Ventas/Edit', [
            'venta' => $venta,
        ]);
    }

    public function update(UpdateVentaRequest $request, Venta $venta)
    {
        $venta->update($request->validated());

        return redirect()->route('ventas.index')
            ->with('success', 'Venta actualizada correctamente.');
    }

    public function destroy(Venta $venta)
    {
        $venta->delete();

        return redirect()->route('ventas.index')
            ->with('success', 'Venta eliminada correctamente.');
    }
}
