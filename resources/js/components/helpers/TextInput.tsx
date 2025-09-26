import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  rule?: string;
  type?: string;
}

export function TextInput({ label, placeholder, value, onChange, error, rule, type = "text" }: TextInputProps) {
  return (
    <div className="relative w-full mb-4">
      <Label>{label}</Label>
      {rule && <span className="text-gray-400 text-xs ms-2">{rule}</span>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full border rounded-lg p-2 focus:outline-none"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
