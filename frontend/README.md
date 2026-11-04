# MASTERLY | Inicio A + Catálogo A.1 (React + Tailwind CSS v4)

Frontend reconstruido tomando como base los archivos entregados por el usuario.

## Uso

```bash
npm install
npm run dev
```

Visita la URL que indique Vite, normalmente `http://localhost:5173/`.
Para compilar: `npm run build`.

## Cambios

- Navbar con nombres en formato título, navegación activa azul oscuro y búsqueda por icono.
- Carrusel de tres imágenes con controles, autoplay y pausa al interactuar.
- Eliminada la barra de beneficios entre Hero y Colecciones.
- Una sola `ProductCard` para Home y Catálogo, con tejido fuera de la foto.
- Modal de talla + color antes de añadir al carrito.
- Taller y Tradición renovado, CTA blanco legible hacia `/nosotros`.
- JSX y estilos reorganizados con líneas legibles.
- Catálogo A.1 incorporado, porque el ZIP de entrada no incluía los archivos de la versión de catálogo anterior.

## Nota sobre datos e imágenes

Las fotografías siguen siendo recursos ilustrativos recortados de la referencia; el nuevo hero usa tres composiciones con estos recursos locales. Los 4 productos y sus precios son demostrativos. Las páginas Colecciones, Nosotros y Venta Corporativa siguen temporales. No se procesan pagos ni pedidos reales.

## Componentes reutilizables

`src/components/layout/Header.jsx`, `Footer.jsx`, `CartDrawer.jsx`, `src/components/ui/ProductCard.jsx`, `CollectionCard.jsx`, `SectionHeading.jsx`.

## Dónde personalizar el carrusel

`src/data/heroSlides.js` contiene las tres slides. Cambia textos, enlaces e imágenes allí.

## Datos de productos

`src/data/store.js`. En la misma estructura podrás conectar una API o un CMS.
