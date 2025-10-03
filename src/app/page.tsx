import ChameleoCompactHero from '@/components/ChameleoCompactHero';
import ChameleoBestSellers from '@/components/ChameleoBestSellers';
import ChameleoCompactTestimonials from '@/components/ChameleoCompactTestimonials';
import ChameleoCompactPartnership from '@/components/ChameleoCompactPartnership';

export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <ChameleoCompactHero />
      <ChameleoBestSellers />
      <ChameleoCompactTestimonials />
      <ChameleoCompactPartnership />
    </div>
  );
}
