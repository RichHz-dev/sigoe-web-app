import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { number: '01', label: 'Selección textil' },
  { number: '02', label: 'Confección' },
  { number: '03', label: 'Detalles finales' },
];

export default function HeritageSection() {
  return (
    <section
      id="taller-home"
      className="relative overflow-hidden bg-masterly-navy py-16 text-white lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#a6e1fa 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="site-container relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.18em] text-masterly-sky">
            {/* <span className="h-[2px] w-8 bg-white" /> */}
            Herencia y confección en Gamarra
          </p>
          <h2 className="max-w-[590px] font-editorial text-[38px] font-semibold leading-[1.14] tracking-tight text-white sm:text-[50px]">
            El Taller &amp; La Tradición Masterly
          </h2>
          <p className="mt-6 max-w-[540px] text-[13px] leading-7 text-masterly-sky/90 sm:text-sm">
            Desde Gamarra, combinamos selección de tejidos, cuidado del corte
            y atención al detalle para crear una propuesta de camisería
            masculina con identidad propia.
          </p>

          <div className="my-8 grid max-w-[480px] grid-cols-3 gap-4 border-t border-masterly-sky/20 pt-6">
              {/* {steps.map((step) => (
                <div key={step.number}>
                  <p className="font-editorial text-[27px] font-semibold text-masterly-sky">
                    {step.number}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-white/80 sm:text-[11px]">
                    {step.label}
                  </p>
                </div>
              ))}  */}
          </div>

          <Link
            to="/nosotros"
            className="inline-flex min-h-11 items-center gap-3 rounded-sm bg-white px-6 py-3 text-xs font-bold tracking-wide text-masterly-navy transition-colors hover:bg-masterly-sky"
          >
            Conoce nuestra historia
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl border border-masterly-sky/20 bg-masterly-darkest/65 p-3 shadow-2xl">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/images/atelier.webp"
                alt="Vista ilustrativa de un taller de confección"
                loading="lazy"
                className="h-[310px] w-full object-cover sm:h-[345px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-masterly-darkest/95 via-transparent to-transparent" />
              {/* <div className="absolute inset-x-4 bottom-4">
                <p className="text-xs font-semibold text-white">
                  Confección y atención a los detalles
                </p>
                <p className="mt-1 text-[11px] text-masterly-sky">
                  Fotografía ilustrativa del proceso textil
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
