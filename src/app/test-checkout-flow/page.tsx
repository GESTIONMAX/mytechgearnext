'use client';

import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { useWordPressCart } from '@/hooks/useWordPressCart';
import { WordPressProductCard } from '@/components/WordPressProductCard';
import { WordPressCartDrawer } from '@/components/WordPressCartDrawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ShoppingCart, CreditCard, Package, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function TestCheckoutFlowPage(): React.JSX.Element {
  const { products, isLoading, error } = useWordPressProducts();
  const { items, totalItems, totalPrice, addItem, clearCart } = useWordPressCart();
  const [currentStep, setCurrentStep] = useState<'products' | 'cart' | 'checkout' | 'success'>('products');

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const handleAddToCart = (product: unknown): void => {
    addItem(product, 1);
    alert(`Ajouté au panier: ${product.name}`);
  };

  const handleProceedToCheckout = (): void => {
    if (items.length === 0) {
      alert('Votre panier est vide');
      return;
    }
    setCurrentStep('checkout');
  };

  const handleCompleteOrder = (): void => {
    // Simulation de la création de commande
    alert('Commande créée avec succès !');
    clearCart();
    setCurrentStep('success');
  };

  const resetFlow = (): void => {
    setCurrentStep('products');
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🛒 Test Parcours Checkout</h1>
          <p className="text-gray-600 mb-4">
            Test complet du parcours d&apos;achat : Produits → Panier → Checkout → Confirmation
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

        {/* Étapes du parcours */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div
              className={`flex items-center space-x-2 ${currentStep === 'products' ? 'text-primary' : 'text-gray-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'products' ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
              >
                1
              </div>
              <span className="font-medium">Produits</span>
            </div>

            <ArrowRight className="w-4 h-4 text-gray-400" />

            <div className={`flex items-center space-x-2 ${currentStep === 'cart' ? 'text-primary' : 'text-gray-400'}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'cart' ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
              >
                2
              </div>
              <span className="font-medium">Panier</span>
            </div>

            <ArrowRight className="w-4 h-4 text-gray-400" />

            <div
              className={`flex items-center space-x-2 ${currentStep === 'checkout' ? 'text-primary' : 'text-gray-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'checkout' ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
              >
                3
              </div>
              <span className="font-medium">Checkout</span>
            </div>

            <ArrowRight className="w-4 h-4 text-gray-400" />

            <div
              className={`flex items-center space-x-2 ${currentStep === 'success' ? 'text-primary' : 'text-gray-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'success' ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
              >
                4
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Contenu selon l'étape */}
        {currentStep === 'products' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">🛍️ Sélectionnez des produits</h2>
              <p className="text-gray-600 mb-6">Cliquez sur &quot;Ajouter au panier&quot; pour tester le parcours</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product) => (
                <WordPressProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={() => {}}
                  onQuickView={() => {}}
                  onShare={() => {}}
                  showActions={true}
                />
              ))}
            </div>

            {totalItems > 0 && (
              <div className="text-center space-x-4">
                <Button onClick={() => setCurrentStep('cart')} size="lg">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Voir le panier ({totalItems} articles)
                </Button>
                <WordPressCartDrawer>
                  <Button variant="outline" size="lg">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ouvrir le panier
                  </Button>
                </WordPressCartDrawer>
              </div>
            )}
          </div>
        )}

        {currentStep === 'cart' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">🛒 Votre panier</h2>
              <p className="text-gray-600 mb-6">Vérifiez vos articles avant de procéder au checkout</p>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Panier vide</h3>
                <p className="text-gray-600 mb-4">Ajoutez des produits pour continuer</p>
                <Button onClick={() => setCurrentStep('products')}>Voir les produits</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          {item.variant && (
                            <p className="text-sm text-gray-600">
                              {item.variant.attributes?.map((attr) => attr.option).join(' - ') || 'Standard'}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(item.total)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-wrap gap-4">
                  <Button onClick={handleProceedToCheckout} size="lg" className="flex-1">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Procéder au checkout
                  </Button>
                  <WordPressCartDrawer>
                    <Button variant="outline" size="lg">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Gérer le panier
                    </Button>
                  </WordPressCartDrawer>
                  <Button variant="outline" onClick={() => setCurrentStep('products')}>
                    Continuer mes achats
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 'checkout' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">💳 Checkout</h2>
              <p className="text-gray-600 mb-6">Simulation du processus de checkout</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Informations de commande</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Prénom</label>
                      <input type="text" defaultValue="Jean" className="w-full p-2 border rounded-lg" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nom</label>
                      <input type="text" defaultValue="Dupont" className="w-full p-2 border rounded-lg" readOnly />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue="jean.dupont@example.com"
                      className="w-full p-2 border rounded-lg"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Adresse</label>
                    <input
                      type="text"
                      defaultValue="123 Rue de la Paix"
                      className="w-full p-2 border rounded-lg"
                      readOnly
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Ville</label>
                      <input type="text" defaultValue="Paris" className="w-full p-2 border rounded-lg" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Code postal</label>
                      <input type="text" defaultValue="75001" className="w-full p-2 border rounded-lg" readOnly />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium">Méthode de livraison</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="shipping" defaultChecked />
                        <span>Livraison gratuite (5-7 jours)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="shipping" />
                        <span>Livraison express (+5.99€, 1-2 jours)</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Méthode de paiement</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="payment" defaultChecked />
                        <span>Carte bancaire</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="payment" />
                        <span>Virement bancaire</span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
                  </div>

                  <Button onClick={handleCompleteOrder} size="lg" className="w-full">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Finaliser la commande
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 'success' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">🎉 Commande confirmée !</h2>
              <p className="text-gray-600 mb-6">Votre commande a été créée avec succès. Merci pour votre achat !</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Commande créée</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Panier vidé</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Redirection vers la confirmation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center space-x-4">
              <Button onClick={resetFlow}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Nouveau test
              </Button>
              <Link href="/products">
                <Button variant="outline">Voir les produits</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold mb-2">📋 Instructions de test</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>
              <strong>Étape 1:</strong> Ajoutez des produits au panier
            </li>
            <li>
              <strong>Étape 2:</strong> Vérifiez le contenu du panier
            </li>
            <li>
              <strong>Étape 3:</strong> Remplissez le formulaire de checkout
            </li>
            <li>
              <strong>Étape 4:</strong> Finalisez la commande
            </li>
            <li>
              <strong>Résultat:</strong> Vérifiez la page de confirmation
            </li>
          </ol>
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">🔍 Informations de debug</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Étape actuelle:</strong> {currentStep}
            </p>
            <p>
              <strong>Articles dans le panier:</strong> {totalItems}
            </p>
            <p>
              <strong>Total du panier:</strong> {formatPrice(totalPrice)}
            </p>
            <p>
              <strong>Produits disponibles:</strong> {products.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
