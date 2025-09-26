import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ClienteFormProps {
  data: any;
  setData: (field: string, value: any) => void;
  errors: any;
  processing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  reset?: () => void;
}

export default function ClienteForm({
  data,
  setData,
  errors,
  processing,
  onSubmit,
  reset = () => {},
}: ClienteFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Tipo Documento */}
      <div className="grid gap-2">
        <Label>Tipo Documento</Label>
        <Select value={data.tipo_documento} onValueChange={(v) => setData("tipo_documento", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo de documento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CI">CI</SelectItem>
            <SelectItem value="NIT">NIT</SelectItem>
          </SelectContent>
        </Select>
        {errors.tipo_documento && <p className="text-red-500 text-sm">{errors.tipo_documento}</p>}
      </div>

      {/* Tipo */}
      <div className="grid gap-2">
        <Label>Tipo</Label>
        <Select value={data.tipo} onValueChange={(v) => setData("tipo", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NATURAL">Natural</SelectItem>
            <SelectItem value="JURIDICO">Jurídico</SelectItem>
          </SelectContent>
        </Select>
        {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
      </div>

      {/* Número Documento */}
      <div>
        <Label htmlFor="numero_documento">Número documento</Label>
        <Input
          id="numero_documento"
          value={data.numero_documento}
          onChange={(e) => setData("numero_documento", e.target.value)}
        />
        {errors.numero_documento && <p className="text-red-500 text-sm">{errors.numero_documento}</p>}
      </div>

      {/* Nombre */}
      <div>
        <Label htmlFor="nombre_razon_social">Nombre</Label>
        <Input
          id="nombre_razon_social"
          value={data.nombre_razon_social}
          onChange={(e) => setData("nombre_razon_social", e.target.value)}
        />
        {errors.nombre_razon_social && <p className="text-red-500 text-sm">{errors.nombre_razon_social}</p>}
      </div>

      {/* Dirección */}
      <div>
        <Label htmlFor="direccion">Dirección</Label>
        <Input
          id="direccion"
          value={data.direccion}
          onChange={(e) => setData("direccion", e.target.value)}
        />
        {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion}</p>}
      </div>

      {/* Teléfono */}
      <div>
        <Label htmlFor="telefono">Teléfono</Label>
        <Input id="telefono" value={data.telefono} onChange={(e) => setData("telefono", e.target.value)} />
        {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Estado */}
      <div>
        <Label>Estado</Label>
        <Select value={data.estado} onValueChange={(v) => setData("estado", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="inactivo">Inactivo</SelectItem>
          </SelectContent>
        </Select>
        {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
      </div>

      {/* Notas */}
      <div>
        <Label>Notas</Label>
        <textarea
          value={data.notas}
          onChange={(e) => setData("notas", e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
        {errors.notas && <p className="text-red-500 text-sm">{errors.notas}</p>}
      </div>

      {/* Botones */}
      <div className="flex space-x-2">
        <Button type="submit" disabled={processing}>
          Guardar
        </Button>
        <Button type="button" variant="outline" onClick={reset}>
          Limpiar
        </Button>
      </div>
    </form>
  );
}
