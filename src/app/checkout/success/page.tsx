'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header de succès */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Commande confirmée !</h1>
          <p className="text-xl text-gray-600 mb-6">
            Merci pour votre achat. Votre commande a été enregistrée avec succès.
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            N° de commande: #MTG-{Date.now().toString().slice(-6)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Détails de la commande */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Détails de votre commande
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date de commande</span>
                  <span className="font-medium">{new Date().toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Méthode de paiement</span>
                  <span className="font-medium">Carte bancaire</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut</span>
                  <Badge className="bg-green-100 text-green-800">Confirmée</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison estimée</span>
                  <span className="font-medium">2-3 jours ouvrés</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suivi de livraison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Suivi de livraison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Commande confirmée</p>
                    <p className="text-xs text-gray-600">Votre commande a été validée</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Préparation en cours</p>
                    <p className="text-xs text-gray-600">Vos articles sont en cours de préparation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-500">En cours de livraison</p>
                    <p className="text-xs text-gray-500">Vous recevrez un email de suivi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-500">Livrée</p>
                    <p className="text-xs text-gray-500">Livraison prévue dans 2-3 jours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-12 text-center space-y-4">
          <div className="space-y-3">
            <p className="text-gray-600">Un email de confirmation a été envoyé à votre adresse email.</p>
            <p className="text-sm text-gray-500">
              Vous recevrez un email de suivi dès que votre commande sera expédiée.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-auto">
                Continuer mes achats
              </Button>
            </Link>
            <Link href="/account">
              <Button className="w-full sm:w-auto">
                Voir mes commandes
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email de confirmation</h3>
              <p className="text-sm text-gray-600">Vous recevrez un email avec tous les détails de votre commande.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Livraison gratuite</h3>
              <p className="text-sm text-gray-600">Livraison gratuite sous 24-48h partout en France.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Garantie satisfait</h3>
              <p className="text-sm text-gray-600">30 jours pour changer d&apos;avis, retour gratuit.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
