<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductoRequest;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\ProductoImagen;
use App\Models\ProductoPrecio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductoController extends Controller
{
    // Listado con búsqueda y orden
    public function index(Request $request)
    {
        $productos = Producto::with([
                'categoria',
                'imagenPrincipal',
                'imagenes',       // todas las imágenes
                'precioActivo',
                'precios'         // historial de precios
            ])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%")
                    ->orWhere('descripcion', 'like', "%{$search}%")
                    ->orWhere('codigo', 'like', "%{$search}%");
                });
            })
            ->orderBy(
                $request->get('sort', 'id'),
                $request->get('direction', 'desc')
            )
            ->paginate(5)
            ->withQueryString();

        // Cargar todas las categorías para el modal de creación
        $categorias = \App\Models\Categoria::all();

        return Inertia::render('Productos/ProductoIndex', [
            'productos' => $productos,
            'filters' => $request->only('search', 'sort', 'direction'),
            'categorias' => $categorias, // <-- agregado
        ]);
    }

    public function show($id)
    {
        // Obtener el producto con relaciones necesarias
        $producto = Producto::with(['categoria', 'imagenes', 'precios', 'precioActivo'])->findOrFail($id);

        // Retornar a la vista de Inertia
        return Inertia::render('Productos/ProductoShow', [
            'producto' => $producto,
        ]);
    }

    public function create(){
        $categorias = \App\Models\Categoria::all();
        return Inertia::render('Productos/ProductoCreateOrUpdated', [
            'categorias' => $categorias, // <-- agregado
        ]);
    }

    public function edit($id){
        $categorias = \App\Models\Categoria::all();
        $producto = Producto::with(['categoria', 'precioActivo', 'imagenes', 'precios'])->find($id);
        return Inertia::render('Productos/ProductoCreateOrUpdated', [
            'categorias' => $categorias, // <-- agregado
            'producto' => $producto
        ]);
    }

    public function createOrUpdate(Request $request){
        $categorias = \App\Models\Categoria::all();
        $producto = null;

        if ($request->id) {
            $producto = Producto::find($request->id);
        }

        return Inertia::render('Productos/ProductoCreateOrUpdated', [
            'categorias' => $categorias, // <-- agregado
            'producto' => $producto
        ]);
    }


    // Crear producto
    public function store(Request $request)
    {
        // dd('$request->all()');
        // Validación básica
        $validated = $request->validate([
            'id' => 'nullable|exists:productos,id',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria_id' => 'required|exists:categorias,id',
            'codigo' => 'nullable|string|max:50',
            'stock_actual' => 'required|numeric|min:0',
            'stock_minimo' => 'required|numeric|min:0',
            'unidad_medida' => 'required|string|max:20',
            'activo' => 'required|boolean',
            'imagenes.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'precio' => 'nullable|array',
            'precio.precio_venta' => 'nullable|numeric|min:0',
            'precio.precio_compra' => 'nullable|numeric|min:0',
        ]);

        // Crear producto
        $producto = Producto::updateOrCreate(
            ['id' => $validated['id'] ?? null], // condición de búsqueda
            [
                'nombre' => $validated['nombre'],
                'descripcion' => $validated['descripcion'] ?? null,
                'categoria_id' => $validated['categoria_id'],
                'codigo' => $validated['codigo'] ?? null,
                'stock_actual' => $validated['stock_actual'],
                'stock_minimo' => $validated['stock_minimo'],
                'unidad_medida' => $validated['unidad_medida'],
                'activo' => $validated['activo'],
                'user_id' => Auth::id(),
            ]
        );

        // Guardar imágenes
        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $index => $file) {
                $path = $file->store('productos', 'public');
                ProductoImagen::create([
                    'producto_id' => $producto->id,
                    'imagen' => $path,
                    'es_principal' => $index === 0, // la primera imagen será principal por defecto
                    'user_id' => Auth::id(),
                ]);
            }
        }

        // Guardar precio inicial si existe
        if ($request->filled('precio')) {
            $precioData = $request->input('precio');
            if (!empty($precioData['precio_venta']) || !empty($precioData['precio_compra'])) {
                ProductoPrecio::create([
                    'producto_id' => $producto->id,
                    'precio_venta' => $precioData['precio_venta'] ?? 0,
                    'precio_compra' => $precioData['precio_compra'] ?? 0,
                    'activo' => true,
                    'fecha_inicio' => now(),
                    'user_id' => Auth::id(),
                ]);
            }
        }

        return response()->json([
            'success' => 'Producto creado/actualizado correctamente.',
            'producto' => $producto,
        ]);
    }

    // Editar producto
    public function update(ProductoRequest $request, Producto $producto)
    {
        // Validación
        $validated = $request->validated();

        // Guardar datos básicos
        $producto = $this->guardarDatosProducto($validated);

        // Guardar precios si cambian
        $this->guardarPrecios($producto, $validated['precio_venta'] ?? 0, $validated['precio_compra'] ?? 0);

        return response()->json([
            'success' => "Producto {$producto->id} actualizado correctamente.",
            'producto' => $producto
        ]);
    }

    public function storeImages(Request $request, $productoId)
    {
        $request->validate([
            'imagenes.*' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $producto = Producto::findOrFail($productoId);

        $imagenesGuardadas = [];

        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $imagen) {
                // Guardar la imagen en storage/app/public/productos
                $path = $imagen->store('productos', 'public');

                $nuevaImagen = ProductoImagen::create([
                    'producto_id'  => $producto->id,
                    'imagen'       => $path,
                    'es_principal' => false,
                    'user_id'      => Auth::id(), // 👈 asignar usuario actual
                ]);

                $imagenesGuardadas[] = $nuevaImagen;
            }
        }

        return response()->json([
            'message'  => 'Imágenes guardadas correctamente',
            'imagenes' => $imagenesGuardadas,
        ]);
    }
    /**
     * Guarda un nuevo precio solo si hay cambios en precio_venta o precio_compra.
     */
    protected function guardarPrecios(Producto $producto, float $precioVentaNuevo, float $precioCompraNuevo): void
    {
        $precioActivo = $producto->precioActivo;

        if (
            $precioActivo === null ||
            $precioActivo->precio_venta != $precioVentaNuevo ||
            $precioActivo->precio_compra != $precioCompraNuevo
        ) {
            // Desactivar precios anteriores
            ProductoPrecio::where('producto_id', $producto->id)
                ->where('activo', true)
                ->update(['activo' => false]);

            // Crear nuevo precio
            ProductoPrecio::create([
                'producto_id' => $producto->id,
                'precio_venta' => $precioVentaNuevo,
                'precio_compra' => $precioCompraNuevo,
                'activo' => true,
                'fecha_inicio' => now(),
                'user_id' => Auth::id(),
            ]);
        }
    }

    /**
     * Guarda o actualiza los datos del producto.
     */
    protected function guardarDatosProducto(array $validated): Producto
    {
        $producto = Producto::updateOrCreate(
            ['id' => $validated['id'] ?? null],
            [
                'nombre' => $validated['nombre'],
                'descripcion' => $validated['descripcion'] ?? null,
                'categoria_id' => $validated['categoria_id'],
                'codigo' => $validated['codigo'] ?? null,
                'stock_actual' => $validated['stock_actual'],
                'stock_minimo' => $validated['stock_minimo'],
                'unidad_medida' => $validated['unidad_medida'],
                'activo' => $validated['activo'],
                'user_id' => Auth::id(),
            ]
        );

        // Refrescar para traer relaciones actualizadas
        return Producto::with('precioActivo')->find($producto->id);
    }



    // Eliminar producto
    public function destroy(Producto $producto)
    {
        $nombre = $producto->nombre;
        $producto->delete();

        return redirect()->route('productos.index')
            ->with('success', "Producto '{$nombre}' eliminado correctamente.");
    }
}
