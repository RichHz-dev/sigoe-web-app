import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  linkText,
  inverted = false,
}) {
  return (
    <div className="mb-9 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end">
      <div>
        <p className={`eyebrow mb-2 ${inverted ? '!text-masterly-sky' : ''}`}>
          {eyebrow}
        </p>
        <h2
          className={`font-editorial text-[29px] font-semibold leading-[1.2] tracking-[-.025em] sm:text-[36px] ${
            inverted ? 'text-white' : 'text-masterly-navy'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-2 max-w-xl text-sm leading-6 ${
              inverted ? 'text-masterly-sky/85' : 'text-slate-500'
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          to={link}
          className={`inline-flex shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${
            inverted
              ? 'text-white hover:text-masterly-sky'
              : 'text-masterly-navy hover:text-masterly-vibrant'
          }`}
        >
          {linkText || 'Explorar'}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
