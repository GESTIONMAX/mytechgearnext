'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Shield,
  Truck,
  Zap,
  Star,
  Globe,
  Award,
  CheckCircle,
  Play,
  Sparkles,
  Eye,
  Smartphone,
  Headphones,
  Camera,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ChameleoHero = (): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-transparent to-muted/20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 text-foreground">
              {/* Official Badge */}
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-border text-foreground">
                  <Award className="w-4 h-4 mr-2" />
                  Revendeur Officiel Europe
                </Badge>
                <Badge variant="outline" className="border-border text-muted-foreground">
                  <Globe className="w-4 h-4 mr-2" />
                  Chameleo
                </Badge>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-foreground">
                  Chameleo
                  <br />
                  <span className="text-muted-foreground">Lunettes Connectées</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Découvrez les lunettes connectées Chameleo, la révolution technologique qui transforme votre vision du
                  monde.
                  <span className="font-semibold text-foreground"> Innovation, performance et style réunis.</span>
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Eye className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Réalité Augmentée</p>
                    <p className="text-xs text-blue-200">Vision enrichie</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Connectivité</p>
                    <p className="text-xs text-blue-200">Toujours connecté</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Camera className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Photo/Vidéo</p>
                    <p className="text-xs text-blue-200">Capture instantanée</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Headphones className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Audio Spatial</p>
                    <p className="text-xs text-blue-200">Son 3D</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Découvrir Chameleo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted">
                  <Play className="mr-2 h-4 w-4" />
                  Voir la démo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.9/5 (2.3k avis)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Livraison 24-48h</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Garantie 2 ans</span>
                </div>
              </div>
            </div>

            {/* 3D Product Showcase */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/20 overflow-hidden">
                {/* Product Mockup */}
                <div className="absolute inset-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mx-auto flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">Chameleo Pro</h3>
                    <p className="text-blue-200 text-sm">Lunettes connectées nouvelle génération</p>
                  </div>
                </div>

                {/* Floating UI Elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Camera className="w-6 h-6 text-white" />
                </div>

                <div className="absolute bottom-8 left-8 w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              La technologie{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Chameleo
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez les innovations qui rendent les lunettes Chameleo uniques au monde
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AR Technology */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-8 text-center text-white">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Réalité Augmentée</h3>
                <p className="text-blue-100 mb-6">
                  Superposez des informations numériques sur votre environnement réel avec une précision millimétrique.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-blue-200">
                  <CheckCircle className="w-4 h-4" />
                  <span>Tracking 6DOF</span>
                </div>
              </CardContent>
            </Card>

            {/* AI Integration */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-8 text-center text-white">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Intelligence Artificielle</h3>
                <p className="text-purple-100 mb-6">
                  IA intégrée pour la reconnaissance d'objets, traduction en temps réel et assistance personnalisée.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-purple-200">
                  <CheckCircle className="w-4 h-4" />
                  <span>Machine Learning</span>
                </div>
              </CardContent>
            </Card>

            {/* Connectivity */}
            <Card className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 border-cyan-500/30 backdrop-blur-sm">
              <CardContent className="p-8 text-center text-white">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Connectivité 5G</h3>
                <p className="text-cyan-100 mb-6">
                  Connexion ultra-rapide pour streaming, navigation et communication sans latence.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-cyan-200">
                  <CheckCircle className="w-4 h-4" />
                  <span>5G Ready</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Official Partnership */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full mb-8">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Partenariat Officiel</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Revendeur Officiel{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Chameleo
              </span>{' '}
              en Europe
            </h2>

            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              MyTechGear est fier d'être le revendeur officiel des lunettes connectées Chameleo en Europe. Nous vous
              garantissons des produits authentiques, un support technique dédié et une garantie officielle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Produits Authentiques</h3>
                <p className="text-blue-200">100% officiels Chameleo</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Livraison Express</h3>
                <p className="text-blue-200">24-48h partout en Europe</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Support Premium</h3>
                <p className="text-blue-200">Service client dédié</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChameleoHero;
