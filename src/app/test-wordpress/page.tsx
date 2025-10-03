'use client';

import { useState } from 'react';

interface TestResult {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
}

export default function TestWordPressPage(): React.JSX.Element {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    wordpressUrl: '',
    consumerKey: '',
    consumerSecret: '',
  });

  const runTests = async (): Promise<void> => {
    setLoading(true);
    setResults([]);
    const newResults: TestResult[] = [];

    try {
      // Test 1: Configuration
      // console.log('🔍 Test 1: Vérification de la configuration...');

      if (!config.wordpressUrl || !config.consumerKey || !config.consumerSecret) {
        newResults.push({
          success: false,
          message: '❌ Configuration manquante',
          error: 'Veuillez remplir tous les champs de configuration',
        });
        setResults(newResults);
        setLoading(false);
        return;
      }

      newResults.push({
        success: true,
        message: '✅ Configuration fournie',
        data: {
          url: config.wordpressUrl,
          hasKey: !!config.consumerKey,
          hasSecret: !!config.consumerSecret,
        },
      });

      // Test 2: Test de connexion WooCommerce REST API
      // console.log('📦 Test 2: Test de connexion WooCommerce REST API...');

      const wcUrl = `${config.wordpressUrl}/wp-json/wc/v3/products`;
      const auth = btoa(`${config.consumerKey}:${config.consumerSecret}`);

      const wcResponse = await fetch(wcUrl, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      });

      if (!wcResponse.ok) {
        newResults.push({
          success: false,
          message: '❌ Erreur connexion WooCommerce REST API',
          error: `Status: ${wcResponse.status} - ${wcResponse.statusText}`,
        });
      } else {
        const wcData = await wcResponse.json();
        newResults.push({
          success: true,
          message: `✅ WooCommerce REST API connecté - ${wcData.length} produits trouvés`,
          data: wcData.slice(0, 3), // Afficher seulement les 3 premiers
        });
      }

      // Test 3: Test de connexion GraphQL
      // console.log('🔗 Test 3: Test de connexion GraphQL...');

      const graphqlUrl = `${config.wordpressUrl}/graphql`;
      const graphqlQuery = {
        query: `
          query GetProducts {
            products(first: 5) {
              nodes {
                id
                name
                slug
                description
                price
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
        `,
      };

      const graphqlResponse = await fetch(graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery),
      });

      if (!graphqlResponse.ok) {
        newResults.push({
          success: false,
          message: '❌ Erreur connexion GraphQL',
          error: `Status: ${graphqlResponse.status} - ${graphqlResponse.statusText}`,
        });
      } else {
        const graphqlData = await graphqlResponse.json();
        if (graphqlData.errors) {
          newResults.push({
            success: false,
            message: '❌ Erreur GraphQL',
            error: graphqlData.errors[0].message,
          });
        } else {
          newResults.push({
            success: true,
            message: `✅ GraphQL connecté - ${graphqlData.data.products.nodes.length} produits trouvés`,
            data: graphqlData.data.products.nodes,
          });
        }
      }

      // Test 4: Test de création de produit (optionnel)
      // console.log('✍️ Test 4: Test de création de produit...');

      const testProduct = {
        name: 'Test Product Next.js',
        type: 'simple',
        regular_price: '99.99',
        description: 'Produit de test créé depuis Next.js',
        short_description: 'Test de création',
        manage_stock: true,
        stock_quantity: 10,
      };

      const createResponse = await fetch(`${config.wordpressUrl}/wp-json/wc/v3/products`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testProduct),
      });

      if (!createResponse.ok) {
        newResults.push({
          success: false,
          message: '❌ Erreur création produit',
          error: `Status: ${createResponse.status} - ${createResponse.statusText}`,
        });
      } else {
        const createdProduct = await createResponse.json();
        newResults.push({
          success: true,
          message: '✅ Produit test créé avec succès',
          data: { id: createdProduct.id, name: createdProduct.name },
        });

        // Nettoyer le produit test
        await fetch(`${config.wordpressUrl}/wp-json/wc/v3/products/${createdProduct.id}?force=true`, {
          method: 'DELETE',
          headers: {
            Authorization: `Basic ${auth}`,
          },
        });

        newResults.push({
          success: true,
          message: '🧹 Produit test supprimé',
        });
      }
    } catch (error: unknown) {
      newResults.push({
        success: false,
        message: '❌ Erreur générale',
        error: error instanceof Error ? error.message : String(error),
      });
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Test de connexion WordPress</h1>

        {/* Configuration Form */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Configuration WordPress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">URL WordPress</label>
              <input
                type="url"
                value={config.wordpressUrl}
                onChange={(e) => setConfig({ ...config, wordpressUrl: e.target.value })}
                placeholder="https://votre-site.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Consumer Key</label>
              <input
                type="text"
                value={config.consumerKey}
                onChange={(e) => setConfig({ ...config, consumerKey: e.target.value })}
                placeholder="ck_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Consumer Secret</label>
              <input
                type="password"
                value={config.consumerSecret}
                onChange={(e) => setConfig({ ...config, consumerSecret: e.target.value })}
                placeholder="cs_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

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
