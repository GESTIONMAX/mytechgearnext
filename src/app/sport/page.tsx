'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductGrid } from '@/components/ProductGrid';
import { CheckCircle, Clock, Shield, Star, Truck, Headphones, Zap, Gauge, MapPin, Battery, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useProducts } from '@/hooks/useSupabaseProducts';
import { useState } from 'react';

export default function SportPage(): JSX.Element {
  const [showVariants, setShowVariants] = useState(true);

  // Récupérer les produits (tous les produits actifs)
  const { data: allProducts = [], isLoading, error } = useProducts();

  // Filtrer les produits de la catégorie SPORT
  const products = allProducts.filter((product) => product.category?.name?.toUpperCase() === 'SPORT');

  const handleAddToCart = (product: any, variant?: any): void => {
    // TODO: Implement functionality
    // TODO: Implémenter l'ajout au panier
  };

  const handleToggleWishlist = (product: any): void => {
    // TODO: Implement functionality
    // TODO: Implémenter la wishlist
  };

  const handleQuickView = (product: any): void => {
    // TODO: Implement functionality
    // TODO: Implémenter l'aperçu rapide
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Accueil
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">Sport</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero-smart-glasses.jpg" alt="Sport Performance" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-blue-900/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center space-x-2">
              <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                SPORT
              </Badge>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-white">Image personnalisée</span>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">SPORT</h1>
            <h2 className="text-2xl text-white mb-4">Performance & Cyclisme</h2>
            <p className="text-lg text-white/90 mb-8">Performance et usages sports, notamment cyclisme</p>

            {/* Features */}
            <div className="mb-8 flex flex-wrap gap-6">
              <div className="flex items-center space-x-2 text-white">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">GPS intégré</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Résistance à l&apos;eau</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Zap className="h-5 w-5" />
                <span className="text-sm">Capteurs de performance</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Découvrir la collection
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                Voir les specs techniques
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Livraison 24-48h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Garantie 2 ans</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span className="text-sm">4.8 étoiles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conçues pour la Performance */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Conçues pour la Performance</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nos lunettes sport combinent technologie avancée et design ergonomique pour accompagner tous vos défis
              sportifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Protection IP67</h3>
              <p className="text-sm text-gray-600">Résistance à l&apos;eau et à la poussière pour tous vos sports</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Audio intégré</h3>
              <p className="text-sm text-gray-600">Écoutez votre musique ou prenez vos appels en toute liberté</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Battery className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Batterie longue durée</h3>
              <p className="text-sm text-gray-600">Jusqu&apos;à 8h d&apos;autonomie pour vos entraînements</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gauge className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Performance tracking</h3>
              <p className="text-sm text-gray-600">Suivi en temps réel de vos performances sportives</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Collection Sport */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Collection Sport</h2>
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant="outline">{products.length} modèles disponibles</Badge>
              <span className="text-sm text-gray-600">Prix variables selon les variantes</span>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              De l&apos;entrée de gamme au haut de gamme, trouvez les lunettes parfaites pour votre pratique sportive.
            </p>

            {/* Contrôles d'affichage */}
            <div className="mt-6 flex justify-center space-x-4">
              <Button variant={showVariants ? 'default' : 'outline'} onClick={() => setShowVariants(true)}>
                Afficher les variantes
              </Button>
              <Button variant={!showVariants ? 'default' : 'outline'} onClick={() => setShowVariants(false)}>
                Produits principaux
              </Button>
            </div>
          </div>

          {/* Grille de produits dynamique */}
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Erreur lors du chargement des produits</p>
            </div>
          ) : (
            <ProductGrid
              products={products}
              isLoading={isLoading}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={handleQuickView}
              showActions={true}
              columns={3}
              showVariants={showVariants}
            />
          )}
        </div>
      </section>

      {/* Vidéo Sport */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vidéo Sport</h2>
            <p className="text-lg text-gray-600 mb-8">Dernière vidéo uploadée pour la catégorie sport.</p>

            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-white/90 text-gray-900 hover:bg-white">
                  <Play className="h-6 w-6 mr-2" />
                  Cliquez pour voir la vidéo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actualités Sport & Performance */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Actualités Sport & Performance</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les derniers conseils, tests et innovations pour optimiser vos performances sportives avec les
              lunettes connectées.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Les lunettes connectées révolutionnent le cyclisme professionnel
              </h3>
              <p className="text-sm text-gray-600 mb-4">Par Marc Dubois</p>
              <Button variant="outline" size="sm">
                Lire l&apos;article
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Trail running : comment choisir ses lunettes connectées
              </h3>
              <p className="text-sm text-gray-600 mb-4">Par Sophie Morin</p>
              <Button variant="outline" size="sm">
                Lire l&apos;article
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Audio intégré vs écouteurs : le débat pour les sportifs
              </h3>
              <p className="text-sm text-gray-600 mb-4">Par Thomas Leroy</p>
              <Button variant="outline" size="sm">
                Lire l&apos;article
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Sport & Performance */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">FAQ Sport & Performance</h2>
            <p className="text-lg text-gray-600">
              Tout ce que vous devez savoir sur nos lunettes connectées pour le sport.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Les lunettes sport résistent-elles à la transpiration ?',
              "Quelle est l'autonomie pendant une session d'entraînement ?",
              "Peut-on utiliser l'audio intégré en cyclisme sur route ?",
              "Les verres s'adaptent-ils automatiquement à la luminosité ?",
              'Sont-elles compatibles avec un casque de vélo ?',
              'Comment fonctionnent les capteurs de performance ?',
            ].map((question, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{question}</span>
                  <Button variant="ghost" size="sm">
                    <span className="sr-only">Ouvrir</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vous avez d'autres questions ? */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vous avez d&apos;autres questions ?</h2>
          <p className="text-lg text-gray-600 mb-8">Notre équipe d&apos;experts est là pour vous accompagner.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              support@mytechgear.fr
            </Button>
            <Button variant="outline" size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              01.23.45.67.89
            </Button>
          </div>
        </div>
      </section>

      {/* Prêt à révolutionner votre sport ? */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à révolutionner votre sport ?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Essayez nos lunettes connectées 30 jours, satisfait ou remboursé. Livraison gratuite et service client
            dédié.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Essai 30 jours</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-green-400" />
              <span>Livraison offerte</span>
            </div>
            <div className="flex items-center space-x-2">
              <Headphones className="h-5 w-5 text-green-400" />
              <span>Support technique</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
