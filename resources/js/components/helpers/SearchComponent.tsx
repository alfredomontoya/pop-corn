import { FC } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  handleSearch?: (e: React.FormEvent) => void;
}

const SearchComponent: FC<Props> = ({ search, setSearch, handleSearch }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (handleSearch) handleSearch(e);
  };

  return (
    <div className="relative w-full mb-2">
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && handleSearch) handleSearch(e);
        }}
        placeholder="Buscar..."
        className="pr-24" // espacio a la derecha para el botón
      />

      {/* Botón dentro del input */}
      <Button
        variant={'default'}
        onClick={ (e) =>  handleClick(e) }
        className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md flex items-center gap-1 transition"
      >
        <Search size={14} />
            Buscar
      </Button>
    </div>
  );
};

export default SearchComponent;
