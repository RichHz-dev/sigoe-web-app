# MASTERLY · Revisión de Inicio + Catálogo

## Instalación en tu proyecto `sigoe-web/frontend`

1. Haz una copia de seguridad de tu carpeta `frontend` actual.
2. Puedes usar este proyecto como frontend independiente o copiar sus `src`, `public`, `index.html` y `vite.config.js` dentro de tu proyecto existente.
3. Si decides copiar solo el código, **no reemplaces** tu `package.json` ni tu `package-lock.json` actuales (los tuyos ya contienen las dependencias).
4. Ejecuta desde `frontend`:

```bash
npm install
npm run dev
npm run build
```

## Cambios visuales

- Links del navbar capitalizados; activo en azul marino, no celeste.
- Buscador oculto detrás de icono, con panel que se despliega al pulsarlo.
- Hero con tres slides, flechas, indicadores y avance automático cada 6.5 segundos; pausa al colocar el cursor o enfocar controles.
- Se eliminó por completo TrustBar entre Hero y Colecciones.
- `ProductCard` único para Best Sellers y Catálogo, etiqueta de tejido en zona blanca, no sobre la imagen.
- Modal de talla y color antes de añadir a la bolsa.
- Sección Taller como franja azul marino editorial; botón blanco contrastado y enlace a `/nosotros`.
- Componentes principales reindentados.

## Notas importantes

- El ZIP recibido contenía la Home original y la ruta `/catalogo` como `ComingSoonPage`. Por eso se incorporó una implementación compatible del Catálogo A.1 con los **cuatro productos demostrativos disponibles**. No inventamos los 48 productos de la referencia.
- Las tres imágenes del hero son **composiciones provisionales** construidas con imágenes del proyecto compartido. Reemplázalas en `public/images` por fotografía oficial de alta resolución para publicación.
- Colecciones, Nosotros y Venta Corporativa aún tienen pantallas temporales.
- Precios, fichas e imágenes son de demostración. No hay backend ni pagos.
- Los iconos sociales del Footer usan texto `fb` e `ig` de manera intencional, porque Lucide v1 no exporta logos de marcas.

## Modificar carrusel

`src/data/heroSlides.js` contiene el título, subtítulo, texto, imagen y enlaces para cada slide. No se requieren cambios dentro de `Hero.jsx` para reemplazar las fotos.

## Modificar tarjetas

`src/components/ui/ProductCard.jsx` se utiliza en Inicio y Catálogo; `src/data/store.js` contiene los productos demostrativos. La bolsa global está en `src/context/CartContext.jsx`.
