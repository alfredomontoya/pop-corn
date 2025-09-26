<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\ProductoImagen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductoImagenController extends Controller
{
    // Guardar nuevas imágenes
    public function store(Request $request, Producto $producto)
    {
        $request->validate([
            'imagenes.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $imagenes = [];
        foreach ($request->file('imagenes') as $file) {
            $path = $file->store('productos', 'public');

            $imagen = $producto->imagenes()->create([
                'imagen' => $path,
                'es_principal' => false,
                'user_id' => Auth::id(),
            ]);

            $imagenes[] = $imagen;
        }

        return response()->json([
            'success' => 'Imágenes agregadas correctamente.',
            'imagenes' => $imagenes,
        ]);
    }

    // Eliminar imagen
    public function destroy($id)
    {
        DB::beginTransaction();

        try {
            $productoImagen = ProductoImagen::findOrFail($id);
            $productoId = $productoImagen->producto_id;
            $eraPrincipal = $productoImagen->es_principal;

            // Eliminar la imagen de la base de datos
            $productoImagen->delete();

            // Si era principal, marcar otra aleatoria como principal
            if ($eraPrincipal) {
                $otraImagen = ProductoImagen::where('producto_id', $productoId)
                    ->inRandomOrder()
                    ->first();

                if ($otraImagen) {
                    $otraImagen->update(['es_principal' => true]);
                }
            }

            // Eliminar el archivo físico si existe
            if ($productoImagen->imagen && Storage::disk('public')->exists($productoImagen->imagen)) {
                Storage::disk('public')->delete($productoImagen->imagen);
            }

            // Obtener todas las imágenes actualizadas del producto
            $productoImagenes = ProductoImagen::where('producto_id', $productoId)->get();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Imagen eliminada correctamente.',
                'productoImagenes' => $productoImagenes,
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar la imagen.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // Establecer como principal
    public function setPrincipal($id)
    {
        // Buscar la imagen
        $imagen = ProductoImagen::findOrFail($id);

        // Desmarcar todas las imágenes principales de este producto
        $desmarcados = ProductoImagen::where('producto_id', $imagen->producto_id)
            ->where('es_principal', true) // solo las que están marcadas
            ->update(['es_principal' => false]);

        // Marcar la imagen actual como principal (solo si no lo era)
        $cambio = false;
        if (!$imagen->es_principal) {
            $cambio = $imagen->update(['es_principal' => true]);
        }

        if ($desmarcados > 0 || $cambio) {
            return response()->json([
                'success' => true,
                'message' => 'Imagen establecida como principal.'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'La imagen ya estaba marcada como principal.'
            ], 200);
        }
    }

}
