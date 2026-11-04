import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';

// Lucide React v1 ya no incluye iconos de marcas (Facebook, Instagram, etc.).
// Los dibujamos localmente para no añadir otra dependencia.
function FacebookIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-masterly-navy bg-masterly-darkest text-slate-300">
      <div className="site-container pt-16 pb-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 lg:col-span-4">
            
            <BrandLogo variant="white_h" imageClassName="h-16 md:h-20" />

            <p className="max-w-sm text-xs leading-7 text-slate-400">
              Camisería para caballero con una propuesta de elegancia contemporánea y atención a pedidos corporativos desde Gamarra, Lima.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-masterly-navy text-masterly-sky transition hover:bg-masterly-vibrant">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-masterly-navy text-masterly-sky transition hover:bg-masterly-vibrant">
                <InstagramIcon />
              </a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">Explorar</h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><Link className="hover:text-white" to="/">Inicio</Link></li>
              <li><Link className="hover:text-white" to="/catalogo">Catálogo</Link></li>
              <li><Link className="hover:text-white" to="/colecciones">Colecciones</Link></li>
              <li><Link className="hover:text-white" to="/nosotros">Nosotros</Link></li>
              <li><Link className="hover:text-white" to="/venta-corporativa">Venta corporativa</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">Atención al cliente</h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><Link to="/ayuda" className="hover:text-white">Guía de tallas</Link></li>
              <li><Link to="/ayuda" className="hover:text-white">Envíos y tiempos</Link></li>
              <li><Link to="/ayuda" className="hover:text-white">Cambios y devoluciones</Link></li>
              <li><Link to="/ayuda" className="hover:text-white">Preguntas frecuentes</Link></li>
              <li><Link to="/venta-corporativa" className="inline-flex items-center gap-1 text-masterly-sky hover:text-white">Pedidos por mayor <ArrowUpRight size={12} /></Link></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">Contacto y showroom</h3>
            <ul className="space-y-4 text-xs leading-6 text-slate-400">
              <li className="flex gap-3"><MapPin size={16} className="mt-1 shrink-0 text-masterly-sky" /> Gamarra, La Victoria, Lima — Perú</li>
              <li className="flex gap-3"><Mail size={16} className="shrink-0 text-masterly-sky" /> Contacto comercial por confirmar</li>
              <li className="flex gap-3"><Phone size={16} className="shrink-0 text-masterly-sky" /> Número de atención por confirmar</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-8 text-[11px] text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} MASTERLY · Sitio en desarrollo.</p>
          <p>Diseño editorial · Camisería masculina · Perú</p>
        </div>
      </div>
    </footer>
  );
}
