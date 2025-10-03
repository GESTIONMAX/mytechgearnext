'use client';

import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { useWordPressCart } from '@/hooks/useWordPressCart';
import { WordPressProductCard } from '@/components/WordPressProductCard';
import { WordPressCartDrawer } from '@/components/WordPressCartDrawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function TestWordPressCartPage(): React.JSX.Element {
  const { products, isLoading, error } = useWordPressProducts();
  const { items, totalItems, totalPrice, clearCart, removeItem, updateQuantity } = useWordPressCart();

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
          <h1 className="text-3xl font-bold mb-4">🛒 Test Panier WordPress</h1>
          <p className="text-gray-600 mb-4">Test du système de panier avec données WordPress</p>
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {products.length} produits disponibles
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {totalItems} articles dans le panier
            </Badge>
            <WordPressCartDrawer>
              <Button variant="outline" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Panier
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </WordPressCartDrawer>
            {items.length > 0 && (
              <Button variant="destructive" onClick={clearCart}>
                <Trash2 className="w-4 h-4 mr-2" />
                Vider le panier
              </Button>
            )}
          </div>
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold mb-2">📊 Résumé du panier</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Articles:</strong> {totalItems}
              </div>
              <div>
                <strong>Total:</strong>{' '}
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(totalPrice)}
              </div>
              <div>
                <strong>Produits uniques:</strong> {items.length}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">🛍️ Produits disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <WordPressProductCard
                key={product.id}
                product={product}
                onAddToCart={(product) => {
                  console.log('Ajouté au panier:', product.name);
                }}
                onToggleWishlist={(product) => {
                  console.log('Toggle wishlist:', product.name);
                }}
                onQuickView={(product) => {
                  console.log('Aperçu rapide:', product.name);
                }}
                onShare={(product) => {
                  console.log('Partager:', product.name);
                }}
                showActions={true}
              />
            ))}
          </div>
        </div>

        {/* Cart Items Debug */}
        {items.length > 0 && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-4">🔍 Articles dans le panier (Debug)</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded border">
                  <div className="flex-1">
                    <div className="font-medium">{item.product.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.variant
                        ? `Variante: ${item.variant.attributes?.map((attr: any) => attr.option).join(' - ')}`
                        : 'Produit standard'}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      Qté: {item.quantity} ×{' '}
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(item.price)}{' '}
                      ={' '}
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(item.total)}
                    </div>
                    <Button size="sm" variant="destructive" onClick={() => removeItem(item.id)}>
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">🔍 Informations de debug</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Composant:</strong> WordPressCartDrawer + useWordPressCart
            </p>
            <p>
              <strong>Store:</strong> Zustand avec persistance
            </p>
            <p>
              <strong>Produits chargés:</strong> {products.length}
            </p>
            <p>
              <strong>Articles dans le panier:</strong> {totalItems}
            </p>
            <p>
              <strong>Total panier:</strong>{' '}
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }).format(totalPrice)}
            </p>
            <p>
              <strong>Fonctionnalités:</strong> Ajout, suppression, modification quantité, persistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
