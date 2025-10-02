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
  Battery,
  Play,
  Camera,
  Users,
  Palette,
  Briefcase,
  Navigation,
  Lightbulb,
  Phone,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useProducts } from '@/hooks/useSupabaseProducts';
import { useState } from 'react';

export default function LifestylePage(): JSX.Element {
  const [showVariants, setShowVariants] = useState(true);

  // Récupérer les produits (tous les produits actifs)
  const { data: allProducts = [], isLoading, error } = useProducts();

  // Filtrer les produits de la catégorie LIFESTYLE
  const products = allProducts.filter((product) => product.category?.name?.toUpperCase() === 'LIFESTYLE');

  const handleAddToCart = (product: any, variant?: any): void => {
    console.log('Ajouter au panier:', product.name, variant ? variant.name : '');
    // TODO: Implémenter l'ajout au panier
  };

  const handleToggleWishlist = (product: any): void => {
    console.log('Toggle wishlist:', product.name);
    // TODO: Implémenter la wishlist
  };

  const handleQuickView = (product: any): void => {
    console.log('Quick view:', product.name);
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
            <span className="text-gray-900">Lifestyle</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero-smart-glasses.jpg" alt="Lifestyle Elegance" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-purple-900/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center space-x-2">
              <Badge variant="secondary" className="bg-purple-200 text-purple-700">
                LIFESTYLE
              </Badge>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-white">Image personnalisée</span>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">LIFESTYLE</h1>
            <h2 className="text-2xl text-white mb-4">Élégance Connectée</h2>
            <p className="text-lg text-white/90 mb-8">Design élégant, usage citadin moderne et innovant</p>

            {/* Features */}
            <div className="mb-8 flex flex-wrap gap-6">
              <div className="flex items-center space-x-2 text-white">
                <Palette className="h-5 w-5" />
                <span className="text-sm">Design Premium</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Notifications discrètes</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Battery className="h-5 w-5" />
                <span className="text-sm">Autonomie 24h</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                Découvrir la collection
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-900"
              >
                Voir les fiches techniques
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

      {/* L'Élégance Connectée */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">L&apos;Élégance Connectée</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nos lunettes lifestyle combinent design raffiné et technologie avancée pour votre quotidien urbain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Design Premium</h3>
              <p className="text-sm text-gray-600">Lignes modernes et matériaux de qualité pour un style raffiné</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Photo & Vidéo</h3>
              <p className="text-sm text-gray-600">Capturez vos moments en HD avec discrétion</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Social Connect</h3>
              <p className="text-sm text-gray-600">Restez connecté avec vos proches en toute discrétion</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Style Adaptatif</h3>
              <p className="text-sm text-gray-600">S&apos;adapte à votre style personnel et vos besoins</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Collection Lifestyle */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Collection Lifestyle</h2>
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant="outline">{products.length} modèles disponibles</Badge>
              <span className="text-sm text-gray-600">Prix variables selon les variantes</span>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              De l&apos;élégance classique au design contemporain, trouvez vos lunettes lifestyle parfaites.
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
              columns={4}
              showVariants={showVariants}
            />
          )}
        </div>
      </section>

      {/* Style et Technologie */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Style et Technologie</h2>
            <p className="text-lg text-gray-600 mb-8">L&apos;élégance connectée pour votre quotidien</p>

            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-white/90 text-gray-900 hover:bg-white">
                  <Play className="h-6 w-6 mr-2" />
                  Cliquez pour voir la vidéo
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Voir la vidéo de démonstration - Qualité HD - Ultra fluide</p>
          </div>
        </div>
      </section>

      {/* Pourquoi Choisir Lifestyle ? */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi Choisir Lifestyle ?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les avantages de nos lunettes lifestyle pour votre quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professionnel</h3>
              <p className="text-sm text-gray-600">Parfait pour les réunions et présentations</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Urbain</h3>
              <p className="text-sm text-gray-600">Navigation GPS et informations en temps réel</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Créatif</h3>
              <p className="text-sm text-gray-600">Capturez vos moments d&apos;inspiration</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Lifestyle & Tech Connectée */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lifestyle & Tech Connectée</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Restez informé des dernières tendances et innovations lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Badge variant="secondary" className="mb-4">
                LIFESTYLE
              </Badge>
              <p className="text-sm text-gray-500 mb-2">19 Avr. 2024</p>
              <h3 className="font-semibold text-gray-900 mb-2">
                Lunettes connectées au bureau : productivité et style
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Comment intégrer les lunettes connectées dans votre environnement professionnel...
              </p>
              <Button variant="outline" size="sm">
                Lire l&apos;article
              </Button>
            </Card>

            <Card className="p-6">
              <Badge variant="secondary" className="mb-4">
                LIFESTYLE
              </Badge>
              <p className="text-sm text-gray-500 mb-2">19 Avr. 2024</p>
              <h3 className="font-semibold text-gray-900 mb-2">
                Tendances 2024 : les lunettes connectées deviennent mainstream
              </h3>
              <p className="text-sm text-gray-600 mb-4">Découvrez les tendances qui marquent l&apos;année 2024...</p>
              <Button variant="outline" size="sm">
                Lire l&apos;article
              </Button>
            </Card>

            <Card className="p-6">
              <Badge variant="secondary" className="mb-4">
                LIFESTYLE
              </Badge>
              <p className="text-sm text-gray-500 mb-2">19 Avr. 2024</p>
              <h3 className="font-semibold text-gray-900 mb-2">
                Smart glasses et vie urbaine : le guide du citadin connecté
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Comment optimiser votre expérience urbaine avec les lunettes connectées...
              </p>
              <Button variant="outline" size="sm">
                Lire l&apos;article
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Lifestyle & Usage Quotidien */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-gray-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">FAQ Lifestyle & Usage Quotidien</h2>
            </div>
            <p className="text-lg text-gray-600">
              Questions fréquentes sur l&apos;intégration des lunettes connectées dans votre vie quotidienne
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Peut-on porter ces lunettes toute la journée sans inconfort ?',
              'Les notifications sont-elles visibles par les autres ?',
              'Comment fonctionne la navigation GPS ?',
              'Peut-on protéger des verres correcteurs ?',
              'La connexion Bluetooth est-elle stable ?',
              'Y a-t-il une version femme spécifique ?',
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
              Contacter un expert
            </Button>
            <Button variant="outline" size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              <MessageCircle className="h-5 w-5 mr-2" />
              Chattez avec nous
            </Button>
          </div>
        </div>
      </section>

      {/* Redéfinissez votre style */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Redéfinissez votre style</h2>
          <p className="text-lg text-gray-300 mb-8">
            Découvrez comment nos lunettes lifestyle vont transformer votre quotidien avec élégance et innovation
            technologique.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              Design premium
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              Technologie avancée
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              Confort optimal
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
