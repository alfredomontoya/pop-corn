<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ClienteController extends Controller
{
    public function index(Request $request)
    {
        $clientes = Cliente::query()
            // 🔍 Búsqueda condicional
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nombre_razon_social', 'like', "%{$search}%")
                    ->orWhere('numero_documento', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('telefono', 'like', "%{$search}%");
                });
            })
            // ↕️ Orden dinámico
            ->orderBy(
                $request->get('sort', 'id'),      // campo por defecto: id
                $request->get('direction', 'desc') // dirección por defecto: desc
            )
            ->paginate(5) // puedes cambiar el tamaño de página
            ->withQueryString(); // mantiene search, sort y direction en los links
        // Retorno con Inertia
        return Inertia::render('Clientes/Index', [
            'clientes' => $clientes,
            'filters'  => $request->only('search', 'sort', 'direction'),
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('search', '');
        $clientes = Cliente::where('nombre_razon_social', 'like', "%{$query}%")->get();

        return response()->json([
            'data' => $clientes // Axios espera un array en res.data.data
        ]);
    }

    public function create()
    {
        return Inertia::render('Clientes/Create');
    }

    public function store(Request $request)
    {
    // Validación
        $request['user_id'] = Auth::id();

        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'tipo_documento' => ['required', Rule::in(['CI', 'NIT'])],
            'tipo' => ['required', Rule::in(['NATURAL', 'JURIDICO'])],
            'numero_documento' => ['nullable', 'string', 'max:255', 'unique:clientes,numero_documento'],
            'nombre_razon_social' => ['required', 'string', 'max:255'],
            'propietario' => ['required', 'string', 'max:255'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'ubicacion' => ['nullable', 'string', 'max:255'],
            'telefono' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', 'unique:clientes,email'],
            'estado' => ['required', Rule::in(['activo', 'inactivo'])],
            'notas' => ['nullable', 'string'],
        ]);

        // dd($validated);

        Cliente::create($validated);

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente registrado correctamente');
        }

    public function edit(Cliente $cliente)
    {
        return Inertia::render('Clientes/Edit', [
            'cliente' => $cliente
        ]);
    }


    public function update(Request $request, Cliente $cliente)
    {
        $data = $request->validate([
            'tipo_documento' => ['required', Rule::in(['CI', 'NIT'])],
            'tipo' => ['required', Rule::in(['NATURAL', 'JURIDICO'])],
            'numero_documento' => ['required', 'string', 'max:255', 'unique:clientes,numero_documento,' . $cliente->id],
            'nombre_razon_social' => ['required', 'string', 'max:255'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'telefono' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', 'unique:clientes,email,' . $cliente->id],
            'estado' => ['required', Rule::in(['activo', 'inactivo'])],
            'notas' => ['nullable', 'string'],
        ]);

        $cliente->update($data);

        // // Devuelve JSON para Inertia sin redirigir
        // return response()->json([
        //     'message' => 'Cliente actualizado correctamente',
        //     'cliente' => $cliente,
        // ]);
    }


    public function destroy(Cliente $cliente)
    {
        $cliente->delete();

        return redirect()->route('clientes.index')->with('success', 'Cliente eliminado');
    }
}
