import React from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export default function ClientesSearchForm({ search, setSearch, handleSearch }: Props) {
  return (
    <form onSubmit={handleSearch} className="mb-4 flex gap-2">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar cliente..."
        className="border rounded px-3 py-1"
      />
      <Button
        type="submit" variant={'default'} size={'sm'}
        // className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Buscar
      </Button>

    </form>
  );
}
