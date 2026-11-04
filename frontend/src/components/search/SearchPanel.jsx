import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { formatSoles, products } from '../../data/store';

const popularSearches = ['Oxford', 'Ejecutiva', 'Twill', 'Slim Fit'];

export default function SearchPanel({ onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const normalized = query.trim().toLocaleLowerCase('es');
  const matchedProducts = normalized
    ? products.filter((product) =>
        [product.name, product.fabric, product.fit]
          .join(' ')
          .toLocaleLowerCase('es')
          .includes(normalized),
      )
    : products;
  const suggestions = matchedProducts.slice(0, 3);

  function goToResults(term) {
    const text = term.trim();
    navigate(text ? `/catalogo?q=${encodeURIComponent(text)}` : '/catalogo');
    onClose();
  }

  function onSubmit(event) {
    event.preventDefault();
    goToResults(query);
  }

  return (
    <div
      id="masterly-search-panel"
      role="dialog"
      aria-label="Buscar productos MASTERLY"
      className="absolute inset-x-0 top-full z-50 border-t border-masterly-border bg-white shadow-[0_20px_45px_rgba(0,7,45,0.14)]"
    >
      <div className="site-container mx-auto max-w-5xl py-6 sm:py-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-masterly-vibrant">
              MASTERLY
            </p>
            <h2 className="font-editorial text-xl font-semibold text-masterly-navy sm:text-2xl">
              ¿Qué estás buscando?
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-masterly-navy transition-colors hover:bg-masterly-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-masterly-navy"
            aria-label="Cerrar buscador"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={onSubmit} role="search" className="flex flex-col gap-3 sm:flex-row">
          <div className="flex min-h-12 flex-1 items-center gap-3 rounded-md border border-masterly-border bg-masterly-subtle px-4 focus-within:border-masterly-navy focus-within:ring-2 focus-within:ring-masterly-navy/10">
            <Search size={20} className="shrink-0 text-masterly-navy" aria-hidden="true" />
            <label htmlFor="masterly-global-search" className="sr-only">
              Buscar camisas, tejidos o estilos
            </label>
            <input
              id="masterly-global-search"
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar camisas, tejidos, estilos..."
              autoComplete="off"
              className="w-full min-w-0 bg-transparent py-3 text-sm text-masterly-navy outline-none placeholder:text-slate-400"
            />
          </div>
          <button type="submit" className="btn-primary min-h-12 rounded-md px-7">
            Buscar <ArrowRight size={16} aria-hidden="true" />
          </button>
        </form>

        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold text-masterly-navy">Búsquedas populares</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => goToResults(term)}
                className="rounded-full border border-masterly-border px-4 py-2 text-xs text-masterly-navy transition-colors hover:border-masterly-navy hover:bg-masterly-subtle"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 border-t border-masterly-border pt-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-masterly-navy">
              {normalized ? 'Productos encontrados' : 'Productos destacados'}
            </p>
            <Link to="/catalogo" onClick={onClose} className="text-xs font-semibold text-masterly-vibrant hover:underline">
              Ver catálogo completo
            </Link>
          </div>

          {suggestions.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  to={`/catalogo?q=${encodeURIComponent(product.name)}`}
                  onClick={onClose}
                  className="group flex min-w-0 items-center gap-3 rounded-md border border-masterly-border p-2.5 transition-colors hover:border-masterly-vibrant hover:bg-masterly-subtle"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 shrink-0 rounded-sm object-cover"
                  />
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-xs font-semibold text-masterly-navy group-hover:text-masterly-vibrant">
                      {product.name}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">{product.fit}</p>
                    <p className="mt-1 text-xs font-bold text-masterly-navy">
                      {formatSoles(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="rounded-md bg-masterly-subtle px-4 py-5 text-sm text-slate-600">
              No encontramos productos coincidentes. Prueba con otra palabra.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
