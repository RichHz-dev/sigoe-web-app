# MASTERLY — Home A desde cero, sobre tu Vite existente

## Estado actual

Tú ya creaste `sigoe-web/frontend` con la plantilla React de Vite. **No repitas `npm create vite`.**

## 1. Cierra Vite temporalmente

En la terminal que muestra `http://localhost:5174/`, pulsa `Ctrl + C`. En Git Bash puedes abrir otra terminal con `+` sin detenerla si lo prefieres.

## 2. Entra en la carpeta correcta

```bash
cd ~/Desktop/sigoe-web/frontend
pwd
```

Debes ver `package.json`, `src`, `public`, `vite.config.js`.

## 3. Instala las dependencias

```bash
npm install tailwindcss @tailwindcss/vite lucide-react react-router-dom
```

Vite/React ya están instalados si tienes la plantilla React; la orden de arriba añade las dependencias del diseño.

## 4. Realiza una copia de seguridad y fusiona los archivos

- Extrae `MASTERLY_Home_A_Tailwind_v4_para_frontend.zip` en una carpeta temporal.
- Copia **el contenido de esa carpeta** dentro de `sigoe-web/frontend/`, manteniendo `src/` y `public/`.
- Cuando Windows pregunte si deseas reemplazar `index.html`, `vite.config.js` y los archivos de Vite `src/App.jsx` y `src/main.jsx`, acepta. Son los archivos de plantilla.
- Conserva `package.json` y `package-lock.json` de tu proyecto existente; este paquete **no** los reemplaza.
- El `src/index.css` viejo y `src/App.css` viejo pueden quedarse sin usarse porque el nuevo `src/main.jsx` importa `src/styles/index.css`. Puedes eliminarlos después.

**La carpeta correcta es `frontend/src/components/`, NO `frontend/frontend/src/components/`.**

## 5. Ejecuta el proyecto

```bash
npm run dev
```

El puerto será 5173, 5174 o el siguiente disponible. Abre la URL exacta del terminal.

## 6. Verifica Tailwind v4

1. En `src/styles/index.css`, verifica `@import "tailwindcss";` y `@theme`.
2. En `vite.config.js`, verifica el plugin `tailwindcss()`.
3. Abre la página: debe verse header blanco, hero azul marino y cuatro tarjetas de colección.

## 7. Comprueba la funcionalidad

- El logo debe llevar a Inicio.
- Menú responsive (prueba ancho 390 px).
- El botón de bolsa abre panel lateral.
- En Best Sellers, elegir talla y color y pulsar Añadir debe abrir la bolsa.
- Puedes aumentar, disminuir y quitar artículos.
- Al recargar, la bolsa se conserva en localStorage.
- Catálogo, Colecciones, Nosotros y Venta Corporativa muestran una página temporal, no un error 404. Las implementaremos a continuación.

## 8. Revisa compilación

```bash
npm run build
```

Si falla, revisa el error en consola e informa el texto exacto (no solo captura).

## 9. Archivos que modificarás frecuentemente

| Archivo | Qué controla |
|---|---|
| `src/styles/index.css` | Tokens Tailwind v4 y estilos base |
| `src/data/store.js` | Productos, colecciones, rutas y datos provisionales |
| `src/components/layout/Header.jsx` | Navegación para todas las páginas |
| `src/components/layout/Footer.jsx` | Pie de página compartido |
| `src/components/ui/ProductCard.jsx` | Tarjetas en Inicio y luego Catálogo |
| `src/components/ui/CollectionCard.jsx` | Tarjetas en Inicio y Colecciones |
| `src/components/home/Hero.jsx` | Imagen, textos y acciones del hero |
| `src/pages/HomePage.jsx` | Orden de las secciones de Inicio |

## Consideraciones importantes

- Las 10 imágenes `.webp` son **material de referencia provisional** recortado de los prototipos. No son fotografías originales aprobadas por MASTERLY, ni son suficientes para producción con calidad premium.
- Los precios, SKUs, beneficios, perfiles comerciales y productos de ejemplo son ficticios. Hay que validarlos antes de publicar.
- El carrito es únicamente de frontend y no genera transacciones reales.
- Los enlaces de redes sociales son genéricos hasta obtener los oficiales.
- La fuente Playfair/Plus Jakarta Sans se descarga en el navegador de Google Fonts; necesita conexión a internet. Si quieres operación offline, usa fuentes con licencia adecuada alojadas en tu proyecto.

## Próximos pasos

1. Aprobar visualmente la Home a partir del prototipo A.
2. Construir Catálogo A.1 reutilizando SiteLayout y ProductCard.
3. Colecciones C.2 reutilizando CollectionCard.
4. Nosotros N.1 (más secciones puntuales del N.3 si se aprueban).
5. Venta corporativa, pendiente de selección final.
