import CollectionCard from '../ui/CollectionCard';
import SectionHeading from '../ui/SectionHeading';
import { collections } from '../../data/store';

export default function CollectionsSection() {
  return (
    <section id="colecciones-home" className="section-padding bg-white">
      <div className="site-container">
        <SectionHeading
          eyebrow="Líneas Masterly"
          title="Colecciones de Confección"
          description="Una selección pensada para acompañarte desde los encuentros profesionales hasta las ocasiones más especiales."
          link="/colecciones"
          linkText="Ver colecciones"
        />
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}
