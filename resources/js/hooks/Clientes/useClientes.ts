import { useState } from "react";
import { router } from "@inertiajs/react";

export function useClientes(initialSearch: string) {
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route("clientes.index"), { search }, { preserveState: true });
  };

  return { search, setSearch, handleSearch };
}
