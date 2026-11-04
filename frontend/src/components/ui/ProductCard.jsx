import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { formatSoles } from '../../data/store';
import { useCart } from '../../context/CartContext';

function ColorOptions({ product, selected, onSelect }) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label={`Colores de ${product.name}`}>
      {product.colors.map((option) => (
        <button
          key={option.name}
          type="button"
          onClick={() => onSelect(option.name)}
          title={option.name}
          aria-label={`Color ${option.name}`}
          aria-pressed={selected === option.name}
          className={`h-[17px] w-[17px] rounded-full border border-slate-300 transition-shadow ${
            selected === option.name
              ? 'ring-2 ring-masterly-navy ring-offset-2'
              : 'hover:ring-1 hover:ring-masterly-navy'
          }`}
          style={{ backgroundColor: option.hex }}
        />
      ))}
    </div>
  );
}

function QuickAddDialog({ product, color, setColor, onClose, onAdd }) {
  const [size, setSize] = useState('');
  const [error, setError] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  const submit = () => {
    if (!size) {
      setError(true);
      return;
    }
    onAdd(size, color);
  };

  return createPortal(
    <div className="fixed inset-0 z-[110] grid place-items-center px-4 py-6">
      <div
        className="absolute inset-0 bg-masterly-darkest/70"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`quick-add-${product.id}`}
        className="relative w-full max-w-md rounded-md bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow mb-2">Añadir a la bolsa</p>
            <h2
              id={`quick-add-${product.id}`}
              className="font-editorial text-2xl font-semibold text-masterly-navy"
            >
              {product.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar selección"
            className="icon-button"
          >
            <X size={21} />
          </button>
        </div>
        <div className="flex gap-4 border-y border-masterly-border py-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-28 w-28 rounded-sm object-cover"
          />
          <div className="min-w-0 space-y-2 text-sm">
            <p className="text-xs text-slate-500">{product.fabric}</p>
            <p className="font-bold">{formatSoles(product.price)}</p>
            <p className="text-xs text-slate-500">{product.fit}</p>
          </div>
        </div>
        <div className="mt-5">
          <p className="mb-3 text-sm font-semibold">Selecciona una talla</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Tallas disponibles">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSize(option);
                  setError(false);
                }}
                aria-pressed={size === option}
                className={`h-10 min-w-10 rounded-sm border px-3 text-xs font-semibold ${
                  size === option
                    ? 'border-masterly-navy bg-masterly-navy text-white'
                    : 'border-masterly-border bg-white hover:border-masterly-navy'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {error && (
            <p role="alert" className="mt-2 text-xs font-semibold text-red-700">
              Debes elegir una talla.
            </p>
          )}
        </div>
        <div className="mt-5">
          <p className="mb-3 text-sm font-semibold">Color</p>
          <ColorOptions product={product} selected={color} onSelect={setColor} />
        </div>
        <button
          type="button"
          onClick={submit}
          className="btn-primary mt-8 w-full"
        >
          <ShoppingBag size={17} />
          Añadir a la bolsa
        </button>
      </div>
    </div>,
    document.body,
  );
}

// Única tarjeta visual utilizada en Home (Best Sellers) y Catálogo.
export default function ProductCard({ product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [favorite, setFavorite] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { addItem } = useCart();

  const closeDialog = useCallback(() => setDialogOpen(false), []);

  const addProduct = (size, selectedColor) => {
    addItem(product, size, selectedColor);
    setDialogOpen(false);
  };

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-masterly-border/80 bg-white shadow-[0_2px_9px_rgba(0,28,85,.035)] transition-shadow hover:shadow-[0_12px_30px_rgba(0,28,85,.10)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f6f8fb]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            type="button"
            aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            aria-pressed={favorite}
            onClick={() => setFavorite((value) => !value)}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-masterly-navy shadow-sm transition-colors hover:text-red-600"
          >
            <Heart
              size={19}
              strokeWidth={1.7}
              fill={favorite ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5">
          {/* Tejido debajo de la fotografía, nunca sobre la imagen. */}
          <p className="mb-2 w-fit rounded-sm bg-masterly-subtle px-2 py-1 text-[10px] font-semibold text-masterly-navy">
            {product.fabric}
          </p>
          <h3 className="min-h-[42px] text-[13px] font-semibold leading-[1.55] text-masterly-navy sm:text-sm">
            {product.name}
          </h3>
          <p className="mt-1 text-[11px] text-slate-500">{product.fit}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            <strong className="text-[15px] font-bold text-masterly-navy">
              {formatSoles(product.price)}
            </strong>
            {product.oldPrice > product.price && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatSoles(product.oldPrice)}
              </span>
            )}
          </div>
          <div className="mt-auto flex items-end justify-between gap-2 pt-4">
            <ColorOptions product={product} selected={color} onSelect={setColor} />
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              title="Seleccionar talla y añadir a la bolsa"
              aria-label={`Seleccionar talla y añadir ${product.name} a la bolsa`}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-masterly-navy text-white shadow-sm transition-colors hover:bg-masterly-medium"
            >
              <ShoppingBag size={17} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </article>

      {dialogOpen && (
        <QuickAddDialog
          product={product}
          color={color}
          setColor={setColor}
          onClose={closeDialog}
          onAdd={addProduct}
        />
      )}
    </>
  );
}
