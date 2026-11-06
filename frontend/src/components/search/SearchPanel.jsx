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

function CatalogLink({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group inline-flex items-center gap-2 rounded-md py-1',
        'font-body text-[12px] font-semibold leading-5',
        'text-masterly-navy transition-colors duration-200',
        'hover:text-masterly-vibrant',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-masterly-navy',
      ].join(' ')}
    >
      <Grid2X2 size={15} strokeWidth={1.8} aria-hidden="true" />
      Explorar catálogo completo
      <ArrowRight
        size={15}
        strokeWidth={1.7}
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      />
    </button>
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
      className={[
        'rounded-2xl border border-masterly-border bg-white',
        'p-4 font-body text-masterly-navy',
        'shadow-[0_18px_52px_rgba(0,7,45,0.18)]',
        'sm:p-5',
      ].join(' ')}
    >
      <form role="search" onSubmit={onSubmit}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={[
              'flex h-11 min-w-0 flex-1 items-center gap-2.5',
              'rounded-lg border border-[#A9BED8] bg-white px-3',
              'transition-colors focus-within:border-masterly-navy',
              'focus-within:ring-2 focus-within:ring-masterly-navy/10',
              'sm:h-12 sm:px-3.5',
            ].join(' ')}
          >
            <Search
              size={19}
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
                'font-body text-[13px] font-medium leading-5',
                'text-masterly-navy placeholder:font-normal',
                'placeholder:text-[#8291A9] sm:text-[13px]',
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
              'font-body text-[13px] font-semibold leading-5 text-white',
              'transition-colors hover:bg-masterly-medium',
              'sm:h-12 sm:px-5',
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
            ].join(' ')}
          >
            <X size={19} strokeWidth={1.8} />
          </button>
        </div>
      </form>

      {!term ? (
        <div className="mt-4 border-t border-[#E6EDF5] pt-3">
          <CatalogLink onClick={() => onSelect('')} />
        </div>
      ) : suggestions.length > 0 ? (
        <section className="mt-4" aria-label="Sugerencias del catálogo">
          <h2 className="font-body text-[12px] font-semibold text-masterly-navy">
            Sugerencias
          </h2>
          <ul className="mt-2 divide-y divide-[#E2EAF3]" aria-live="polite">
            {suggestions.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => onSelect(product.name)}
                  className={[
                    'group flex w-full items-center gap-2.5 rounded-md',
                    'px-1 py-2.5 text-left',
                    'font-body text-[12px] font-normal leading-5',
                    'text-masterly-navy transition-colors',
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
                      'shrink-0 text-[#8DA1BC] transition-transform',
                      'group-hover:translate-x-1',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-[#E6EDF5] pt-3">
            <CatalogLink onClick={() => onSelect('')} />
          </div>
        </section>
      ) : (
        <section role="status" aria-live="polite" className="pt-5">
          <div className="px-3 py-4 text-center sm:py-5">
            <span
              className={[
                'relative mx-auto grid size-14 place-items-center',
                'rounded-full bg-[#F2F7FC] text-masterly-navy',
              ].join(' ')}
            >
              <Search size={29} strokeWidth={1.6} aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute right-0 top-1 h-2 w-[3px] rotate-45 rounded-full bg-masterly-sky"
              />
              <span
                aria-hidden="true"
                className="absolute right-2 top-0 h-[7px] w-[3px] rotate-12 rounded-full bg-masterly-sky"
              />
            </span>
            <h2
              className={[
                'mt-3 font-body text-[13px] font-semibold leading-5',
                'text-masterly-darkest sm:text-[14px]',
              ].join(' ')}
            >
              No encontramos resultados para “{term}”
            </h2>
            <p
              className={[
                'mt-1 font-body text-[12px] font-normal leading-5',
                'text-[#71809A]',
              ].join(' ')}
            >
              Intenta con otras palabras o explora nuestras camisas.
            </p>
            <button
              type="button"
              onClick={() => onSelect('')}
              className={[
                'mt-5 inline-flex min-h-11 items-center justify-center',
                'gap-2.5 rounded-lg border border-[#17366A]',
                'bg-masterly-navy px-6 py-2.5',
                'font-body text-[13px] font-semibold leading-5 text-white',
                'shadow-[0_3px_8px_rgba(0,7,45,0.16)]',
                'transition-colors hover:bg-masterly-medium',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-masterly-navy',
              ].join(' ')}
            >
              <Grid2X2 size={17} strokeWidth={1.9} aria-hidden="true" />
              <span>Ver catálogo completo</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
