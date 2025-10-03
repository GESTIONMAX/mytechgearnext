'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Globe, Sparkles, ArrowRight, Star, Truck, Shield, CheckCircle, Zap, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ChameleoCompactHero = (): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-transparent to-muted/10" />

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
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-foreground">
                  Chameleo
                  <br />
                  <span className="text-muted-foreground">Lunettes Connectées</span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Découvrez les lunettes connectées Chameleo, la révolution technologique qui transforme votre vision du
                  monde.
                  <span className="font-semibold text-foreground"> Innovation, performance et style réunis.</span>
                </p>
              </div>

              {/* Key Features - Compact */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Eclipse™</div>
                    <div className="text-sm text-muted-foreground">Lentilles réglables</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Prismatic™</div>
                    <div className="text-sm text-muted-foreground">Changement de couleur</div>
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

                <Link href="/technologies">
                  <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted">
                    <Zap className="mr-2 h-5 w-5" />
                    Technologies
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators - Compact */}
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

            {/* 3D Product Showcase - Compact */}
            <div className="relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=400&fit=crop&crop=center"
                  alt="Chameleo Glasses"
                  fill
                  className="object-cover"
                />

                {/* Floating UI Elements */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Innovation 2024
                  </Badge>
                </div>

                <div className="absolute bottom-4 right-4">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-semibold text-foreground">En stock</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChameleoCompactHero;
