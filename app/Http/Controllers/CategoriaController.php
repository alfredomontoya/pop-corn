<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categoria\CategoriaRequest;
use App\Models\Categoria;
use Exception;
use Illuminate\Database\QueryException;
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
    public function store(CategoriaRequest $request): JsonResponse
    {
        /** @var \Illuminate\Http\Request $request */
        $data = $request->only('nombre', 'descripcion');

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('categorias', 'public');
        }

        $data['user_id'] = Auth::user()->id;
        $categoria = Categoria::create($data);

        // Redirige con mensaje para el toast
        return response()->json([
            'success' => true,
            'message' => "Categoría '{$categoria->nombre}' creada con éxito.",
            'categoria' => $categoria
        ], 200);

    }

    // Editar categoría
    public function update(CategoriaRequest $request, Categoria $categoria): JsonResponse
    {

        /** @var \Illuminate\Http\Request $request */
        $data = $request->only('nombre', 'descripcion');

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('categorias', 'public');
        }

        $categoria->update($data);

        return response()->json([
            'success' => true,
            'message' => "Categoría '{$categoria->nombre}' actualizada con éxito.",
            'categoria' => $categoria
        ], 200);
    }

    // Dar de baja categoría
    public function destroy(Categoria $categoria)
    {
        try {
            $nombre = $categoria->nombre;
            $categoria->delete();

            return response()->json([
                'success' => true,
                'message' => "Categoría '{$nombre}' eliminada con éxito.",
            ], 200);

        } catch (QueryException $e) {
            // Código 23000 => violación de integridad referencial
            if ($e->getCode() === '23000') {
                return response()->json([
                    'success' => false,
                    'message' => "No se puede eliminar la categoría '{$categoria->nombre}' porque está asociada a uno o más productos.",
                ], 409); // 409 Conflict
            }

            // Otros errores de base de datos
            return response()->json([
                'success' => false,
                'message' => 'Error en la base de datos al eliminar la categoría.',
                'error' => $e->getMessage(),
            ], 500);

        } catch (Exception $e) {
            // Errores no relacionados con la base de datos
            return response()->json([
                'success' => false,
                'message' => 'Error inesperado al eliminar la categoría.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
