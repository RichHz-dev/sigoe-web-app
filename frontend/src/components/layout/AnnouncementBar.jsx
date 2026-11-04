import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  return (
    <div className="bg-masterly-darkest text-[10px] text-white sm:text-[11px]">
      <div className="site-container flex min-h-9 items-center justify-center gap-3 py-1.5 lg:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="shrink-0 rounded-sm bg-masterly-vibrant px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em]">
            Atelier
          </span>
          <span className="text-masterly-sky">
            Envíos a todo el Perú · Venta directa y corporativa
          </span>
        </div>
        <Link
          to="/venta-corporativa"
          className="hidden items-center gap-2 text-masterly-sky transition-colors hover:text-white lg:inline-flex"
        >
          <Building2 size={13} aria-hidden="true" />
          Atención a empresas y pedidos por mayor
        </Link>
      </div>
    </div>
  );
}
