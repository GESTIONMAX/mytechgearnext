'use client';

import { useProducts, useCategories } from '@/hooks/useSupabaseProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const TestSupabaseConnection: React.FC = () => {
  const { data: products, isLoading: productsLoading, error: productsError } = useProducts();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  if (productsLoading || categoriesLoading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">🔄 Test de connexion Supabase</h3>
        <p>Chargement des données...</p>
      </Card>
    );
  }

  if (productsError || categoriesError) {
    return (
      <Card className="p-6 border-red-200 bg-red-50">
        <h3 className="text-lg font-semibold mb-4 text-red-600">❌ Erreur de connexion</h3>
        <p className="text-red-600">{productsError?.message || categoriesError?.message || 'Erreur inconnue'}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-green-200 bg-green-50">
      <h3 className="text-lg font-semibold mb-4 text-green-600">✅ Connexion Supabase réussie</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">📁 Catégories ({categories?.length || 0})</h4>
          <div className="space-y-1">
            {categories?.map((category) => (
              <Badge key={category.id} variant="outline" className="mr-1">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">🛍️ Produits ({products?.length || 0})</h4>
          <div className="space-y-1">
            {products?.slice(0, 5).map((product) => (
              <div key={product.id} className="text-sm">
                <span className="font-medium">{product.name}</span>
                <span className="text-gray-500 ml-2">
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(product.price / 100)}
                </span>
              </div>
            ))}
            {products && products.length > 5 && (
              <p className="text-sm text-gray-500">... et {products.length - 5} autres</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
