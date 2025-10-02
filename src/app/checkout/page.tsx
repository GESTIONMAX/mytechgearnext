import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Shield, Truck } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function CheckoutPage(): ReactNode {
  const cartItems = [
    {
      id: '1',
      name: 'Sport Pro Max',
      variant: 'Noir - Taille L',
      price: 399.0,
      quantity: 1,
      image: '/placeholder-product.jpg',
    },
    {
      id: '2',
      name: 'Lifestyle Elite',
      variant: 'Argent - Taille M',
      price: 299.0,
      quantity: 1,
      image: '/placeholder-product.jpg',
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 9.99;
  const tax = subtotal * 0.2; // 20% TVA
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux produits
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Finaliser la commande</h1>
          <p className="mt-2 text-gray-600">Vérifiez vos informations et finalisez votre achat</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Informations de livraison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Prénom</label>
                    <Input placeholder="Jean" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nom</label>
                    <Input placeholder="Dupont" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input type="email" placeholder="jean.dupont@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Téléphone</label>
                  <Input placeholder="+33 6 12 34 56 78" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Adresse</label>
                  <Input placeholder="123 Rue de la Paix" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Code postal</label>
                    <Input placeholder="75001" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Ville</label>
                    <Input placeholder="Paris" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Pays</label>
                    <Input placeholder="France" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Informations de paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Numéro de carte</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Mois</label>
                    <Input placeholder="MM" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Année</label>
                    <Input placeholder="YY" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">CVV</label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom sur la carte</label>
                  <Input placeholder="Jean Dupont" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="save-card" />
                  <label htmlFor="save-card" className="text-sm text-gray-600">
                    Enregistrer cette carte pour les prochains achats
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle>Options de livraison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="delivery" value="standard" defaultChecked />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Livraison standard</span>
                        <span className="text-sm text-gray-600">Gratuit</span>
                      </div>
                      <p className="text-sm text-gray-600">5-7 jours ouvrés</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="delivery" value="express" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Livraison express</span>
                        <span className="text-sm text-gray-600">9.99€</span>
                      </div>
                      <p className="text-sm text-gray-600">2-3 jours ouvrés</p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Image</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.variant}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Livraison</span>
                    <span>{shipping.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>TVA (20%)</span>
                    <span>{tax.toFixed(2)}€</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Trust */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Sécurité et garanties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Livraison gratuite dès 100€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Garantie 2 ans</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Retour gratuit sous 30 jours</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button className="w-full" size="lg">
              <CreditCard className="h-5 w-5 mr-2" />
              Finaliser la commande - {total.toFixed(2)}€
            </Button>

            <p className="text-xs text-gray-500 text-center">
              En finalisant votre commande, vous acceptez nos{' '}
              <Link href="/terms" className="text-primary hover:underline">
                conditions générales de vente
              </Link>{' '}
              et notre{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
