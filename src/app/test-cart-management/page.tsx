'use client';

import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { useWordPressCart } from '@/hooks/useWordPressCart';
import { WordPressProductCard } from '@/components/WordPressProductCard';
import { WordPressCartDrawer } from '@/components/WordPressCartDrawer';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Trash2, CheckCircle, AlertCircle, Loader2, Package } from 'lucide-react';
import { useState } from 'react';

export default function TestCartManagementPage(): React.JSX.Element {
  const { products, isLoading, error } = useWordPressProducts();
  const { items, totalItems, totalPrice, addItem, updateQuantity, removeItem, clearCart } = useWordPressCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [testResults, setTestResults] = useState<Array<{ test: string; result: boolean; message: string }>>([]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const handleAddToCart = (product: any): void => {
    addItem(product, 1);
    setSelectedProduct(product);
    addTestResult('Ajout au panier', true, `${product.name} ajouté au panier`);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number): void => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      updateQuantity(itemId, newQuantity);
      addTestResult('Modification quantité', true, `Quantité mise à jour: ${newQuantity}`);
    }
  };

  const handleRemoveItem = (itemId: string): void => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      removeItem(itemId);
      addTestResult('Suppression article', true, `${item.product.name} supprimé du panier`);
    }
  };

  const handleClearCart = (): void => {
    clearCart();
    addTestResult('Vider le panier', true, 'Panier vidé avec succès');
  };

  const addTestResult = (test: string, result: boolean, message: string): void => {
    setTestResults((prev) => [...prev, { test, result, message }]);
  };

  const resetTests = (): void => {
    setTestResults([]);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Chargement des produits...</p>
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
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🛒 Test Gestion du Panier</h1>
          <p className="text-gray-600 mb-4">
            Test des fonctionnalités de gestion du panier : ajout, modification, suppression
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {products.length} produits disponibles
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {totalItems} articles dans le panier
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800">
              Total: {formatPrice(totalPrice)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Produits */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">🛍️ Produits disponibles</h2>
                <p className="text-gray-600 mb-4">Cliquez sur "Ajouter au panier" pour tester la gestion du panier</p>

                <div className="grid grid-cols-1 gap-4">
                  {products.slice(0, 4).map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.short_description}</p>
                        <p className="text-sm font-bold">{formatPrice(parseFloat(product.price))}</p>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">📋 Instructions de test</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>Ajout:</strong> Cliquez sur "Ajouter" pour ajouter des produits
                  </li>
                  <li>
                    <strong>Quantité:</strong> Utilisez les boutons + et - pour modifier les quantités
                  </li>
                  <li>
                    <strong>Suppression:</strong> Cliquez sur la poubelle pour supprimer un article
                  </li>
                  <li>
                    <strong>Vider:</strong> Utilisez le bouton "Vider le panier" pour tout supprimer
                  </li>
                  <li>
                    <strong>Checkout:</strong> Cliquez sur "Passer la commande" pour aller au checkout
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Section Panier et Tests */}
          <div className="space-y-6">
            {/* Panier */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">🛒 Votre panier</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleClearCart} disabled={items.length === 0}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Vider
                    </Button>
                    <WordPressCartDrawer>
                      <Button size="sm">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Ouvrir le panier
                      </Button>
                    </WordPressCartDrawer>
                  </div>
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Votre panier est vide</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <Package className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.product.name}</h4>
                          {item.variant && (
                            <p className="text-xs text-gray-600">
                              {item.variant.attributes?.map((attr: any) => attr.option).join(' - ') || 'Standard'}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(quantity) => handleUpdateQuantity(item.id, quantity)}
                          max={10}
                          min={1}
                          allowDelete={true}
                          onDelete={() => handleRemoveItem(item.id)}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between items-center font-semibold">
                      <span>Total ({totalItems} articles)</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>

                    {items.length > 0 && (
                      <Button className="w-full" asChild>
                        <a href="/checkout">Passer la commande</a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Résultats des tests */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">🧪 Résultats des tests</h3>
                  <Button variant="outline" size="sm" onClick={resetTests}>
                    Réinitialiser
                  </Button>
                </div>

                {testResults.length === 0 ? (
                  <p className="text-gray-600 text-sm">Aucun test effectué</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {testResults.map((result, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        {result.result ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="font-medium">{result.test}:</span>
                        <span className="text-gray-600">{result.message}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informations de debug */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">🔍 Informations de debug</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Articles dans le panier:</strong> {totalItems}
                  </p>
                  <p>
                    <strong>Total du panier:</strong> {formatPrice(totalPrice)}
                  </p>
                  <p>
                    <strong>Produits disponibles:</strong> {products.length}
                  </p>
                  <p>
                    <strong>Tests effectués:</strong> {testResults.length}
                  </p>
                  <p>
                    <strong>Produit sélectionné:</strong> {selectedProduct?.name || 'Aucun'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
