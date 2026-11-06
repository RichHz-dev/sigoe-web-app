import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import SearchPanel from '../search/SearchPanel';
import { navLinks } from '../../data/store';
import { useCart } from '../../context/CartContext';

function NavigationLink({ item, mobile = false, onClick }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      onClick={onClick}
      className={({ isActive }) => [
        mobile
          ? 'block border-b border-masterly-border py-4 text-sm'
          : 'relative py-2 text-[12px] font-semibold tracking-[.01em]',
        'transition-colors duration-200',
        isActive
          ? 'text-masterly-navy'
          : 'text-slate-600 hover:text-masterly-navy',
        !mobile && isActive
          ? 'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-masterly-navy'
          : '',
      ].join(' ')}
    >
      {item.label}
    </NavLink>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const searchInputRef = useRef(null);
  const searchPanelRef = useRef(null);
  const searchTriggerRef = useRef(null);

  const navigate = useNavigate();
  const { quantity, setIsOpen } = useCart();

  // Escape cierra cualquiera de los dos paneles.
  useEffect(() => {
    if (!menuOpen && !searchOpen) return undefined;

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen, searchOpen]);

  // Abre el buscador con el cursor preparado para escribir.
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // Cierra la búsqueda al pulsar fuera del panel o de su botón.
  useEffect(() => {
    if (!searchOpen) return undefined;

    function handleOutsideClick(event) {
      const insidePanel = searchPanelRef.current?.contains(event.target);
      const onTrigger = searchTriggerRef.current?.contains(event.target);

      if (!insidePanel && !onTrigger) {
        setSearchOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [searchOpen]);

  function goToCatalog(term = query) {
    const trimmed = term.trim();
    const destination = trimmed
      ? `/catalogo?q=${encodeURIComponent(trimmed)}`
      : '/catalogo';

    setSearchOpen(false);
    setMenuOpen(false);
    navigate(destination);
  }

  function submitSearch(event) {
    event.preventDefault();
    goToCatalog();
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-masterly-border bg-white/95 shadow-sm backdrop-blur-md">
        <div className="site-container flex h-[76px] items-center justify-between gap-3 lg:h-[82px]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="icon-button lg:hidden"
            >
              <Menu size={22} />
            </button>
            <BrandLogo variant="navy_h" imageClassName="h-16 md:h-20" />
          </div>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-5 lg:flex xl:gap-8"
          >
            {navLinks.map((item) => (
              <NavigationLink key={item.to} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              ref={searchTriggerRef}
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen((open) => !open);
              }}
              aria-label="Buscar productos"
              aria-expanded={searchOpen}
              aria-controls="masterly-search-panel"
              className="icon-button"
            >
              <Search size={21} strokeWidth={1.7} />
            </button>
            <Link
              to="/cuenta"
              aria-label="Mi cuenta"
              className="icon-button"
            >
              <UserRound size={21} strokeWidth={1.7} />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={`Abrir bolsa de compras, ${quantity} artículos`}
              className="icon-button relative"
            >
              <ShoppingBag size={21} strokeWidth={1.7} />
              {quantity > 0 && (
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-masterly-navy px-1 text-[9px] font-bold text-white">
                  {quantity > 99 ? '99+' : quantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div
            ref={searchPanelRef}
            id="masterly-search-panel"
            className="absolute left-1/2 top-full z-50 w-[calc(100%-1.5rem)] max-w-[680px] -translate-x-1/2 pt-2 sm:w-[calc(100%-3rem)] sm:pt-3"
          >
            <SearchPanel
              query={query}
              onQueryChange={setQuery}
              onSubmit={submitSearch}
              onSelect={goToCatalog}
              onClose={() => setSearchOpen(false)}
              inputRef={searchInputRef}
            />
          </div>
        )}
      </header>

      {menuOpen && createPortal(
        <>
          <div
            className="fixed inset-0 z-[90] bg-masterly-darkest/60 lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
            className="fixed inset-y-0 left-0 z-[91] w-[min(88vw,360px)] overflow-y-auto bg-white p-6 shadow-2xl lg:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <BrandLogo onClick={() => setMenuOpen(false)} />
              <button
                type="button"
                className="icon-button"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X size={23} />
              </button>
            </div>
            <nav aria-label="Navegación móvil">
              {navLinks.map((item) => (
                <NavigationLink
                  key={item.to}
                  item={item}
                  mobile
                  onClick={() => setMenuOpen(false)}
                />
              ))}
            </nav>
            <form onSubmit={submitSearch} className="mt-8 flex gap-2">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Buscar productos"
                placeholder="Buscar camisas..."
                className="min-w-0 flex-1 border border-masterly-border px-3 py-2 text-sm"
              />
              <button type="submit" className="btn-primary !px-3">
                <Search size={17} />
              </button>
            </form>
          </aside>
        </>,
        document.body,
      )}
    </>
  );
}
