<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    // Listado con búsqueda y orden
    public function index(Request $request)
    {
        // Construimos la consulta
        $categorias = Categoria::query()
            // Búsqueda condicional
            ->when($request->search, fn($query, $search) =>
                $query->where('nombre', 'like', "%{$search}%")
                    ->orWhere('descripcion', 'like', "%{$search}%")
            )
            // Orden dinámico: campo y dirección
            ->orderBy(
                $request->get('sort', 'id'),         // campo por defecto: nombre
                $request->get('direction', 'desc')       // dirección por defecto: asc
            )
            ->paginate(5)           // paginación
            ->withQueryString();    // mantiene search, sort y direction en los links

        // Retornamos con Inertia
        return Inertia::render('Categorias/CategoriaIndex', [
            'categorias' => $categorias,
            'filters' => $request->only('search', 'sort', 'direction'),
        ]);
    }

    // Crear categoría
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|max:2048',
        ]);

        $data = $request->only('nombre', 'descripcion');

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('categorias', 'public');
        }

        $data['user_id'] = Auth::user()->id;

        // dd($data);

        $categoria = Categoria::create($data);

        // Redirige con mensaje para el toast
        return response()->json([
            'success' => true,
            'message' => "Categoría '{$categoria->nombre}' creada con éxito.",
            'categoria' => $categoria
        ], 200);
        // return redirect()->route('categorias.index')
        //     ->with('success', "Categoría '{$categoria->nombre}' creada con éxito.");
    }

    // Editar categoría
    public function update(Request $request, Categoria $categoria)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|max:2048',
        ]);

        $data = $request->only('nombre', 'descripcion');

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('categorias', 'public');
        }

        $categoria->update($data);

        return redirect()->route('categorias.index')
            ->with('success', "Categoría '{$categoria->nombre}' actualizada con éxito.");
    }

    // Dar de baja categoría
    public function destroy(Categoria $categoria)
    {
        try{
            $nombre = $categoria->nombre;
            $categoria->delete();

            return response()->json([
                'success' => true,
                'message' => "Categoria '{$nombre}' eliminada con exito",
                'categoria' => $categoria,
                'categorias' => Categoria::paginate(5)
            ], 200);

            // return redirect()->route('categorias.index')
            //     ->with('success', "Categoría '{$nombre}' eliminada correctamente.");
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar categoria',
                'error' => $e->getMessage()
            ], 500);
        }


    }
}
