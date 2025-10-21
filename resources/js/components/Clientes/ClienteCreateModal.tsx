import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

interface ClienteCreateModalProps {
  onClose: () => void;
  onSaved: (msg: string) => void;
}

const ClienteCreateModal: React.FC<ClienteCreateModalProps> = ({
  onClose,
  onSaved,
}) => {
  const [tipoDocumento, setTipoDocumento] = useState<"CI" | "NIT">("CI");
  const [tipo, setTipo] = useState<"NATURAL" | "JURIDICO">("NATURAL");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombreRazonSocial, setNombreRazonSocial] = useState("");
  const [propietario, setPropietario] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"activo" | "inactivo">("activo");
  const [notas, setNotas] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/clientes", {
      tipo_documento: tipoDocumento,
      tipo,
      numero_documento: numeroDocumento,
      nombre_razon_social: nombreRazonSocial,
      direccion,
      propietario,
      ubicacion,
      telefono,
      email,
      estado,
      notas,
    }, {
      onSuccess: () => {
        onClose();
        onSaved(`Cliente '${nombreRazonSocial}' creado correctamente ✅`);
      },
      onError: (errors) => {
        console.error(errors);
        alert("Error al crear el cliente. Ver consola para más detalles.");
      }

    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-6 rounded w-96 bg-neutral-100 dark:bg-neutral-800">
        <h2 className="text-xl font-bold mb-4">Nuevo Cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input type="hidden" name="tipo_documento" value={tipoDocumento} />
          {/* <Select value={tipoDocumento} onValueChange={(v: "CI" | "NIT") => setTipoDocumento(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo Documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CI">CI</SelectItem>
              <SelectItem value="NIT">NIT</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tipo} onValueChange={(v: "NATURAL" | "JURIDICO") => setTipo(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NATURAL">NATURAL</SelectItem>
              <SelectItem value="JURIDICO">JURIDICO</SelectItem>
            </SelectContent>
          </Select> */}

          {/* <Input
            type="text"
            placeholder="Número Documento"
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
            required
          /> */}

          <Label>Nombre / Razón Social</Label>
          <Input
            type="text"
            placeholder="Nombre / Razón Social"
            value={nombreRazonSocial}
            onChange={(e) => setNombreRazonSocial(e.target.value)}
            required
          />
          <Label>Propietario</Label>
          <Input
            type="text"
            placeholder="Propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />

          <Label>Dirección</Label>
          <Input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />

          <Label>Ubicación</Label>
          <Input
            type="text"
            placeholder="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
          <Label>Teléfono</Label>
          <Input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          {/* <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          {/* <Label>Notas</Label>
          <textarea
            placeholder="Notas"
            className="border p-2 w-full"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          /> */}

          <div className="flex justify-end space-x-2 mt-2">
            <Button type="button" onClick={onClose} variant="secondary">Cancelar</Button>
            <Button type="submit" variant="default">Crear</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteCreateModal;
