import { Link } from 'react-router-dom';

export default function CatalogHero() {
  return (
    <section className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-masterly-darkest text-white sm:min-h-[340px]">
      <img
        src="/images/catalog-hero.webp"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-masterly-darkest/95 via-masterly-navy/80 to-transparent" />
      <div className="site-container py-16">
        <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-masterly-sky">
          <span className="h-[2px] w-8 bg-masterly-sky" />
          Catálogo de camisas
        </p>
        <h1 className="font-editorial text-4xl font-semibold leading-tight sm:text-5xl">
          Nuestra Colección
          <span className="block font-normal italic text-masterly-sky">
            Camisas de Alta Gama
          </span>
        </h1>
        <p className="mt-5 max-w-[410px] text-sm leading-7 text-slate-100">
          Explora camisas seleccionadas por tejido, ajuste y estilo.
          Encuentra la prenda ideal para cada ocasión.
        </p>
      </div>
      <Link to="/" className="sr-only">Volver a Inicio</Link>
    </section>
  );
}
