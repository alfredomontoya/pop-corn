import React from "react";
import { useForm, Head } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HeadingSmall from "@/components/heading-small";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    user_id: '', // si quieres dejarlo vacío o tomarlo de contexto/auth
    tipo_documento: "CI",
    tipo: "NATURAL",
    numero_documento: "",
    nombre_razon_social: "",
    direccion: "",
    telefono: "",
    email: "",
    estado: "activo",
    notas: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("clientes.store"), {
      onSuccess: () => {
        // reset()
      },
      onError: () => {
        console.error(errors);
        // alert("❌ Ocurrió un error al registrar el cliente");
      }
    });

  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Clientes',
      href: '/clientes',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear Cliente" />
      <div className="flex-1 md:max-w-2xl">
        <section className="max-w-xl space-y-12">
            <div className="px-4 py-6">
                <Heading title="Registrar cliente" description="Actualiza la información del cliente" />
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Tipo Documento */}
                    <div className="grid gap-2">
                        <Label className="block font-medium">Tipo Documento</Label>
                        <Select
                            value={data.tipo_documento}
                            onValueChange={(valor) => setData("tipo_documento", valor)} // aquí no hay e.target.value
                            >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tipo de documento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CI">CI</SelectItem>
                                <SelectItem value="NIT">NIT</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.tipo_documento && (
                        <p className="text-red-500 text-sm">{errors.tipo_documento}</p>
                        )}
                    </div>

                    {/* Tipo */}
                    <div>
                        <Label className="block font-medium">Tipo</Label>
                        <Select
                        value={data.tipo}
                        onValueChange={(valor) => setData("tipo", valor)}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="NATURAL">Natural</SelectItem>
                            <SelectItem value="JURIDICO">Jurídico</SelectItem>
                        </SelectContent>
                        </Select>
                        {errors.tipo && (
                        <p className="text-red-500 text-sm">{errors.tipo}</p>
                        )}
                    </div>

                    {/* Numero Documento */}
                    <div>
                        <Label htmlFor="numero_documento">Numero documento</Label>
                        <Input
                            id="numero_documento"
                            className="mt-1 block w-full"
                            value={data.numero_documento}
                            onChange={(e) => setData('numero_documento', e.target.value)}
                            // required
                            autoComplete="numero_documento"
                            placeholder="Numero documento"
                        />

                        {errors.numero_documento && (
                        <p className="text-red-500 text-sm">{errors.numero_documento}</p>
                        )}
                    </div>

                    {/* Nombre */}
                    <div>
                        <Label htmlFor="nombre_razon_social">Nombre</Label>
                        <Input
                        id="nombre_razon_social"
                        className="mt-1 block w-full"
                        value={data.nombre_razon_social}
                        onChange={(e) => setData("nombre_razon_social", e.target.value)}
                        autoComplete="nombre_razon_social"
                        placeholder="Nombre o razón social"
                        />
                        {errors.nombre_razon_social && (
                        <p className="text-red-500 text-sm">{errors.nombre_razon_social}</p>
                        )}
                    </div>

                    {/* Dirección */}
                    <div>
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input
                        id="direccion"
                        className="mt-1 block w-full"
                        value={data.direccion}
                        onChange={(e) => setData("direccion", e.target.value)}
                        autoComplete="direccion"
                        placeholder="Dirección"
                        />
                        {errors.direccion && (
                        <p className="text-red-500 text-sm">{errors.direccion}</p>
                        )}
                    </div>

                    {/* Teléfono */}
                    <div>
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                        id="telefono"
                        className="mt-1 block w-full"
                        value={data.telefono}
                        onChange={(e) => setData("telefono", e.target.value)}
                        autoComplete="telefono"
                        placeholder="Teléfono"
                        />
                        {errors.telefono && (
                        <p className="text-red-500 text-sm">{errors.telefono}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        autoComplete="email"
                        placeholder="Email"
                        />
                        {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>

                    {/* Estado */}
                    <div>
                        <Label htmlFor="estado" className="block font-medium">Estado</Label>
                        <Select
                            value={data.estado}
                            onValueChange={(valor) => setData("estado", valor)} // aquí no hay e.target.value
                            >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="activo">Activo</SelectItem>
                                <SelectItem value="inactivo">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && (
                        <p className="text-red-500 text-sm">{errors.estado}</p>
                        )}
                    </div>

                    {/* Notas */}
                    <div>
                        <label className="block font-medium">Notas</label>
                        <textarea
                        value={data.notas}
                        onChange={(e) => setData("notas", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        rows={3}
                        />
                        {errors.notas && (
                        <p className="text-red-500 text-sm">{errors.notas}</p>
                        )}
                    </div>

                    {/* Botones */}
                    <div className="flex space-x-2">
                        <Button
                            type="submit"
                            disabled={processing}
                            variant={'default'}
                            // className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                        Guardar
                        </Button>
                        <Button
                            type="button"
                            onClick={() => reset()}
                            variant={'outline'}
                        >
                            Limpiar
                        </Button>
                    </div>
                </form>
            </div>
        </section>
      </div>
    </AppLayout>
  );
}
