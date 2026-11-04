import { ArrowLeft, ArrowRight, Construction } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const pages = {
  '/catalogo': { title: 'Catálogo de camisas', reference: 'A.1 · Clásico Editorial', description: 'Próximo módulo: filtros laterales, ordenamiento y productos. La búsqueda ya genera el parámetro ?q= para conectarla en esta pantalla.' },
  '/colecciones': { title: 'Nuestras colecciones', reference: 'C.2 · Grilla visual', description: 'Próximo módulo: grilla de colecciones Ejecutiva, Casual & Oxford, Ceremonia y Accesorios.' },
  '/nosotros': { title: 'Nuestra historia', reference: 'N.1 · Clásico', description: 'Próximo módulo: historia de la empresa, taller, propietarios y valores. Los nombres y fotografías deben ser reales.' },
  '/venta-corporativa': { title: 'Venta corporativa', reference: 'Pendiente de aprobación', description: 'Próximo módulo: beneficios, proceso de cotización, formulario y preguntas frecuentes.' },
  '/cuenta': { title: 'Mi cuenta', reference: 'En planificación', description: 'La autenticación se conectará al backend en una etapa posterior.' },
  '/ayuda': { title: 'Centro de ayuda', reference: 'En planificación', description: 'Aquí colocaremos la guía de tallas, políticas y consultas frecuentes confirmadas por MASTERLY.' },
};

export default function ComingSoonPage() {
  const { pathname } = useLocation();
  const page = pages[pathname];
  if (!page) return <div className="site-container py-28"><h1 className="font-editorial text-4xl">Página no encontrada</h1><Link className="btn-primary mt-6" to="/">Volver al inicio</Link></div>;
  return (
    <section className="bg-masterly-subtle py-24 sm:py-36"><div className="site-container max-w-4xl"><div className="rounded-lg border border-masterly-border bg-white p-8 shadow-sm sm:p-14"><div className="mb-6 inline-flex items-center gap-2 rounded-full bg-masterly-subtle px-3 py-2 text-xs text-masterly-vibrant"><Construction size={15}/> Pantalla pendiente</div><p className="eyebrow">MASTERLY · {page.reference}</p><h1 className="mt-3 font-editorial text-4xl font-semibold sm:text-5xl">{page.title}</h1><p className="mt-5 max-w-xl text-sm leading-8 text-slate-600">{page.description}</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/" className="btn-primary"><ArrowLeft size={15}/> Volver al inicio</Link><Link to="/#destacados-home" className="btn-secondary">Ver productos destacados <ArrowRight size={15}/></Link></div></div></div></section>
  );
}
