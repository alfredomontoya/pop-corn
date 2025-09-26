// SearchComponent.tsx
import { FC } from "react";
import { Input } from "../ui/input";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  handleSearch?: (e: React.FormEvent) => void; // Opcional, si quieres manejar el submit aquí
}

const SearchComponent = ({ search, setSearch, handleSearch }: Props) => {
  return (
    <Input
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && handleSearch) {
          handleSearch(e);
        }
      }}
      placeholder="Buscar..."
      className="border rounded px-3 py-2 w-full"
    />
  );
};

export default SearchComponent;
