'use client';

import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { WordPressProductCard } from '@/components/WordPressProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function TestProductCardsPage(): React.JSX.Element {
  const { products, categories, isLoading, error } = useWordPressProducts();

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
          <h1 className="text-3xl font-bold mb-4">🧪 Test WordPressProductCard</h1>
          <p className="text-gray-600 mb-4">Test du composant ProductCard adapté pour WordPress</p>
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {products.length} produits trouvés
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {categories.length} catégories
            </Badge>
            <Link href="/test-product-details">
              <Button variant="outline" size="sm">
                Test ProductCardDetails
              </Button>
            </Link>
            <Link href="/test-wordpress-products">
              <Button variant="outline" size="sm">
                Test liste simple
              </Button>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <WordPressProductCard
              key={product.id}
              product={product}
              onAddToCart={(product) => {
                // console.log('Ajouter au panier:', product.name);
                alert(`Ajouté au panier: ${product.name}`);
              }}
              onToggleWishlist={(product) => {
                // console.log('Toggle wishlist:', product.name);
                alert(`Ajouté aux favoris: ${product.name}`);
              }}
              onQuickView={(product) => {
                // console.log('Aperçu rapide:', product.name);
                alert(`Aperçu rapide: ${product.name}`);
              }}
              onShare={(product) => {
                // console.log('Partager:', product.name);
                alert(`Partage: ${product.name}`);
              }}
              showActions={true}
            />
          ))}
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">🔍 Informations de debug</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Composant:</strong> WordPressProductCard
            </p>
            <p>
              <strong>Source:</strong> WordPress WooCommerce
            </p>
            <p>
              <strong>Produits chargés:</strong> {products.length}
            </p>
            <p>
              <strong>Fonctionnalités:</strong> Cartes produits, actions, prix, stock
            </p>
            <p>
              <strong>Navigation:</strong> Liens vers pages de détail
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
