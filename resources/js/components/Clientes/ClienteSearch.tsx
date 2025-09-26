import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '../ui/button';

interface Props {
  initialSearch?: string;
}

const ClienteSearch: React.FC<Props> = ({ initialSearch = '' }) => {
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/clientes', { search }, { preserveState: true });
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex space-x-2">
      <input
        type="text"
        placeholder="Buscar cliente..."
        className="border p-2 flex-1"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Button type="submit" variant="default" className="px-4 py-2">
        Buscar
      </Button>
    </form>
  );
};

export default ClienteSearch;
