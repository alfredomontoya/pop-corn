import { useForm, Link } from "@inertiajs/react";
import { Captacion } from "@/interfaces/Captaciones.Interface";

interface Props {
  captacion?: Captacion;
  asesores: { id: number; name: string }[];
}

export default function Form({ captacion, asesores }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    asesor_id: captacion?.asesor_id || "",
    lugar: captacion?.lugar || "",
    precio: captacion?.precio || "",
    descripcion: captacion?.descripcion || "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    captacion
      ? put(route("captaciones.update", captacion.id))
      : post(route("captaciones.store"));
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-lg">
      <div>
        <label className="block mb-1">Asesor</label>
        <select
          value={data.asesor_id}
          onChange={(e) => setData("asesor_id", e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">-- Seleccione --</option>
          {asesores.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        {errors.asesor_id && (
          <div className="text-red-500">{errors.asesor_id}</div>
        )}
      </div>

      <div>
        <label className="block mb-1">Lugar</label>
        <input
          type="text"
          value={data.lugar}
          onChange={(e) => setData("lugar", e.target.value)}
          className="border p-2 w-full"
        />
        {errors.lugar && <div className="text-red-500">{errors.lugar}</div>}
      </div>

      <div>
        <label className="block mb-1">Precio</label>
        <input
          type="number"
          value={data.precio}
          onChange={(e) => setData("precio", e.target.value)}
          className="border p-2 w-full"
        />
        {errors.precio && <div className="text-red-500">{errors.precio}</div>}
      </div>

      <div>
        <label className="block mb-1">Descripción</label>
        <textarea
          value={data.descripcion || ""}
          onChange={(e) => setData("descripcion", e.target.value)}
          className="border p-2 w-full"
        />
        {errors.descripcion && (
          <div className="text-red-500">{errors.descripcion}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={processing}
        className="px-4 py-2 bg-green-600 text-white rounded-md"
      >
        Guardar
      </button>
      <Link href={route("captaciones.index")} className="ml-2 text-gray-600">
        Cancelar
      </Link>
    </form>
  );
}
