'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ConnectionStatus {
  connected: boolean;
  productsCount: number;
  categoriesCount: number;
  error?: string;
}

export default function SupabaseConnectionTest(): React.JSX.Element {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    productsCount: 0,
    categoriesCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async (): Promise<void> => {
      try {
        const supabase = createClient();
        
        // Test de connexion basique
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('id, name')
          .limit(10);

        const { data: categories, error: categoriesError } = await supabase
          .from('categories')
          .select('id, name')
          .limit(10);

        if (productsError || categoriesError) {
          setStatus({
            connected: false,
            productsCount: 0,
            categoriesCount: 0,
            error: productsError?.message || categoriesError?.message
          });
        } else {
          setStatus({
            connected: true,
            productsCount: products?.length || 0,
            categoriesCount: categories?.length || 0
          });
        }
      } catch (error: any) {
        setStatus({
          connected: false,
          productsCount: 0,
          categoriesCount: 0,
          error: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-blue-800">Test de connexion Supabase...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 border rounded-lg ${
      status.connected 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center space-x-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${
          status.connected ? 'bg-green-500' : 'bg-red-500'
        }`}></div>
        <span className={`font-semibold ${
          status.connected ? 'text-green-800' : 'text-red-800'
        }`}>
          {status.connected ? '✅ Supabase connecté' : '❌ Supabase non connecté'}
        </span>
      </div>
      
      {status.connected ? (
        <div className="text-sm text-green-700">
          <div>📦 Produits: {status.productsCount}</div>
          <div>📂 Catégories: {status.categoriesCount}</div>
        </div>
      ) : (
        <div className="text-sm text-red-700">
          <div>Erreur: {status.error}</div>
        </div>
      )}
    </div>
  );
}
