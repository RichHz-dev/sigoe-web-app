import { useEffect, useRef } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatSoles } from '../../data/store';

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, quantity, subtotal, updateQuantity, removeItem } = useCart();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'Tab') {
        const drawer = document.getElementById('masterly-cart-panel');
        const elements = Array.from(drawer?.querySelectorAll('button:not([disabled]), a[href]') ?? []);
        if (!elements.length) return;
        if (event.shiftKey && document.activeElement === elements[0]) { event.preventDefault(); elements.at(-1).focus(); }
        if (!event.shiftKey && document.activeElement === elements.at(-1)) { event.preventDefault(); elements[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.();
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100]" role="presentation">
      <div className="absolute inset-0 bg-masterly-darkest/60" onClick={() => setIsOpen(false)} aria-hidden="true" />
      <aside id="masterly-cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title" className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-masterly-border px-6 py-5">
          <div><span className="eyebrow">MASTERLY</span><h2 id="cart-title" className="font-editorial text-2xl font-semibold">Tu bolsa de compras ({quantity})</h2></div>
          <button ref={closeButtonRef} aria-label="Cerrar bolsa" onClick={() => setIsOpen(false)} className="p-2 hover:text-masterly-vibrant"><X size={22}/></button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center"><ShoppingBag size={42} className="text-masterly-vibrant"/><h3 className="font-editorial text-xl">Tu bolsa está vacía</h3><p className="text-sm text-slate-500">Explora la colección y encuentra tu siguiente camisa favorita.</p><button className="btn-primary" onClick={() => setIsOpen(false)}>Seguir explorando</button></div>
          ) : items.map((item) => (
            <div className="flex gap-4 border-b border-masterly-border/70 pb-5" key={item.key}>
              <img className="h-28 w-24 shrink-0 rounded-sm bg-masterly-subtle object-contain" src={item.image} alt={item.name}/>
              <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{item.name}</p><p className="mt-1 text-xs text-slate-500">Talla {item.size} · {item.color}</p><p className="mt-2 text-sm font-bold">{formatSoles(item.price)}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="flex h-8 items-center border border-masterly-border"><button aria-label={`Disminuir cantidad de ${item.name}`} onClick={() => updateQuantity(item.key, item.quantity - 1)} className="px-2"><Minus size={14}/></button><span className="min-w-6 text-center text-sm">{item.quantity}</span><button aria-label={`Aumentar cantidad de ${item.name}`} onClick={() => updateQuantity(item.key, item.quantity + 1)} className="px-2"><Plus size={14}/></button></div>
                  <button onClick={() => removeItem(item.key)} aria-label={`Quitar ${item.name}`} className="p-2 text-slate-500 hover:text-red-700"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-masterly-border bg-masterly-subtle px-6 py-6">
          <div className="mb-4 flex justify-between text-sm font-bold"><span>Subtotal demostrativo</span><span>{formatSoles(subtotal)}</span></div>
          <p className="mb-4 text-xs leading-relaxed text-slate-600">Esta bolsa es una demostración de frontend. No se procesan pagos ni se generan pedidos reales.</p>
          <button onClick={() => setIsOpen(false)} className="btn-primary w-full">Continuar explorando</button>
        </div>
      </aside>
    </div>
  );
}
