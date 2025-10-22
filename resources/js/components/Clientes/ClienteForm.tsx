import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MapPicker from "../MapPicker";

export interface ClienteFormValues {
  tipo_documento: "CI" | "NIT" | "";
  tipo: "NATURAL" | "JURIDICO" | "";
  numero_documento: string;
  nombre_razon_social: string;
  propietario: string;
  direccion: string;
  ubicacion: string;
  telefono: string;
  email: string;
  // estado: "activo" | "inactivo";
  notas: string;
}

interface ClienteFormProps {
  values: ClienteFormValues;
  onChange: (field: keyof ClienteFormValues, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  submitLabel?: string;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ values, onChange, onSubmit, onClose, submitLabel = "Guardar" }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <input type="hidden" name="tipo_documento" value={values.tipo_documento} />

      <Label>Nombre / Razón Social</Label>
      <Input
        type="text"
        placeholder="Nombre / Razón Social"
        value={values.nombre_razon_social}
        onChange={(e) => onChange("nombre_razon_social", e.target.value)}
        required
      />

      <Label>Propietario</Label>
      <Input
        type="text"
        placeholder="Propietario"
        value={values.propietario}
        onChange={(e) => onChange("propietario", e.target.value)}
      />

      <Label>Dirección</Label>
      <Input
        type="text"
        placeholder="Dirección"
        value={values.direccion}
        onChange={(e) => onChange("direccion", e.target.value)}
      />

      <Label>Ubicación</Label>
      <MapPicker
        value={values.ubicacion}
        onChange={(coords) => onChange("ubicacion", coords)}
        onAddressChange={(addr) => onChange("direccion", addr)}
      />
      <Input
        type="text"
        placeholder="Ubicación"
        value={values.ubicacion}
        onChange={(e) => onChange("ubicacion", e.target.value)}
      />

      <Label>Teléfono</Label>
      <Input
        type="text"
        placeholder="Teléfono"
        value={values.telefono}
        onChange={(e) => onChange("telefono", e.target.value)}
      />

      <div className="flex justify-end space-x-2 mt-2">
        <Button type="submit" variant="default">{submitLabel}</Button>
        <Button type="button" onClick={onClose} variant="secondary">Cancelar</Button>
      </div>
    </form>
  );
};

export default ClienteForm;
