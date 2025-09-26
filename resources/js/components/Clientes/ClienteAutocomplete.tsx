import { FC, useState, useEffect, useRef, KeyboardEvent } from 'react';
import axios from 'axios';
import { Cliente } from '@/interfaces/Clientes.Interface';

interface Props {
  form: { cliente_id: string | null };
  setData: (key: 'cliente_id', value: string) => void;
  defaultCliente?: Cliente | null;
}

const ClienteAutocomplete: FC<Props> = ({ form, setData, defaultCliente }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Cliente[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Inicializar con cliente por defecto (solo 1 vez o si cambia)
  useEffect(() => {
    if (defaultCliente && !isSelected) {
      setData('cliente_id', String(defaultCliente.id));
      setQuery(`${defaultCliente.nombre_razon_social} - ${defaultCliente.propietario}`);
      setIsSelected(true);
    }
  }, [defaultCliente, isSelected, setData]);

  // Click fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Buscar clientes con debounce
  useEffect(() => {
    if (query.length < 2 || isSelected) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await axios.get(`/clientes/search?search=${query}`);
        if (Array.isArray(res.data?.data)) {
          setResults(res.data.data);
          setShowDropdown(true);
          setActiveIndex(0);
        } else {
          setResults([]);
          setShowDropdown(false);
        }
      } catch (err) {
        console.error(err);
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, isSelected]);

  // Seleccionar cliente
  const selectCliente = (cliente: Cliente) => {
    setData('cliente_id', String(cliente.id));
    setQuery(`${cliente.nombre_razon_social} - ${cliente.propietario}`);
    setShowDropdown(false);
    setResults([]);
    setIsSelected(true);
  };

  // Manejo de teclas
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) selectCliente(results[activeIndex]);
    }
  };

  // Resetear selección si el usuario empieza a escribir de nuevo
  const handleChange = (value: string) => {
    setQuery(value);
    setIsSelected(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border p-2 w-full"
      />
      {showDropdown && results.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border max-h-40 overflow-y-auto z-10">
          {results.map((cliente, index) => (
            <li
              key={cliente.id}
              className={`p-2 cursor-pointer ${index === activeIndex ? 'bg-blue-500 text-white' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectCliente(cliente)}
            >
              {cliente.nombre_razon_social} - {cliente.propietario}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClienteAutocomplete;
