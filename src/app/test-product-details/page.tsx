'use client';

import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { WordPressProductCardDetails } from '@/components/WordPressProductCardDetails';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  price: string;
  regular_price?: string;
  sale_price?: string;
  in_stock: boolean;
  images?: Array<{ src: string; alt: string }>;
}

export default function TestProductDetailsPage(): React.JSX.Element {
  const { products, isLoading, error } = useWordPressProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  if (selectedProduct) {
    return (
      <div>
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la liste
              </Button>
              <h1 className="text-xl font-semibold">Détails du produit</h1>
            </div>
          </div>
        </div>

        <WordPressProductCardDetails
          product={selectedProduct}
          onAddToCart={(product, quantity) => {
            // console.log('Ajouter au panier:', { product: product.name, quantity, variant });
            alert(`Ajouté au panier: ${product.name} (${quantity}x)`);
          }}
          onToggleWishlist={(product) => {
            // console.log('Toggle wishlist:', product.name);
            alert(`Ajouté aux favoris: ${product.name}`);
          }}
          onShare={(product) => {
            // console.log('Partager:', product.name);
            alert(`Partage: ${product.name}`);
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🧪 Test ProductCardDetails WordPress</h1>
          <p className="text-gray-600 mb-4">
            Sélectionnez un produit pour voir les détails avec le composant WordPress
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-gray-500">{products.length} produits disponibles</span>
            <Link href="/test-wordpress-products">
              <Button variant="outline" size="sm">
                Voir la liste simple
              </Button>
            </Link>
          </div>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt || product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                      <span>Aucune image</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.short_description || product.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-bold text-blue-600">€{product.sale_price || product.price}</span>
                      {product.sale_price && (
                        <span className="text-sm text-gray-500 line-through">€{product.regular_price}</span>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.in_stock ? 'En stock' : 'Rupture'}
                    </span>
                  </div>

                  <Button className="w-full" onClick={() => setSelectedProduct(product)}>
                    Voir les détails
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">🔍 Informations de debug</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Composant:</strong> WordPressProductCardDetails
            </p>
            <p>
              <strong>Source:</strong> WordPress WooCommerce
            </p>
            <p>
              <strong>Produits chargés:</strong> {products.length}
            </p>
            <p>
              <strong>Fonctionnalités:</strong> Détails complets, variantes, images, prix
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
