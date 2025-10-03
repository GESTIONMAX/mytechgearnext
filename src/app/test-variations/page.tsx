'use client';

import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { useWordPressProductVariations } from '@/hooks/useWordPressProductVariations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TestVariationsPage(): React.JSX.Element {
  const { products, isLoading: productsLoading, error: productsError } = useWordPressProducts();
  const {
    variations,
    isLoading: variationsLoading,
    error: variationsError,
    getVariationsForProduct,
  } = useWordPressProductVariations();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [productVariations, setProductVariations] = useState<any[]>([]);

  useEffect(() => {
    if (selectedProductId) {
      getVariationsForProduct(selectedProductId).then((vars) => {
        setProductVariations(vars);
      });
    }
  }, [selectedProductId, getVariationsForProduct]);

  if (productsLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Erreur de chargement</h1>
          <p className="text-gray-600 mb-4">{productsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🔧 Test Variantes Produits</h1>
          <p className="text-gray-600 mb-4">Test de la récupération et de l'affichage des variantes WordPress</p>
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {products.length} produits disponibles
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {productVariations.length} variantes chargées
            </Badge>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold mb-2">📋 Instructions de test</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Sélectionnez un produit avec des variantes</li>
            <li>Vérifiez que les variantes se chargent correctement</li>
            <li>Testez l'affichage des attributs et prix</li>
            <li>Vérifiez la gestion du stock</li>
          </ol>
        </div>

        {/* Product Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">🛍️ Sélection de produit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card
                key={product.id}
                className={`cursor-pointer transition-all ${
                  selectedProductId === product.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedProductId(product.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {product.variations?.length || 0} variantes
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {product.short_description || product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{product.price}€</span>
                    <span className="text-xs text-gray-500">Stock: {product.stock_status}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Variations Display */}
        {selectedProductId && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🔧 Variantes du produit sélectionné</h2>

            {variationsLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-600">Chargement des variantes...</p>
              </div>
            ) : variationsError ? (
              <div className="text-center py-8">
                <AlertCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-red-600">{variationsError}</p>
              </div>
            ) : productVariations.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Aucune variante trouvée pour ce produit</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productVariations.map((variation) => (
                  <Card key={variation.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Variation ID */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">ID: {variation.id}</span>
                          <Badge
                            variant={variation.stock_status === 'instock' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {variation.stock_status}
                          </Badge>
                        </div>

                        {/* SKU */}
                        {variation.sku && (
                          <div>
                            <span className="text-xs text-gray-500">SKU:</span>
                            <span className="text-xs ml-1 font-mono">{variation.sku}</span>
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">{variation.price}€</span>
                          {variation.sale_price && (
                            <span className="text-sm text-gray-500 line-through">{variation.regular_price}€</span>
                          )}
                        </div>

                        {/* Stock */}
                        {variation.stock_quantity && (
                          <div className="text-sm text-gray-600">Stock: {variation.stock_quantity}</div>
                        )}

                        {/* Attributes */}
                        {variation.attributes && variation.attributes.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-xs font-medium text-gray-700">Attributs:</span>
                            {variation.attributes.map((attr: any, index: number) => (
                              <div key={index} className="text-xs text-gray-600">
                                <span className="font-medium">{attr.name}:</span>
                                <span className="ml-1">{attr.option}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Image */}
                        {variation.image && (
                          <div className="mt-2">
                            <img
                              src={variation.image.src}
                              alt={variation.image.alt || `Variation ${variation.id}`}
                              className="w-full h-20 object-cover rounded"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">🔍 Informations de debug</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Produit sélectionné:</strong> {selectedProductId || 'Aucun'}
            </p>
            <p>
              <strong>Variantes chargées:</strong> {productVariations.length}
            </p>
            <p>
              <strong>État chargement:</strong> {variationsLoading ? 'En cours...' : 'Terminé'}
            </p>
            <p>
              <strong>Erreur:</strong> {variationsError || 'Aucune'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
