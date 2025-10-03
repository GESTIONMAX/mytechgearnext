'use client';

import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import Image from 'next/image';

export default function TestWordPressProductsPage(): React.JSX.Element {
  const { products, categories, isLoading, error, refetch } = useWordPressProducts();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Chargement des produits WordPress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Erreur de connexion</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={refetch} className="bg-blue-600 text-white">
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🛍️ Produits WordPress</h1>
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {products.length} produits trouvés
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {categories.length} catégories
            </Badge>
            <Button onClick={refetch} variant="outline" size="sm">
              🔄 Actualiser
            </Button>
          </div>
        </div>

        {/* Catégories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">📂 Catégories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Produits */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">🛍️ Produits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  {/* Image du produit */}
                  <div className="relative w-full h-64 bg-gray-100">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span>Aucune image</span>
                      </div>
                    )}

                    {/* Badge stock */}
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant={product.in_stock ? 'default' : 'destructive'}
                        className={product.in_stock ? 'bg-green-500' : 'bg-red-500'}
                      >
                        {product.in_stock ? 'En stock' : 'Rupture'}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    {/* Nom et description */}
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.short_description || product.description}
                    </p>

                    {/* Catégories */}
                    {product.categories && product.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.categories.slice(0, 2).map((category) => (
                          <Badge key={category.id} variant="outline" className="text-xs">
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Prix */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {product.sale_price ? `€${product.sale_price}` : `€${product.price}`}
                        </span>
                        {product.sale_price && (
                          <span className="text-lg text-gray-500 line-through">€{product.regular_price}</span>
                        )}
                      </div>
                      {product.stock_quantity && (
                        <span className="text-sm text-gray-500">Stock: {product.stock_quantity}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Ajouter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Informations de debug */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">🔍 Informations de debug</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Source:</strong> WordPress WooCommerce
            </p>
            <p>
              <strong>URL:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL}
            </p>
            <p>
              <strong>Produits chargés:</strong> {products.length}
            </p>
            <p>
              <strong>Catégories chargées:</strong> {categories.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
