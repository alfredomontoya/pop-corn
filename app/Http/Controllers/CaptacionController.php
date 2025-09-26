<?php

// app/Http/Controllers/CaptacionController.php
namespace App\Http\Controllers;

use App\Models\Captacion;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CaptacionController extends Controller
{
   public function index(Request $request)
    {
        $query = Captacion::with('asesor');

        if ($request->filled('asesor_id')) {
            $query->where('asesor_id', $request->asesor_id);
        }

        if ($request->filled('lugar')) {
            $query->where('lugar', 'like', '%' . $request->lugar . '%');
        }

        if ($request->filled('descripcion')) {
            $query->where('descripcion', 'like', '%' . $request->descripcion . '%');
        }

        $captaciones = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        // Traer todos los asesores para el select
        $asesores = User::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Captaciones/Index', [
            'captaciones' => $captaciones,
            'asesores' => $asesores,
            'filters' => $request->only(['asesor_id', 'lugar', 'descripcion']),
        ]);
    }

    public function show($id)
    {
        $captacion = Captacion::with('asesor')->findOrFail($id);
        return Inertia::render('Captaciones/Show', [
            'captacion' => $captacion,
        ]);
    }

    public function create()
    {
        $asesores = User::all();
        return Inertia::render('Captaciones/Create', [
            'asesores' => $asesores,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'asesor_id' => 'required|exists:users,id',
            'lugar' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
            'descripcion' => 'nullable|string',
        ]);

        // calcular nro secuencial por asesor
        $maxNro = Captacion::where('asesor_id', $request->asesor_id)->max('nro') ?? 0;
        $nro = $maxNro + 1;

        Captacion::create([
            'asesor_id' => $request->asesor_id,
            'nro' => $nro,
            'lugar' => $request->lugar,
            'precio' => $request->precio,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('captaciones.index')->with('success', 'Captación registrada');
    }

    public function edit($id)
    {
        $captacion = Captacion::findOrFail($id);
        $asesores = User::all();
        return Inertia::render('Captaciones/Edit', [
            'captacion' => $captacion,
            'asesores' => $asesores,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'lugar' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
            'descripcion' => 'nullable|string',
        ]);

        $captacion = Captacion::findOrFail($id);
        $captacion->update([
            'lugar' => $request->lugar,
            'precio' => $request->precio,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('captaciones.index')->with('success', 'Captación actualizada');
    }
}
