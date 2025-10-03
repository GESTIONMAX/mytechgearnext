'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, Truck, CreditCard, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface WordPressOrder {
  id: number;
  status: string;
  total: string;
  currency: string;
  date_created: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
  };
  line_items: Array<{
    id: number;
    name: string;
    quantity: number;
    total: string;
    image?: {
      src: string;
    };
  }>;
  shipping_lines: Array<{
    method_title: string;
    total: string;
  }>;
  payment_method_title: string;
}

export default function CheckoutSuccessPage(): React.JSX.Element {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const [order, setOrder] = useState<WordPressOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    } else {
      setError('Numéro de commande manquant');
      setIsLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async (id: string): Promise<void> => {
    try {
      const WORDPRESS_URL =
        process.env.NEXT_PUBLIC_WORDPRESS_URL ||
        'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com';
      const WC_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
      const WC_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

      if (!WORDPRESS_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
        throw new Error('Configuration WordPress manquante');
      }

      const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

      const response = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/orders/${id}`, {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération de la commande: ${response.statusText}`);
      }

      const orderData: WordPressOrder = await response.json();
      setOrder(orderData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: string): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(price));
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'processing':
        return 'En cours de traitement';
      case 'completed':
        return 'Commande terminée';
      case 'pending':
        return 'En attente de paiement';
      case 'cancelled':
        return 'Commande annulée';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Récupération des détails de la commande...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Erreur</h1>
          <p className="text-gray-600 mb-4">{error || 'Commande non trouvée'}</p>
          <div className="space-x-4">
            <Link href="/products">
              <Button>Voir les produits</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Retour à l'accueil</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header de succès */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Commande confirmée !</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Merci pour votre achat. Votre commande a été enregistrée avec succès.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`${getStatusColor(order.status)} text-lg px-4 py-2`}>{getStatusText(order.status)}</Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Commande #{order.id}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Détails de la commande */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Détails de la commande
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Numéro de commande:</span>
                    <p className="text-gray-600">#{order.id}</p>
                  </div>
                  <div>
                    <span className="font-medium">Date:</span>
                    <p className="text-gray-600">{formatDate(order.date_created)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Statut:</span>
                    <p className="text-gray-600">{getStatusText(order.status)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Total:</span>
                    <p className="text-gray-600 font-bold">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Articles commandés */}
            <Card>
              <CardHeader>
                <CardTitle>Articles commandés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.line_items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image.src} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Package className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(item.total)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Adresse de facturation */}
            <Card>
              <CardHeader>
                <CardTitle>Adresse de facturation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">
                    {order.billing.first_name} {order.billing.last_name}
                  </p>
                  <p>{order.billing.address_1}</p>
                  <p>
                    {order.billing.postcode} {order.billing.city}
                  </p>
                  <p>{order.billing.country}</p>
                  {order.billing.phone && <p>Tél: {order.billing.phone}</p>}
                  <p>Email: {order.billing.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Adresse de livraison */}
            <Card>
              <CardHeader>
                <CardTitle>Adresse de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">
                    {order.shipping.first_name} {order.shipping.last_name}
                  </p>
                  <p>{order.shipping.address_1}</p>
                  <p>
                    {order.shipping.postcode} {order.shipping.city}
                  </p>
                  <p>{order.shipping.country}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Résumé et actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>

                  {order.shipping_lines.map((shipping, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{shipping.method_title}</span>
                      <span>{parseFloat(shipping.total) === 0 ? 'Gratuit' : formatPrice(shipping.total)}</span>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Méthode de paiement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Méthode: {order.payment_method_title}</p>
              </CardContent>
            </Card>

            {/* Prochaines étapes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Prochaines étapes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <span className="text-sm">Confirmation par email</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">2</span>
                  </div>
                  <span className="text-sm">Préparation de la commande</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">3</span>
                  </div>
                  <span className="text-sm">Expédition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">4</span>
                  </div>
                  <span className="text-sm">Livraison</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-4">
              <Link href="/products">
                <Button className="w-full">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continuer mes achats
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
