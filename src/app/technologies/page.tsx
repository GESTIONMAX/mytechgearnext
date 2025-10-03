import ChameleoInteractiveLenses from '@/components/ChameleoInteractiveLenses';
import ChameleoLensTechnologies from '@/components/ChameleoLensTechnologies';
import ChameleoManufacturing from '@/components/ChameleoManufacturing';
import ChameleoComparison from '@/components/ChameleoComparison';

export default function TechnologiesPage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <ChameleoInteractiveLenses />
      <ChameleoLensTechnologies />
      <ChameleoManufacturing />
      <ChameleoComparison />
    </div>
  );
}
