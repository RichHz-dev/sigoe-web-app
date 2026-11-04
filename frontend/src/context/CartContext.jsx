import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'masterly-cart-demo-v1';
const CartContext = createContext(null);

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Almacenamiento bloqueado: el carrito funciona durante la sesión.
    }
  }, [items]);

  const addItem = useCallback((product, size, color) => {
    const key = `${product.id}::${size}::${color}`;
    setItems((current) => {
      const previous = current.find((item) => item.key === key);
      if (previous) {
        return current.map((item) => (
          item.key === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }
      return [
        ...current,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          size,
          color,
          quantity: 1,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((key, nextQuantity) => {
    setItems((current) => current
      .map((item) => (
        item.key === key ? { ...item, quantity: nextQuantity } : item
      ))
      .filter((item) => item.quantity > 0));
  }, []);

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const quantity = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce(
    (amount, item) => amount + item.price * item.quantity,
    0,
  );

  const value = useMemo(() => ({
    items,
    isOpen,
    setIsOpen,
    addItem,
    updateQuantity,
    removeItem,
    quantity,
    subtotal,
  }), [
    items,
    isOpen,
    addItem,
    updateQuantity,
    removeItem,
    quantity,
    subtotal,
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart requiere CartProvider');
  return context;
}
