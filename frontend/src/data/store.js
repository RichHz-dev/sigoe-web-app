// Catálogo y cifras DEMOSTRATIVOS. Reemplaza estos datos por los reales antes de publicar.
export const collections = [
  {
    id: 'ejecutiva', name: 'Línea Ejecutiva', eyebrow: 'FORMAL', subtitle: 'Para el entorno profesional',
    image: '/images/collection-executive.webp', href: '/colecciones#ejecutiva',
  },
  {
    id: 'casual', name: 'Casual & Oxford', eyebrow: 'USO DIARIO', subtitle: 'Versatilidad para cada día',
    image: '/images/collection-casual.webp', href: '/colecciones#casual',
  },
  {
    id: 'ceremonia', name: 'Ceremonia & Gala', eyebrow: 'OCASIONES ESPECIALES', subtitle: 'Elegancia para celebrar',
    image: '/images/collection-ceremony.webp', href: '/colecciones#ceremonia',
  },
  {
    id: 'accesorios', name: 'Accesorios', eyebrow: 'DETALLES', subtitle: 'Los toques finales',
    image: '/images/collection-accessories.webp', href: '/colecciones#accesorios',
  },
];

export const products = [
  {
    id: 'mas-ox-01', sku: 'MAS-OX-01', name: 'Camisa Oxford Clásica Celeste',
    fit: 'Regular Fit', fabric: 'Oxford 100% Algodón', price: 89, oldPrice: 110,
    image: '/images/product-oxford.webp', sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Celeste', hex: '#A6E1FA' }, { name: 'Blanco', hex: '#FFFFFF' }, { name: 'Azul', hex: '#1E40AF' }],
  },
  {
    id: 'mas-tw-04', sku: 'MAS-TW-04', name: 'Camisa Ejecutiva Twill Blanco Nieve',
    fit: 'Custom Fit', fabric: 'Pima Twill 80/2', price: 110, oldPrice: 135,
    image: '/images/product-twill.webp', sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Blanco', hex: '#FFFFFF' }, { name: 'Marfil', hex: '#FDFBF7' }, { name: 'Celeste', hex: '#DBEAFE' }],
  },
  {
    id: 'mas-nv-09', sku: 'MAS-NV-09', name: 'Camisa Noche Cuello Francés Navy',
    fit: 'Slim Fit', fabric: 'Algodón Pima Navy', price: 120, oldPrice: 140,
    image: '/images/product-navy.webp', sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Navy', hex: '#001C55' }, { name: 'Negro', hex: '#111827' }, { name: 'Gris', hex: '#475569' }],
  },
  {
    id: 'mas-st-12', sku: 'MAS-ST-12', name: 'Camisa Mil Rayas Diplomática Celeste',
    fit: 'Regular Fit', fabric: 'Mil Rayas Popelina', price: 95, oldPrice: 115,
    image: '/images/product-stripes.webp', sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Celeste rayas', hex: '#B3DDF4' }, { name: 'Marino', hex: '#001C55' }, { name: 'Gris claro', hex: '#CBD5E1' }],
  },
];

export const formatSoles = (value) => `S/ ${value.toFixed(2)}`;

export const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Colecciones', to: '/colecciones' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Venta Corporativa', to: '/venta-corporativa' },
];
