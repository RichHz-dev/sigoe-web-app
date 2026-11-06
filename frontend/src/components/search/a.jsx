import { useMemo } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { products } from '../../data/store';

const MAX_SUGGESTIONS = 4;

function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim();
}

function productMatches(product, term) {
  const fields = [
    product.name,
    product.fabric,
    product.fit,
    product.sku,
    ...(product.colors ?? []).map((color) => color.name),
  ];

  return normalize(fields.filter(Boolean).join(' ')).includes(normalize(term));
}

export default function SearchPanel({
  query,
  onQueryChange,
  onSubmit,
  onSelect,
  onClose,
  inputRef,
}) {
  const term = query.trim();

  const matches = useMemo(() => {
    if (!term) return [];
    return products.filter((product) => productMatches(product, term));
  }, [term]);

  const suggestions = matches.slice(0, MAX_SUGGESTIONS);

  function clearInput() {
    onQueryChange('');
    inputRef.current?.focus();
  }

  return (
    <div
      className={[
        'rounded-2xl border border-[#D2EBF9] bg-white',
        'px-4 py-4 shadow-[0_22px_65px_rgba(0,7,45,0.22)]',
        'sm:px-6 sm:py-5',
      ].join(' ')}
    >
      <form role="search" onSubmit={onSubmit}>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className={[
              'flex h-12 min-w-0 flex-1 items-center gap-2.5',
              'rounded-lg border border-[#C5D5E9] bg-white px-3.5',
              'transition-colors focus-within:border-masterly-navy',
              'focus-within:shadow-[0_0_0_2px_rgba(14,107,168,0.10)]',
              'sm:h-13 sm:px-4',
            ].join(' ')}
          >
            <Search
              size={20}
              strokeWidth={1.7}
              aria-hidden="true"
              className="shrink-0 text-masterly-navy"
            />

            <label htmlFor="global-search" className="sr-only">
              Buscar camisas, tejidos o estilos
            </label>
            <input
              ref={inputRef}
              id="global-search"
              type="search"
              autoComplete="off"
              enterKeyHint="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Buscar camisas, tejidos, estilos..."
              className={[
                'h-full w-full min-w-0 flex-1 appearance-none',
                'border-0 bg-transparent p-0 shadow-none ring-0',
                'text-[14px] font-normal text-masterly-navy',
                'placeholder:text-[#8291A9] sm:text-[15px]',
                'outline-none focus:border-0 focus:outline-none',
                'focus:ring-0 focus-visible:outline-none',
                '[&::-webkit-search-cancel-button]:hidden',
              ].join(' ')}
              // Evita el rectángulo de foco interior heredado de los estilos globales.
              style={{ outline: 'none', border: 0, boxShadow: 'none' }}
            />

            {term && (
              <button
                type="button"
                onClick={clearInput}
                aria-label="Limpiar texto"
                className="grid size-7 shrink-0 place-items-center rounded-md text-[#72839E] hover:bg-masterly-subtle hover:text-masterly-navy"
              >
                <X size={17} strokeWidth={1.8} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className={[
              'inline-flex h-12 shrink-0 items-center justify-center',
              'rounded-lg bg-masterly-navy px-4 text-[13px]',
              'font-semibold text-white transition-colors',
              'hover:bg-masterly-medium sm:h-13 sm:px-6 sm:text-[14px]',
            ].join(' ')}
          >
            Buscar
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar buscador"
            className={[
              'grid size-9 shrink-0 place-items-center rounded-md',
              'text-masterly-navy hover:bg-masterly-subtle',
            ].join(' ')}
          >
            <X size={21} strokeWidth={1.8} />
          </button>
        </div>
      </form>

      {!term ? (
        <div className="mt-4 border-t border-[#E6EDF5] pt-3.5">
          <button
            type="button"
            onClick={() => onSelect('')}
            className="inline-flex items-center gap-2 text-[12px] font-medium text-masterly-navy hover:underline sm:text-[13px]"
          >
            Explorar catálogo completo
            <ArrowRight size={16} strokeWidth={1.7} />
          </button>
        </div>
      ) : suggestions.length > 0 ? (
        <section className="mt-5" aria-label="Sugerencias del catálogo">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[12px] font-semibold text-masterly-navy sm:text-[13px]">
              Sugerencias
            </h2>
            <button
              type="button"
              onClick={() => onSelect(term)}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-masterly-navy hover:underline"
            >
              Ver resultados en Catálogo
              <ArrowRight size={15} />
            </button>
          </div>

          <ul className="mt-2 divide-y divide-[#E2EAF3]" aria-live="polite">
            {suggestions.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => onSelect(product.name)}
                  className={[
                    'flex w-full items-center gap-3 rounded-md',
                    'px-1 py-3 text-left text-[13px]',
                    'font-medium text-masterly-navy transition-colors',
                    'hover:bg-masterly-subtle sm:text-[14px]',
                  ].join(' ')}
                >
                  <Search
                    size={17}
                    strokeWidth={1.6}
                    className="shrink-0 text-[#4A6386]"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 truncate">{product.name}</span>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-[#8DA1BC]"
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-2 border-t border-[#E2EAF3] pt-3">
            <button
              type="button"
              onClick={() => onSelect('')}
              className="inline-flex items-center gap-2 text-[12px] font-medium text-masterly-navy hover:underline sm:text-[13px]"
            >
              Explorar catálogo completo
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      ) : (
        <section role="status" className="pt-5" aria-live="polite">
          <div className="rounded-xl bg-[#F4FAFF] px-4 py-6 text-center sm:py-7">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#EAF3FC] text-masterly-navy">
              <Search size={25} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h2 className="mt-3 text-[14px] font-semibold text-masterly-navy sm:text-[15px]">
              No encontramos resultados para “{term}”
            </h2>
            <p className="mt-1 text-[12px] text-[#71809A] sm:text-[13px]">
              Intenta con otras palabras o explora nuestras camisas.
            </p>
            <button
              type="button"
              onClick={() => onSelect('')}
              className={[
                'mt-5 inline-flex min-h-10 items-center justify-center',
                'gap-2 rounded-md bg-masterly-navy px-5',
                'text-[12px] font-semibold text-white',
                'transition-colors hover:bg-masterly-medium',
              ].join(' ')}
            >
              Ver catálogo completo
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
