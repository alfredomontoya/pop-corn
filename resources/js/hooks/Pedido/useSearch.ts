import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function useSearch(initialSearch: string = '') {
  const [search, setSearch] = useState<string>(initialSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route("pedidos.index"), { search }, { preserveState: true });
  };

  return { search, setSearch, handleSearch };
}
