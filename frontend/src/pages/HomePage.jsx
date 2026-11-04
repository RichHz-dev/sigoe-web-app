import Hero from '../components/home/Hero';
import CollectionsSection from '../components/home/CollectionsSection';
import BestSellersSection from '../components/home/BestSellersSection';
import HeritageSection from '../components/home/HeritageSection';
import CorporateCTA from '../components/home/CorporateCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionsSection />
      <BestSellersSection />
      <HeritageSection />
      <CorporateCTA />
    </>
  );
}
