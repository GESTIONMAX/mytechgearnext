'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductGrid } from '@/components/ProductGrid';
import {
  CheckCircle,
  Clock,
  Shield,
  Star,
  Zap,
  Play,
  Palette,
  Phone,
  MessageCircle,
  Diamond,
  Trophy,
  Hand,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useProducts } from '@/hooks/useSupabaseProducts';
import { useState } from 'react';

export default function PrismaticPage(): JSX.Element {
  const [showVariants, setShowVariants] = useState(true);

  // Récupérer les produits (tous les produits actifs)
  const { data: allProducts = [], isLoading, error } = useProducts();

  // Filtrer les produits de la catégorie PRISMATIC
  const products = allProducts.filter((product) => product.category?.name?.toUpperCase() === 'PRISMATIC');

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
            <span className="text-gray-900">Prismatic</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero-smart-glasses.jpg" alt="Prismatic Technology" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-green-900/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-200 text-green-700">
                PRISMATIC
              </Badge>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-white">Image personnalisable</span>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">PRISMATIC</h1>
            <h2 className="text-2xl text-white mb-4">Couleurs Réglables</h2>
            <p className="text-lg text-white/90 mb-8">Technologie de verres à couleur réglable, style marquant</p>

            {/* Features */}
            <div className="mb-8 flex flex-wrap gap-6">
              <div className="flex items-center space-x-2 text-white">
                <Palette className="h-5 w-5" />
                <span className="text-sm">Verres Réglables</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Qualité durable</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Zap className="h-5 w-5" />
                <span className="text-sm">Modèle automatique</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-green-900 hover:bg-gray-100">
                Découvrir la collection
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-900"
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
                <span className="text-sm">4.8/5 étoiles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L'Excellence Prismatique */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">L&apos;Excellence Prismatique</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Notre collection Prismatic repousse les limites de l&apos;innovation avec des technologies exclusives et
              un savoir-faire d&apos;exception.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Diamond className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Luxe Absolu</h3>
              <p className="text-sm text-gray-600">Matériaux précieux et finitions artisanales d&apos;exception</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Diamond className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verres Prismatiques</h3>
              <p className="text-sm text-gray-600">
                Technologie prismatique exclusive pour une expérience visuelle unique
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">IA Avancée</h3>
              <p className="text-sm text-gray-600">Intelligence artificielle embarquée pour une vision adaptative</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Édition Limitée</h3>
              <p className="text-sm text-gray-600">Pièces uniques numérotées, symbole d&apos;exclusivité</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Collection Prismatic */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Collection Prismatic</h2>
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant="outline">{products.length} modèles disponibles</Badge>
              <Badge variant="outline">Exclusivité</Badge>
              <Badge variant="outline">Innovation</Badge>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Des créations d&apos;exception, élaborées avec innovation et exclusivité. Chaque paire est une œuvre
              d&apos;art technologique.
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

      {/* Innovation Prismatic */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Innovation Prismatic</h2>
            <p className="text-lg text-gray-600 mb-8">La réalité augmentée accessible pour tous.</p>

            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-white/90 text-gray-900 hover:bg-white">
                  <Play className="h-6 w-6 mr-2" />
                  Cliquez pour lire la vidéo
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Vidéo de démonstration • Qualité HD • Prismatic</p>
          </div>
        </div>
      </section>

      {/* L'Art de l'Exclusivité */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">L&apos;Art de l&apos;Exclusivité</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez l&apos;artisanat d&apos;exception qui fait de chaque paire Prismatic une œuvre unique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Diamond className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Matériaux Précieux</h3>
              <p className="text-sm text-gray-600">Titane, acétate, verres trempés et or</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hand className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Artisanat d&apos;Exception</h3>
              <p className="text-sm text-gray-600">
                Façonnage à la main par nos maîtres artisans, chaque détail compte
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Série Limitée</h3>
              <p className="text-sm text-gray-600">Production limitée à 200 exemplaires numérotés dans le monde</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologie Prismatique Révolutionnaire */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technologie Prismatique Révolutionnaire</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Nos verres prismatiques utilisent une technologie de décomposition lumineuse brevetée, créant des effets
              visuels spectaculaires tout en préservant une clarté optique parfaite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="font-semibold text-white mb-2">Innovation Optique</h3>
              <p className="text-sm text-gray-300">
                Décomposition spectrale contrôlée pour des effets visuels personnalisables selon l&apos;ambiance
                désirée.
              </p>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="font-semibold text-white mb-2">IA Constructive</h3>
              <p className="text-sm text-gray-300">
                Adaptation automatique des effets prismatiques selon l&apos;environnement, l&apos;heure et l&apos;humeur
                de l&apos;utilisateur.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Innovation & Technologie Prismatique */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Innovation & Technologie Prismatique</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explorez l&apos;univers fascinant des verres prismatiques et découvrez les dernières innovations
              technologiques qui révolutionnent l&apos;optique connectée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Badge variant="secondary" className="mb-4">
                PRISMATIC
              </Badge>
              <p className="text-sm text-gray-500 mb-2">19 Avr. 2024</p>
              <h3 className="font-semibold text-gray-900 mb-2">
                La révolution des verres prismatiques: science et innovation
              </h3>
              <p className="text-sm text-gray-600 mb-4">Par Dr. Jean Petit</p>
              <Button variant="outline" size="sm">
                Lire la suite
              </Button>
            </Card>

            <Card className="p-6">
              <Badge variant="secondary" className="mb-4">
                PRISMATIC
              </Badge>
              <p className="text-sm text-gray-500 mb-2">19 Avr. 2024</p>
              <h3 className="font-semibold text-gray-900 mb-2">
                Festival fashion: les lunettes prismatiques font sensation
              </h3>
              <p className="text-sm text-gray-600 mb-4">Par Olivia</p>
              <Button variant="outline" size="sm">
                Lire la suite
              </Button>
            </Card>

            <Card className="p-6">
              <Badge variant="secondary" className="mb-4">
                PRISMATIC
              </Badge>
              <p className="text-sm text-gray-500 mb-2">19 Avr. 2024</p>
              <h3 className="font-semibold text-gray-900 mb-2">
                Customisation infinie: créez vos propres effets prismatiques
              </h3>
              <p className="text-sm text-gray-600 mb-4">Par Anaïs Dubois</p>
              <Button variant="outline" size="sm">
                Lire la suite
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Technologie Prismatique */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">FAQ Technologie Prismatique</h2>
            <p className="text-lg text-gray-600">
              Découvrez les secrets de nos verres à couleur réglable et leurs innovations.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Comment fonctionnent les verres à couleur réglable ?',
              'Combien de couleurs peuvent-ils afficher ?',
              'Les effets sont-ils visibles de nuit ?',
              'Peut-on se synchroniser avec la musique ?',
              'Quelle est la durée de vie de nos verres prismatiques ?',
              'Y a-t-il des risques pour les yeux ?',
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
              <Phone className="h-5 w-5 mr-2" />
              support@mytechgear.fr
            </Button>
            <Button variant="outline" size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              <Phone className="h-5 w-5 mr-2" />
              0123456789
            </Button>
            <Button variant="outline" size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat en direct 24/7
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
