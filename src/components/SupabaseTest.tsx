'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export const SupabaseTest = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        const supabase = createClient();
        
        // Test simple de récupération des produits
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(5);

        if (error) {
          setError(`Erreur Supabase: ${error.message}`);
          console.error('Erreur Supabase:', error);
        } else {
          setProducts(data || []);
          console.log('Produits récupérés:', data);
        }
      } catch (err) {
        setError(`Erreur de connexion: ${err}`);
        console.error('Erreur de connexion:', err);
      } finally {
        setLoading(false);
      }
    };

    testSupabaseConnection();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900">Test de connexion Supabase</h3>
        <p className="text-blue-700">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <h3 className="font-semibold text-red-900">Erreur de connexion</h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <h3 className="font-semibold text-green-900">Connexion Supabase réussie</h3>
      <p className="text-green-700">
        {products.length} produits trouvés
      </p>
      <div className="mt-2 space-y-1">
        {products.map((product) => (
          <div key={product.id} className="text-sm text-green-600">
            • {product.name} - {product.price}€
          </div>
        ))}
      </div>
    </div>
  );
};
