'use client';

import { AdvancedQuantitySelector } from '@/components/ui/advanced-quantity-selector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Package, ShoppingCart, Settings } from 'lucide-react';
import { useState } from 'react';

export default function TestAdvancedQuantityPage(): React.JSX.Element {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    product1: 1,
    product2: 2,
    product3: 3,
  });

  const [testResults, setTestResults] = useState<Array<{ test: string; result: boolean; message: string }>>([]);
  const [deletedProducts, setDeletedProducts] = useState<string[]>([]);
  const [showButtons, setShowButtons] = useState(true);
  const [showDropdown, setShowDropdown] = useState(true);

  const products = [
    { id: 'product1', name: 'Lunettes Sport', price: 249, max: 5 },
    { id: 'product2', name: 'Lunettes Lifestyle', price: 199, max: 8 },
    { id: 'product3', name: 'Lunettes Prismatic', price: 385, max: 3 },
  ];

  const handleQuantityChange = (productId: string, quantity: number): void => {
    if (quantity === 0) {
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[productId];
        return newQuantities;
      });
      setDeletedProducts((prev) => [...prev, productId]);
      addTestResult('Suppression produit', true, `Produit ${productId} supprimé via sélecteur`);
    } else {
      setQuantities((prev) => ({ ...prev, [productId]: quantity }));
      addTestResult('Modification quantité', true, `Quantité mise à jour: ${quantity}`);
    }
  };

  const handleDeleteProduct = (productId: string): void => {
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[productId];
      return newQuantities;
    });
    setDeletedProducts((prev) => [...prev, productId]);
    addTestResult('Suppression directe', true, `Produit ${productId} supprimé directement`);
  };

  const handleRestoreProduct = (productId: string): void => {
    setQuantities((prev) => ({ ...prev, [productId]: 1 }));
    setDeletedProducts((prev) => prev.filter((id) => id !== productId));
    addTestResult('Restauration produit', true, `Produit ${productId} restauré`);
  };

  const addTestResult = (test: string, result: boolean, message: string): void => {
    setTestResults((prev) => [...prev, { test, result, message }]);
  };

  const resetTests = (): void => {
    setTestResults([]);
  };

  const getTotalPrice = (): number => {
    return products.reduce((total, product) => {
      return total + product.price * (quantities[product.id] || 0);
    }, 0);
  };

  const getTotalItems = (): number => {
    return Object.values(quantities).reduce((total, qty) => total + qty, 0);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🔧 Test Sélecteur Avancé</h1>
          <p className="text-gray-600 mb-4">Test du composant AdvancedQuantitySelector avec options configurables</p>
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {products.length} produits de test
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {getTotalItems()} articles au total
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800">
              Total: {getTotalPrice().toLocaleString('fr-FR')}€
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Test */}
          <div className="space-y-6">
            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showButtons}
                      onChange={(e) => setShowButtons(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Afficher boutons + et -</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showDropdown}
                      onChange={(e) => setShowDropdown(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Afficher dropdown</span>
                  </label>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Configurez l'affichage du sélecteur de quantité</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🧪 Tests du Sélecteur Avancé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.price}€</p>
                      <p className="text-xs text-gray-500">Max: {product.max}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {quantities[product.id] || 0} × {product.price}€
                        </p>
                        <p className="text-xs text-gray-600">
                          = {((quantities[product.id] || 0) * product.price).toLocaleString('fr-FR')}€
                        </p>
                      </div>
                      <AdvancedQuantitySelector
                        value={quantities[product.id] || 0}
                        onChange={(quantity) => handleQuantityChange(product.id, quantity)}
                        max={product.max}
                        min={1}
                        allowDelete={true}
                        onDelete={() => handleDeleteProduct(product.id)}
                        showButtons={showButtons}
                        showDropdown={showDropdown}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Résumé */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">📊 Résumé du Panier</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Articles totaux:</span>
                    <span className="font-medium">{getTotalItems()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-bold text-lg">{getTotalPrice().toLocaleString('fr-FR')}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Résultats */}
          <div className="space-y-6">
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

            {/* Produits supprimés */}
            {deletedProducts.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">🗑️ Produits supprimés</h3>
                  <div className="space-y-2">
                    {deletedProducts.map((productId) => {
                      const product = products.find((p) => p.id === productId);
                      return (
                        <div
                          key={productId}
                          className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Package className="w-5 h-5 text-red-500" />
                            <div>
                              <p className="font-medium text-red-800">{product?.name}</p>
                              <p className="text-sm text-red-600">Supprimé du panier</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRestoreProduct(productId)}
                            className="text-green-600 border-green-300 hover:bg-green-50"
                          >
                            Restaurer
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Avantages du sélecteur avancé */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">✅ Avantages du Sélecteur Avancé</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Flexibilité d'affichage (boutons + dropdown)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Suppression facile (option "Supprimer" + bouton)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Interface configurable selon les besoins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Meilleure expérience utilisateur</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Adaptable mobile et desktop</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations de debug */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">🔍 Informations de debug</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Quantités actuelles:</strong> {JSON.stringify(quantities)}
                  </p>
                  <p>
                    <strong>Total articles:</strong> {getTotalItems()}
                  </p>
                  <p>
                    <strong>Total prix:</strong> {getTotalPrice().toLocaleString('fr-FR')}€
                  </p>
                  <p>
                    <strong>Tests effectués:</strong> {testResults.length}
                  </p>
                  <p>
                    <strong>Boutons affichés:</strong> {showButtons ? 'Oui' : 'Non'}
                  </p>
                  <p>
                    <strong>Dropdown affiché:</strong> {showDropdown ? 'Oui' : 'Non'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold mb-2">📋 Instructions de test</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>
              <strong>Configuration:</strong> Activez/désactivez les boutons et dropdown
            </li>
            <li>
              <strong>Modification:</strong> Changez les quantités avec les différents contrôles
            </li>
            <li>
              <strong>Suppression:</strong> Utilisez l'option "Supprimer" ou le bouton poubelle
            </li>
            <li>
              <strong>Restauration:</strong> Restaurez les produits supprimés
            </li>
            <li>
              <strong>Flexibilité:</strong> Testez différentes configurations d'affichage
            </li>
            <li>
              <strong>Performance:</strong> Comparez les différentes méthodes de sélection
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
