import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

interface TextAreaProps{
  label: string;
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  rule?: string;
  rows?: number;
}

export function TextArea({ label, placeholder, value, onChange, error, rule, rows = 2 }: TextAreaProps) {
  return (
    <div className="relative w-full mb-4">
      <Label>{label}</Label>
      {rule && <span className="text-gray-400 text-xs ms-2">{rule}</span>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={cn(
                "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
