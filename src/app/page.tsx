import Hero from '@/components/Hero';
import { TestSupabaseConnection } from '@/components/TestSupabaseConnection';

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Test de connexion Supabase */}
      <div className="container mx-auto px-4 py-8">
        <TestSupabaseConnection />
      </div>
    </div>
  );
}
