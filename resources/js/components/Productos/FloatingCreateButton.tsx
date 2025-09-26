import { Link } from "@inertiajs/react";

export default function FloatingCreateButton() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center z-50 group">
      {/* Tooltip absoluto, no ocupa espacio */}
      <div className="mb-2 px-3 py-1 bg-primary text-primary-foreground text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        Crear Producto
      </div>

      {/* Botón flotante */}
      <Link
        href="/productos/create"
        className="
          w-14 h-14
          bg-primary text-primary-foreground
          rounded-2xl
          flex items-center justify-center
          shadow-lg
          hover:bg-primary/70
          transition-colors duration-200
          text-3xl
          select-none
        "
      >
        +
      </Link>
    </div>
  );
}
