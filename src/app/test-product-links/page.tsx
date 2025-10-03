'use client';

import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { WordPressProductCard } from '@/components/WordPressProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function TestProductLinksPage(): React.JSX.Element {
  const { products, isLoading, error } = useWordPressProducts();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Erreur de chargement</h1>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🔗 Test Liens Produits</h1>
          <p className="text-gray-600 mb-4">Test de la navigation vers les pages de détail des produits</p>
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {products.length} produits disponibles
            </Badge>
            <Link href="/test-wordpress-cart">
              <Button variant="outline" size="sm">
                Test Panier
              </Button>
            </Link>
            <Link href="/test-wordpress-products">
              <Button variant="outline" size="sm">
                Test Liste Simple
              </Button>
            </Link>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold mb-2">📋 Instructions de test</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Cliquez sur une carte produit pour accéder à la page de détail</li>
            <li>Vérifiez que la page de détail s'affiche correctement</li>
            <li>Testez les actions : ajout au panier, favoris, partage</li>
            <li>Utilisez le bouton "Retour aux produits" pour revenir</li>
          </ol>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">🛍️ Produits avec liens de test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="space-y-4">
                {/* Product Card */}
                <WordPressProductCard
                  product={product}
                  onAddToCart={(product) => {
                    console.log('Ajouté au panier:', product.name);
                    alert(`Ajouté au panier: ${product.name}`);
                  }}
                  onToggleWishlist={(product) => {
                    console.log('Toggle wishlist:', product.name);
                    alert(`Ajouté aux favoris: ${product.name}`);
                  }}
                  onQuickView={(product) => {
                    console.log('Aperçu rapide:', product.name);
                    alert(`Aperçu rapide: ${product.name}`);
                  }}
                  onShare={(product) => {
                    console.log('Partager:', product.name);
                    alert(`Partage: ${product.name}`);
                  }}
                  showActions={true}
                />

                {/* Direct Link */}
                <div className="text-center">
                  <Link href={`/product/${product.slug}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Voir directement
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Results */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-4">✅ Tests à effectuer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Navigation</h4>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Cliquer sur une carte produit</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Page de détail s'affiche</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Bouton retour fonctionne</span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Fonctionnalités</h4>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Ajout au panier</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Actions favoris/partage</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Images et prix corrects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">🔍 Informations de debug</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Page:</strong> Test des liens produits
            </p>
            <p>
              <strong>Navigation:</strong> Cartes → Pages de détail
            </p>
            <p>
              <strong>Produits chargés:</strong> {products.length}
            </p>
            <p>
              <strong>URLs générées:</strong> /product/[slug]
            </p>
            <p>
              <strong>Composant détail:</strong> WordPressProductCardDetails
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
