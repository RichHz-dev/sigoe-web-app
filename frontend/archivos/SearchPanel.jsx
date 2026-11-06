import { useMemo } from 'react';
import { ArrowRight, Grid2X2, Search, X } from 'lucide-react';
import { products } from '../../data/store';

const MAX_SUGGESTIONS = 4;

function normalize(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim();
}

function productMatches(product, term) {
  const searchableFields = [
    product.name,
    product.fabric,
    product.fit,
    product.sku,
    ...(product.colors ?? []).map((color) => color.name),
  ];

  return normalize(searchableFields.filter(Boolean).join(' '))
    .includes(normalize(term));
}

/**
 * Highlights the part of a label that matches the search text.
 * The index map preserves the original characters when the match
 * contains accents, e.g. "algodon" matches "algodón".
 */
function HighlightMatch({ text, query }) {
  const label = String(text ?? '');
  const searchTerm = normalize(query);

  if (!searchTerm) return label;

  const normalizedCharacters = [];
  const originalIndices = [];

  Array.from(label).forEach((character, index) => {
    const folded = normalize(character);

    for (const foldedCharacter of folded) {
      normalizedCharacters.push(foldedCharacter);
      originalIndices.push(index);
    }
  });

  const normalizedLabel = normalizedCharacters.join('');
  const matchStart = normalizedLabel.indexOf(searchTerm);

  if (matchStart === -1) return label;

  const matchEnd = matchStart + searchTerm.length - 1;
  const originalStart = originalIndices[matchStart];
  const originalEnd = originalIndices[matchEnd] + 1;

  return (
    <>
      {label.slice(0, originalStart)}
      <strong className="font-bold text-masterly-navy">
        {label.slice(originalStart, originalEnd)}
      </strong>
      {label.slice(originalEnd)}
    </>
  );
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

  const suggestions = useMemo(() => {
    if (!term) return [];

    return products
      .filter((product) => productMatches(product, term))
      .slice(0, MAX_SUGGESTIONS);
  }, [term]);

  function clearInput() {
    onQueryChange('');
    inputRef?.current?.focus();
  }

  return (
    <div
      id="masterly-search-panel"
      className={[
        'rounded-2xl border border-[#D2EBF9] bg-white',
        'p-4 text-masterly-navy shadow-[0_18px_52px_rgba(0,7,45,0.18)]',
        'sm:p-5',
      ].join(' ')}
    >
      <form role="search" onSubmit={onSubmit}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={[
              'flex h-11 min-w-0 flex-1 items-center gap-2.5',
              'rounded-lg border border-[#A9BED8] bg-white px-3',
              'transition-colors',
              'focus-within:border-masterly-navy',
              'focus-within:ring-2 focus-within:ring-masterly-navy/10',
              'sm:h-12 sm:px-3.5',
            ].join(' ')}
          >
            <Search
              size={18}
              strokeWidth={1.7}
              className="shrink-0 text-masterly-navy"
              aria-hidden="true"
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
                'text-[13px] font-normal leading-5 text-masterly-navy',
                'placeholder:text-[#8291A9] sm:text-[14px]',
                'outline-none focus:border-0 focus:outline-none',
                'focus:ring-0 focus-visible:outline-none',
                '[&::-webkit-search-cancel-button]:hidden',
              ].join(' ')}
              style={{ outline: 'none', border: 0, boxShadow: 'none' }}
            />

            {term && (
              <button
                type="button"
                onClick={clearInput}
                aria-label="Limpiar texto"
                className={[
                  'grid size-7 shrink-0 place-items-center rounded-md',
                  'text-[#72839E] transition-colors',
                  'hover:bg-masterly-subtle hover:text-masterly-navy',
                  'focus-visible:outline-2 focus-visible:outline-offset-2',
                  'focus-visible:outline-masterly-navy',
                ].join(' ')}
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className={[
              'inline-flex h-11 shrink-0 items-center justify-center',
              'rounded-lg bg-masterly-navy px-4',
              'text-[12px] font-semibold text-white',
              'transition-colors hover:bg-masterly-medium',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-masterly-navy',
              'sm:h-12 sm:px-5 sm:text-[13px]',
            ].join(' ')}
          >
            Buscar
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar buscador"
            className={[
              'grid size-8 shrink-0 place-items-center rounded-md',
              'text-masterly-navy transition-colors',
              'hover:bg-masterly-subtle',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-masterly-navy',
            ].join(' ')}
          >
            <X size={19} strokeWidth={1.8} />
          </button>
        </div>
      </form>

      {!term ? (
        <div className="mt-4 border-t border-[#E6EDF5] pt-3">
          <button
            type="button"
            onClick={() => onSelect('')}
            className={[
              'group inline-flex items-center gap-2 rounded-md',
              'py-1 text-[12px] font-semibold text-masterly-navy',
              'transition-colors hover:text-masterly-vibrant',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-masterly-navy',
            ].join(' ')}
          >
            <Grid2X2 size={14} strokeWidth={1.8} aria-hidden="true" />
            <span>Explorar catálogo completo</span>
            <ArrowRight
              size={15}
              strokeWidth={1.7}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      ) : suggestions.length > 0 ? (
        <section className="mt-4" aria-label="Sugerencias del catálogo">
          <h2 className="text-[12px] font-semibold text-masterly-navy">
            Sugerencias
          </h2>

          <ul
            className="mt-2 divide-y divide-[#E2EAF3]"
            aria-live="polite"
          >
            {suggestions.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => onSelect(product.name)}
                  className={[
                    'group flex w-full items-center gap-2.5 rounded-md',
                    'px-1 py-2.5 text-left text-[12px] leading-5',
                    'font-normal text-masterly-navy transition-colors',
                    'hover:bg-masterly-subtle sm:text-[13px]',
                  ].join(' ')}
                >
                  <Search
                    size={15}
                    strokeWidth={1.6}
                    className="shrink-0 text-[#4A6386]"
                    aria-hidden="true"
                  />

                  <span className="min-w-0 flex-1 truncate">
                    <HighlightMatch text={product.name} query={term} />
                  </span>

                  <ArrowRight
                    size={14}
                    strokeWidth={1.6}
                    className={[
                      'shrink-0 text-[#8DA1BC] transition-all',
                      'group-hover:translate-x-0.5',
                      'group-hover:text-masterly-navy',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-2 border-t border-[#E6EDF5] pt-3">
            <button
              type="button"
              onClick={() => onSelect('')}
              className={[
                'group inline-flex items-center gap-2 rounded-md',
                'py-1 text-[12px] font-semibold text-masterly-navy',
                'transition-colors hover:text-masterly-vibrant',
              ].join(' ')}
            >
              <Grid2X2 size={14} strokeWidth={1.8} aria-hidden="true" />
              <span>Explorar catálogo completo</span>
              <ArrowRight
                size={15}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </section>
      ) : (
        <section
          role="status"
          className="pt-4"
          aria-live="polite"
        >
          <div
            className={[
              'rounded-xl bg-masterly-subtle px-4 py-6 text-center',
              'sm:py-7',
            ].join(' ')}
          >
            <span
              className={[
                'mx-auto grid size-11 place-items-center',
                'rounded-full bg-[#EAF3FC] text-masterly-navy',
              ].join(' ')}
            >
              <Search size={22} strokeWidth={1.6} aria-hidden="true" />
            </span>

            <h2
              className={[
                'mt-3 text-[13px] font-semibold leading-5',
                'text-masterly-navy sm:text-[14px]',
              ].join(' ')}
            >
              No encontramos resultados para “{term}”
            </h2>

            <p className="mt-1 text-[12px] leading-5 text-[#71809A]">
              Intenta con otras palabras o explora nuestras camisas.
            </p>

            <button
              type="button"
              onClick={() => onSelect('')}
              className={[
                'mt-4 inline-flex min-h-9 items-center justify-center',
                'gap-2 rounded-md bg-masterly-navy px-4',
                'text-[12px] font-semibold text-white',
                'transition-colors hover:bg-masterly-medium',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-masterly-navy',
              ].join(' ')}
            >
              <Grid2X2 size={15} strokeWidth={1.8} aria-hidden="true" />
              <span>Ver catálogo completo</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
