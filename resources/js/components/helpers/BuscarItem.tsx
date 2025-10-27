import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface BuscarItemProps<T> {
  items: T[];
  labelKey: keyof T;
  onSelect: (item: T) => void;
  selected?: T | null;
  placeholder?: string;
  displayKey?: (item: T) => string;
  maxResults?: number; // límite de resultados mostrados
  error?: string
}

export default function BuscarItem<T>({
  items,
  labelKey,
  onSelect,
  selected,
  placeholder = "Buscar...",
  displayKey,
  maxResults = 5, // por defecto 5
  error
}: BuscarItemProps<T>) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtrar resultados y limitar
  const filtered = items
    .filter((item) => {
      const text = displayKey ? displayKey(item) : String(item[labelKey]);
      return text.toLowerCase().includes(query.toLowerCase());
    })
    .slice(0, maxResults); // limitar a maxResults

  // Cerrar lista si se presiona Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cerrar lista al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Card que muestra seleccionado o placeholder */}
      {!open && (
        <>
            <Card
            onClick={() => setOpen(true)}
            className="cursor-pointer px-4 py-1 pt-2"
            >
            {selected
                ? displayKey
                ? displayKey(selected)
                : String(selected[labelKey])
                : placeholder}
            </Card>
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        </>
      )}


      {/* Input + lista cuando está abierto */}
      {open && (
        <div className="absolute z-10 w-full bg-secondary border rounded-md shadow-md">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus
            // className="w-full border-0 focus:ring-0"
          />
          <ul className="max-h-60 overflow-y-auto">
            {filtered.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  onSelect(item);
                  setQuery("");
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100/50 cursor-pointer"
              >
                {displayKey ? displayKey(item) : String(item[labelKey])}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-2">No se encontraron resultados</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
