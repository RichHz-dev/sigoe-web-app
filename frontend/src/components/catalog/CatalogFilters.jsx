import { X } from 'lucide-react';

const categories = [
  ['all', 'Todas las camisas'],
  ['Ejecutiva', 'Ejecutiva'],
  ['Casual & Oxford', 'Casual & Oxford'],
  ['Ceremonia & Gala', 'Ceremonia & Gala'],
  ['Accesorios', 'Accesorios'],
];
const fits = ['Regular Fit', 'Slim Fit', 'Custom Fit'];
const fabrics = ['Oxford', 'Twill', 'Pima', 'Popelina'];
const colors = [
  ['Celeste', '#A6E1FA'],
  ['Blanco', '#FFFFFF'],
  ['Navy', '#001C55'],
  ['Gris', '#9CA3AF'],
];

function FilterGroup({ title, children }) {
  return (
    <fieldset className="border-b border-slate-100 pb-5">
      <legend className="mb-3 text-xs font-bold text-masterly-navy">{title}</legend>
      {children}
    </fieldset>
  );
}

function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-xs text-slate-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="accent-masterly-navy"
      />
      {label}
    </label>
  );
}

export const defaultCatalogFilters = {
  category: 'all',
  fits: [],
  fabrics: [],
  colors: [],
  minPrice: 0,
  maxPrice: 200,
};

export default function CatalogFilters({ value, onChange, onClear, onClose }) {
  const toggleArray = (key, option, checked) => {
    onChange({
      ...value,
      [key]: checked
        ? [...value[key], option]
        : value[key].filter((item) => item !== option),
    });
  };

  return (
    <aside className="w-full space-y-5" aria-label="Filtros de productos">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold">Filtros</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] font-semibold text-masterly-vibrant hover:underline"
          >
            Limpiar filtros
          </button>
          {onClose && (
            <button type="button" onClick={onClose} aria-label="Cerrar filtros">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <FilterGroup title="Categoría">
        <div className="space-y-1">
          {categories.map(([id, label]) => (
            <label key={id} className="flex cursor-pointer items-center gap-2 py-1 text-xs text-slate-600">
              <input
                type="radio"
                name="catalog-category"
                checked={value.category === id}
                onChange={() => onChange({ ...value, category: id })}
                className="accent-masterly-navy"
              />
              {label}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Ajuste">
        {fits.map((fit) => (
          <FilterCheckbox
            key={fit}
            label={fit}
            checked={value.fits.includes(fit)}
            onChange={(checked) => toggleArray('fits', fit, checked)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Tela">
        {fabrics.map((fabric) => (
          <FilterCheckbox
            key={fabric}
            label={fabric}
            checked={value.fabrics.includes(fabric)}
            onChange={(checked) => toggleArray('fabrics', fabric, checked)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2 pt-1">
          {colors.map(([label, hex]) => (
            <button
              key={label}
              type="button"
              title={label}
              aria-label={`Filtrar color ${label}`}
              aria-pressed={value.colors.includes(label)}
              onClick={() => {
                toggleArray('colors', label, !value.colors.includes(label));
              }}
              className={`h-6 w-6 rounded-full border border-slate-300 ${
                value.colors.includes(label)
                  ? 'ring-2 ring-masterly-navy ring-offset-2'
                  : ''
              }`}
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Rango de precio">
        <div className="space-y-3">
          <label className="block text-[11px] text-slate-500">
            Precio mínimo: S/ {value.minPrice}
            <input
              type="range"
              min="0"
              max={value.maxPrice}
              step="5"
              value={value.minPrice}
              onChange={(event) => onChange({ ...value, minPrice: Number(event.target.value) })}
              className="mt-2 w-full accent-masterly-navy"
            />
          </label>
          <label className="block text-[11px] text-slate-500">
            Precio máximo: S/ {value.maxPrice}
            <input
              type="range"
              min={value.minPrice}
              max="200"
              step="5"
              value={value.maxPrice}
              onChange={(event) => onChange({ ...value, maxPrice: Number(event.target.value) })}
              className="mt-2 w-full accent-masterly-navy"
            />
          </label>
        </div>
      </FilterGroup>
    </aside>
  );
}
