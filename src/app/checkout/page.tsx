'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useWordPressCart } from '@/hooks/useWordPressCart';
import { useWordPressCheckout } from '@/hooks/useWordPressCheckout';
import { ArrowLeft, CreditCard, MapPin, User, Lock, Truck, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CheckoutPage(): React.JSX.Element {
  const { items, getTotalPrice, clearCart } = useWordPressCart();
  const { isProcessing, error, createOrder, validateOrder, getShippingMethods, getPaymentMethods } =
    useWordPressCheckout();

  const [shippingMethods, setShippingMethods] = useState<Array<{ id: string; title: string; cost: number }>>([]);
  const [paymentMethods] = useState(getPaymentMethods());
  const [selectedShipping, setSelectedShipping] = useState<string>('free_shipping');
  const [selectedPayment, setSelectedPayment] = useState<string>('stripe');

  const [formData, setFormData] = useState({
    // Billing
    billing_first_name: '',
    billing_last_name: '',
    billing_email: '',
    billing_phone: '',
    billing_company: '',
    billing_address_1: '',
    billing_address_2: '',
    billing_city: '',
    billing_state: '',
    billing_postcode: '',
    billing_country: 'FR',

    // Shipping
    shipping_first_name: '',
    shipping_last_name: '',
    shipping_company: '',
    shipping_address_1: '',
    shipping_address_2: '',
    shipping_city: '',
    shipping_state: '',
    shipping_postcode: '',
    shipping_country: 'FR',

    // Same as billing
    sameAsBilling: true,
  });

  // Charger les méthodes de livraison
  useEffect(() => {
    getShippingMethods().then(setShippingMethods);
  }, [getShippingMethods]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleShippingChange = (methodId: string): void => {
    setSelectedShipping(methodId);
  };

  const handlePaymentChange = (methodId: string): void => {
    setSelectedPayment(methodId);
  };

  const getSelectedShippingMethod = () => {
    return shippingMethods.find((method) => method.id === selectedShipping) || shippingMethods[0];
  };

  const getSelectedPaymentMethod = () => {
    return paymentMethods.find((method) => method.id === selectedPayment) || paymentMethods[0];
  };

  const calculateSubtotal = (): number => {
    return items.reduce((total, item) => total + item.total, 0);
  };

  const calculateShipping = (): number => {
    const method = getSelectedShippingMethod();
    return method ? method.cost : 0;
  };

  const calculateTotal = (): number => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    // Copier les données de facturation vers l'expédition si nécessaire
    const finalFormData = { ...formData };
    if (finalFormData.sameAsBilling) {
      finalFormData.shipping_first_name = finalFormData.billing_first_name;
      finalFormData.shipping_last_name = finalFormData.billing_last_name;
      finalFormData.shipping_company = finalFormData.billing_company;
      finalFormData.shipping_address_1 = finalFormData.billing_address_1;
      finalFormData.shipping_address_2 = finalFormData.billing_address_2;
      finalFormData.shipping_city = finalFormData.billing_city;
      finalFormData.shipping_state = finalFormData.billing_state;
      finalFormData.shipping_postcode = finalFormData.billing_postcode;
      finalFormData.shipping_country = finalFormData.billing_country;
    }

    // Préparer les données de commande
    const orderData = {
      payment_method: selectedPayment,
      payment_method_title: getSelectedPaymentMethod()?.title || 'Paiement',
      set_paid: false, // Laisser WooCommerce gérer le statut de paiement
      billing: {
        first_name: finalFormData.billing_first_name,
        last_name: finalFormData.billing_last_name,
        company: finalFormData.billing_company,
        address_1: finalFormData.billing_address_1,
        address_2: finalFormData.billing_address_2,
        city: finalFormData.billing_city,
        state: finalFormData.billing_state,
        postcode: finalFormData.billing_postcode,
        country: finalFormData.billing_country,
        email: finalFormData.billing_email,
        phone: finalFormData.billing_phone,
      },
      shipping: {
        first_name: finalFormData.shipping_first_name,
        last_name: finalFormData.shipping_last_name,
        company: finalFormData.shipping_company,
        address_1: finalFormData.shipping_address_1,
        address_2: finalFormData.shipping_address_2,
        city: finalFormData.shipping_city,
        state: finalFormData.shipping_state,
        postcode: finalFormData.shipping_postcode,
        country: finalFormData.shipping_country,
      },
      line_items: items.map((item) => ({
        product_id: item.productId,
        variation_id: item.variantId,
        quantity: item.quantity,
      })),
      shipping_lines: [
        {
          method_id: selectedShipping,
          method_title: getSelectedShippingMethod()?.title || 'Livraison',
          total: calculateShipping().toString(),
        },
      ],
    };

    // Valider la commande
    if (!validateOrder(orderData)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Créer la commande
    const orderId = await createOrder(orderData);

    if (orderId) {
      // Vider le panier et rediriger vers la page de confirmation
      clearCart();
      window.location.href = `/checkout/success?order=${orderId}`;
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Panier vide</h1>
          <p className="text-gray-600 mb-6">Votre panier est vide. Ajoutez des produits pour continuer.</p>
          <Link href="/products">
            <Button>Voir les produits</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/products">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux produits
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Finaliser la commande</h1>
          </div>
          <p className="text-muted-foreground">Complétez vos informations pour finaliser votre achat</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations de facturation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informations de facturation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billing_first_name">Prénom *</Label>
                      <Input
                        id="billing_first_name"
                        name="billing_first_name"
                        value={formData.billing_first_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="billing_last_name">Nom *</Label>
                      <Input
                        id="billing_last_name"
                        name="billing_last_name"
                        value={formData.billing_last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billing_email">Email *</Label>
                    <Input
                      id="billing_email"
                      name="billing_email"
                      type="email"
                      value={formData.billing_email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="billing_phone">Téléphone</Label>
                    <Input
                      id="billing_phone"
                      name="billing_phone"
                      value={formData.billing_phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="billing_address_1">Adresse *</Label>
                    <Input
                      id="billing_address_1"
                      name="billing_address_1"
                      value={formData.billing_address_1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billing_city">Ville *</Label>
                      <Input
                        id="billing_city"
                        name="billing_city"
                        value={formData.billing_city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="billing_postcode">Code postal *</Label>
                      <Input
                        id="billing_postcode"
                        name="billing_postcode"
                        value={formData.billing_postcode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adresse de livraison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Adresse de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sameAsBilling"
                      name="sameAsBilling"
                      checked={formData.sameAsBilling}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <Label htmlFor="sameAsBilling">Identique à l'adresse de facturation</Label>
                  </div>

                  {!formData.sameAsBilling && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shipping_first_name">Prénom *</Label>
                          <Input
                            id="shipping_first_name"
                            name="shipping_first_name"
                            value={formData.shipping_first_name}
                            onChange={handleInputChange}
                            required={!formData.sameAsBilling}
                          />
                        </div>
                        <div>
                          <Label htmlFor="shipping_last_name">Nom *</Label>
                          <Input
                            id="shipping_last_name"
                            name="shipping_last_name"
                            value={formData.shipping_last_name}
                            onChange={handleInputChange}
                            required={!formData.sameAsBilling}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="shipping_address_1">Adresse *</Label>
                        <Input
                          id="shipping_address_1"
                          name="shipping_address_1"
                          value={formData.shipping_address_1}
                          onChange={handleInputChange}
                          required={!formData.sameAsBilling}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shipping_city">Ville *</Label>
                          <Input
                            id="shipping_city"
                            name="shipping_city"
                            value={formData.shipping_city}
                            onChange={handleInputChange}
                            required={!formData.sameAsBilling}
                          />
                        </div>
                        <div>
                          <Label htmlFor="shipping_postcode">Code postal *</Label>
                          <Input
                            id="shipping_postcode"
                            name="shipping_postcode"
                            value={formData.shipping_postcode}
                            onChange={handleInputChange}
                            required={!formData.sameAsBilling}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Méthodes de livraison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {shippingMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedShipping === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleShippingChange(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{method.title}</h3>
                          <p className="text-sm text-gray-600">
                            {method.cost === 0 ? 'Gratuit' : `+${formatPrice(method.cost)}`}
                          </p>
                        </div>
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={selectedShipping === method.id}
                          onChange={() => handleShippingChange(method.id)}
                          className="text-primary"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Méthodes de paiement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handlePaymentChange(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{method.title}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={() => handlePaymentChange(method.id)}
                          className="text-primary"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Erreur */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              {/* Bouton de commande */}
              <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Finaliser la commande
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Résumé de la commande */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Articles */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={item.product.images?.[0]?.src || '/placeholder.svg'}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        {item.variant && (
                          <p className="text-xs text-gray-600">
                            {item.variant.attributes?.map((attr) => attr.option).join(' - ') || 'Standard'}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">{formatPrice(item.total)}</div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totaux */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>{calculateShipping() === 0 ? 'Gratuit' : formatPrice(calculateShipping())}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Paiement sécurisé et protégé</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
