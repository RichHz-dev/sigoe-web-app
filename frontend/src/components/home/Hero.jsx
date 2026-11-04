import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../../data/heroSlides';

const SLIDE_TIME_MS = 6500;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const slide = heroSlides[active];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const goTo = useCallback((index) => {
    setActive((index + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % heroSlides.length);
    }, SLIDE_TIME_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Campañas de MASTERLY"
      className="relative isolate flex min-h-[550px] items-center overflow-hidden bg-masterly-darkest text-white lg:min-h-[620px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      {heroSlides.map((item, index) => (
        <img
          key={item.id}
          src={item.image}
          alt=""
          aria-hidden="true"
          fetchPriority={index === 0 ? 'high' : 'auto'}
          className={`absolute inset-0 -z-20 h-full w-full object-cover object-center transition-opacity duration-700 ${
            index === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#00072d]/95 via-[#001c55]/80 to-[#001c55]/10 sm:via-[#001c55]/70 lg:to-transparent" />

      <div className="site-container relative w-full py-20 sm:py-24">
        <div className="max-w-[620px]" aria-live="off">
          <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-masterly-sky sm:text-[11px]">
            <span className="h-[2px] w-9 bg-masterly-sky" />
            {slide.eyebrow}
          </p>
          <h1
            key={slide.id}
            className="font-editorial text-[42px] font-semibold leading-[1.13] tracking-[-.03em] sm:text-[56px] lg:text-[64px]"
          >
            {slide.title}
            <span className="mt-1 block font-normal italic text-masterly-sky">
              {slide.highlight}
            </span>
          </h1>
          <p className="mt-7 max-w-[455px] text-[13px] leading-7 text-slate-100 sm:text-sm">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Link to={slide.primaryHref} className="btn-accent gap-3 px-7">
              {slide.primaryText}
              <ArrowRight size={16} />
            </Link>
            <Link to={slide.secondaryHref} className="btn-secondary border-white px-6">
              {slide.secondaryText}
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4 text-xs font-semibold tracking-wide">
            <div className="flex items-center gap-3" aria-label="Seleccionar diapositiva">
              {heroSlides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Ver imagen ${index + 1}: ${item.title}`}
                  aria-current={index === active ? 'true' : undefined}
                  className={`border-b-2 pb-1 transition-colors ${
                    index === active
                      ? 'border-masterly-sky text-white'
                      : 'border-transparent text-white/60 hover:text-white'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <div className="h-[2px] w-16 bg-white/30" aria-hidden="true">
              <div
                className="h-full bg-masterly-sky transition-all duration-300"
                style={{ width: `${((active + 1) / heroSlides.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Imagen anterior"
                className="p-2 text-white hover:text-masterly-sky"
              >
                <ArrowLeft size={17} />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label="Imagen siguiente"
                className="p-2 text-white hover:text-masterly-sky"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Imagen {active + 1} de {heroSlides.length}: {slide.title}.
      </span>
    </section>
  );
}
