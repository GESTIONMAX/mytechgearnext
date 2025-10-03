'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface TestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export default function TestSupabasePage(): React.JSX.Element {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const runTests = async (): Promise<void> => {
    setLoading(true);
    setResults([]);
    const newResults: TestResult[] = [];

    try {
      // Test 1: Connexion Supabase
      console.log('🔍 Test 1: Connexion Supabase...');
      const supabase = createClient();

      newResults.push({
        success: true,
        message: '✅ Connexion Supabase établie',
        data: { url: process.env.NEXT_PUBLIC_SUPABASE_URL },
      });

      // Test 2: Récupération des produits
      console.log('📦 Test 2: Récupération des produits...');
      const { data: products, error: productsError } = await supabase.from('products').select('*').limit(5);

      if (productsError) {
        newResults.push({
          success: false,
          message: '❌ Erreur récupération produits',
          error: productsError.message,
        });
      } else {
        newResults.push({
          success: true,
          message: `✅ ${products?.length || 0} produits récupérés`,
          data: products,
        });
      }

      // Test 3: Récupération des catégories
      console.log('📂 Test 3: Récupération des catégories...');
      const { data: categories, error: categoriesError } = await supabase.from('categories').select('*');

      if (categoriesError) {
        newResults.push({
          success: false,
          message: '❌ Erreur récupération catégories',
          error: categoriesError.message,
        });
      } else {
        newResults.push({
          success: true,
          message: `✅ ${categories?.length || 0} catégories récupérées`,
          data: categories,
        });
      }

      // Test 4: Récupération des variantes
      console.log('🔧 Test 4: Récupération des variantes...');
      const { data: variants, error: variantsError } = await supabase.from('product_variants').select('*').limit(5);

      if (variantsError) {
        newResults.push({
          success: false,
          message: '❌ Erreur récupération variantes',
          error: variantsError.message,
        });
      } else {
        newResults.push({
          success: true,
          message: `✅ ${variants?.length || 0} variantes récupérées`,
          data: variants,
        });
      }

      // Test 5: Test d'écriture (création d'un produit test)
      console.log("✍️ Test 5: Test d'écriture...");
      const testProduct = {
        name: 'Test Product Next.js',
        slug: 'test-product-nextjs',
        description: 'Produit de test créé depuis Next.js',
        price: 99.99,
        category_id: categories?.[0]?.id || null,
        created_at: new Date().toISOString(),
      };

      const { data: newProduct, error: insertError } = await supabase
        .from('products')
        .insert([testProduct])
        .select()
        .single();

      if (insertError) {
        newResults.push({
          success: false,
          message: '❌ Erreur création produit test',
          error: insertError.message,
        });
      } else {
        newResults.push({
          success: true,
          message: '✅ Produit test créé avec succès',
          data: newProduct,
        });

        // Nettoyer le produit test
        await supabase.from('products').delete().eq('id', newProduct.id);

        newResults.push({
          success: true,
          message: '🧹 Produit test supprimé',
        });
      }
    } catch (error: any) {
      newResults.push({
        success: false,
        message: '❌ Erreur générale',
        error: error.message,
      });
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Test d'intégration Supabase</h1>

        <div className="mb-6">
          <button
            onClick={runTests}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '🔄 Tests en cours...' : '🚀 Lancer les tests'}
          </button>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.success ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="font-semibold mb-2">{result.message}</div>

              {result.error && (
                <div className="text-sm bg-red-100 p-2 rounded mt-2">
                  <strong>Erreur:</strong> {result.error}
                </div>
              )}

              {result.data && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium">Voir les données</summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>

        {results.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">📊 Résumé des tests</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>✅ Succès:</strong> {results.filter((r) => r.success).length}
              </div>
              <div>
                <strong>❌ Échecs:</strong> {results.filter((r) => !r.success).length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
