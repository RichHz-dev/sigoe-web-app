import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const points = [
  'Consulta por volumen',
  'Atención a negocios',
  'Coordinación de modelos',
  'Cotización personalizada',
];

export default function CorporateCTA() {
  return (
    <section id="corporativo-home" className="section-padding bg-white">
      <div className="site-container">
        <div className="grid items-center gap-8 rounded-xl border border-masterly-border bg-masterly-subtle p-7 shadow-sm sm:p-10 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3">Pedidos corporativos</p>
            <h2 className="max-w-2xl font-editorial text-[26px] font-semibold leading-tight tracking-tight text-masterly-navy sm:text-[37px]">
              ¿Buscas camisas para tu empresa, tienda o equipo?
            </h2>
            <p className="mt-4 max-w-2xl text-[13px] leading-7 text-slate-600">
              Cuéntanos qué modelos y cantidades necesitas. Nuestro equipo podrá
              revisar tu solicitud y conversar contigo sobre opciones y
              condiciones disponibles.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-[11px] font-semibold text-masterly-navy"
                >
                  <Check size={15} className="shrink-0 text-masterly-vibrant" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end">
            <Link
              to="/venta-corporativa"
              className="btn-primary w-full px-6 sm:w-auto"
            >
              Conoce venta corporativa
              <ArrowRight size={16} />
            </Link>
            <span className="text-[11px] text-slate-500">
              Formulario y proceso de cotización
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
