import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CollectionCard({ collection }) {
  return (
    <Link
      to={collection.href}
      aria-label={`Explorar ${collection.name}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-[3px] bg-masterly-navy focus-visible:outline-offset-4"
    >
      <img
        src={collection.image}
        alt={`Colección ${collection.name}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-masterly-darkest/90 via-masterly-darkest/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white sm:p-4 xl:p-5">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-masterly-sky">
            {collection.eyebrow}
          </p>
          <h3 className="font-editorial text-xl font-semibold leading-tight sm:text-lg xl:text-[22px]">
            {collection.name}
          </h3>
          <p className="mt-1 text-[11px] text-white/80">
            {collection.subtitle}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm transition-colors group-hover:border-masterly-vibrant group-hover:bg-masterly-vibrant"
        >
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
