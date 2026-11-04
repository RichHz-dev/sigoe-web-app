import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import CatalogHero from '../components/catalog/CatalogHero';
import CatalogFilters, {
  defaultCatalogFilters,
} from '../components/catalog/CatalogFilters';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/store';

const PAGE_SIZE = 4;

// Categorías de ejemplo; confirmar con productos reales antes de publicar.
const productCategories = {
  'mas-ox-01': 'Casual & Oxford',
  'mas-tw-04': 'Ejecutiva',
  'mas-nv-09': 'Ceremonia & Gala',
  'mas-st-12': 'Ejecutiva',
};

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim().toLocaleLowerCase('es');
  const [filters, setFilters] = useState(defaultCatalogFilters);
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const matchingProducts = useMemo(() => {
    const matching = products.filter((product) => {
      const text = `${product.name} ${product.fabric} ${product.fit}`.toLocaleLowerCase('es');
      const matchesText = !query || text.includes(query);
      const matchesCategory = filters.category === 'all'
        || productCategories[product.id] === filters.category;
      const matchesFit = !filters.fits.length
        || filters.fits.includes(product.fit);
      const matchesFabric = !filters.fabrics.length
        || filters.fabrics.some((fabric) => product.fabric.toLowerCase().includes(fabric.toLowerCase()));
      const matchesColor = !filters.colors.length
        || filters.colors.some((color) => product.colors.some((option) =>
          option.name.toLowerCase().includes(color.toLowerCase())
        ));
      const matchesPrice = product.price >= filters.minPrice
        && product.price <= filters.maxPrice;

      return matchesText && matchesCategory && matchesFit
        && matchesFabric && matchesColor && matchesPrice;
    });

    if (sortBy === 'price-asc') matching.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') matching.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') matching.sort((a, b) => a.name.localeCompare(b.name));
    return matching;
  }, [filters, query, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [filters, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(matchingProducts.length / PAGE_SIZE));
  const visibleProducts = matchingProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <>
      <CatalogHero />
      <div className="bg-masterly-subtle pb-20">
        <div className="site-container">
          <div className="border-b border-masterly-border py-5 text-xs text-slate-500">
            <Link to="/" className="hover:text-masterly-navy">Inicio</Link>
            <span className="mx-2">›</span>
            <span className="font-semibold text-masterly-navy">Catálogo</span>
          </div>

          <div className="flex items-center justify-between gap-3 py-5 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="btn-secondary !min-h-10 !px-4"
            >
              <SlidersHorizontal size={16} />
              Filtros
            </button>
            <span className="text-xs text-slate-600">
              {matchingProducts.length} productos
            </span>
          </div>

          <div className="grid gap-6 rounded-lg border border-masterly-border/80 bg-white p-5 sm:p-7 lg:grid-cols-[205px_minmax(0,1fr)] lg:gap-8">
            <div className="hidden lg:block">
              <CatalogFilters
                value={filters}
                onChange={setFilters}
                onClear={() => setFilters({ ...defaultCatalogFilters })}
              />
            </div>

            <div className="min-w-0">
              <div className="mb-5 hidden items-center justify-between gap-4 lg:flex">
                <p className="text-sm text-slate-600">
                  {matchingProducts.length} productos
                  {query ? ` para “${query}”` : ''}
                </p>
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  Ordenar por:
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="rounded-sm border border-masterly-border bg-white px-2 py-2 text-xs text-masterly-navy"
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                    <option value="name">Nombre</option>
                  </select>
                </label>
              </div>

              <label className="mb-4 flex items-center justify-end gap-2 text-xs lg:hidden">
                Ordenar por:
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="border border-masterly-border p-2"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Menor precio</option>
                  <option value="price-desc">Mayor precio</option>
                  <option value="name">Nombre</option>
                </select>
              </label>

              {visibleProducts.length ? (
                <div className="grid grid-cols-1 gap-5 min-[470px]:grid-cols-2 lg:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-sm bg-masterly-subtle px-6 py-16 text-center">
                  <h2 className="font-editorial text-2xl">Sin resultados</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Prueba con otros filtros o un término de búsqueda diferente.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilters({ ...defaultCatalogFilters })}
                    className="btn-primary mt-5"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}

              {totalPages > 1 && (
                <nav aria-label="Paginación" className="mt-8 flex justify-center gap-2">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((value) => value - 1)}
                    aria-label="Página anterior"
                    className="border border-masterly-border p-2 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() => setPage(number)}
                      aria-current={page === number ? 'page' : undefined}
                      className={`h-9 w-9 border text-xs font-semibold ${
                        page === number
                          ? 'border-masterly-navy bg-masterly-navy text-white'
                          : 'border-masterly-border bg-white text-masterly-navy'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => setPage((value) => value + 1)}
                    aria-label="Página siguiente"
                    className="border border-masterly-border p-2 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div
            className="absolute inset-0 bg-masterly-darkest/60"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-[min(90vw,360px)] overflow-y-auto bg-white p-6 shadow-2xl">
            <CatalogFilters
              value={filters}
              onChange={setFilters}
              onClear={() => setFilters({ ...defaultCatalogFilters })}
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
