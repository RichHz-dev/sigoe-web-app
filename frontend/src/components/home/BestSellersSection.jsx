import ProductCard from '../ui/ProductCard';
import SectionHeading from '../ui/SectionHeading';
import { products } from '../../data/store';

export default function BestSellersSection() {
  return (
    <section
      id="destacados-home"
      className="section-padding border-y border-masterly-border/80 bg-masterly-subtle"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="Selección destacada"
          title="Best Sellers"
          description="Una selección de camisas para distintos estilos y ocasiones."
          link="/catalogo"
          linkText="Ver todo el catálogo"
        />
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
