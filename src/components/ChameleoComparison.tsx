'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, Star, Award, Shield, ArrowRight, Sparkles, Eye, Zap, Crown, Trophy } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ChameleoComparison = (): React.JSX.Element => {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    { name: 'Verres réglables', description: 'Technologie Eclipse™' },
    { name: 'Protection UV', description: 'Protection maximale' },
    { name: 'Lentilles polarisées', description: 'Réduction des reflets' },
    { name: 'Garantie à vie', description: 'Engagement qualité' },
    { name: 'Design premium', description: 'Esthétique haut de gamme' },
    { name: 'Technologie japonaise', description: 'Fabrication de pointe' },
  ];

  const brands = [
    {
      name: 'CHAMELO',
      logo: '👑',
      color: 'from-primary to-secondary',
      features: [true, true, true, true, true, true],
      price: '199€',
      rating: 5,
      description: 'Innovation révolutionnaire',
    },
    {
      name: 'AUTRES MARQUES',
      logo: '🏷️',
      color: 'from-gray-400 to-gray-600',
      features: [false, true, true, false, false, false],
      price: '99€',
      rating: 3,
      description: 'Qualité standard',
    },
    {
      name: 'MARQUES DE LUXE',
      logo: '💎',
      color: 'from-yellow-400 to-orange-500',
      features: [false, true, true, true, true, false],
      price: '599€',
      rating: 4,
      description: 'Prix élevé, fonctionnalités limitées',
    },
  ];

  const handleFeatureSelect = (index: number): void => {
    setSelectedFeature(index);
  };

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-border text-foreground px-6 py-2 text-sm font-semibold mb-6">
            <Trophy className="w-4 h-4 mr-2" />
            Comparaison Interactive
          </Badge>

          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Voir au-delà de l'ordinaire
            <br />
            <span className="text-muted-foreground">Chamelo vs la concurrence</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Découvrez pourquoi Chamelo surpasse toutes les autres marques en termes d'innovation et de qualité
          </p>
        </div>

        {/* Interactive Comparison Table */}
        <div className="mb-16">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header Row */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-muted-foreground">Fonctionnalités</h3>
                </div>
                {brands.map((brand, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${brand.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}
                    >
                      <span className="text-2xl">{brand.logo}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{brand.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{brand.description}</p>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < brand.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-lg font-bold text-primary">{brand.price}</p>
                  </div>
                ))}
              </div>

              {/* Feature Rows */}
              <div className="space-y-4">
                {features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className={`grid grid-cols-4 gap-4 p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      selectedFeature === featureIndex
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleFeatureSelect(featureIndex)}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          selectedFeature === featureIndex
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{feature.name}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>

                    {brands.map((brand, brandIndex) => (
                      <div key={brandIndex} className="flex items-center justify-center">
                        {brand.features[featureIndex] ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            {brandIndex === 0 && (
                              <Badge className="bg-green-500 text-white text-xs">
                                <Crown className="w-3 h-3 mr-1" />
                                EXCLUSIF
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <X className="w-6 h-6 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Spotlight */}
        <div className="mb-16">
          <div className="bg-muted/50 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Fonctionnalité mise en avant : {features[selectedFeature].name}
              </h3>
              <p className="text-lg text-muted-foreground">{features[selectedFeature].description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brands.map((brand, index) => (
                <Card key={index} className={`${index === 0 ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${brand.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <span className="text-xl">{brand.logo}</span>
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{brand.name}</h4>
                    <div className="flex items-center justify-center space-x-1 mb-3">
                      {brand.features[selectedFeature] ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-green-500 font-semibold">Disponible</span>
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5 text-red-500" />
                          <span className="text-red-500 font-semibold">Non disponible</span>
                        </>
                      )}
                    </div>
                    {index === 0 && brand.features[selectedFeature] && (
                      <Badge className="bg-green-500 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Technologie exclusive
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Chamelo */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Pourquoi choisir Chamelo ?</h3>
            <p className="text-lg text-muted-foreground">Découvrez les avantages uniques de nos lunettes connectées</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Crown className="w-8 h-8" />,
                title: 'Technologie exclusive',
                description: 'Eclipse™ et Prismatic™ disponibles uniquement chez Chamelo',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Qualité japonaise',
                description: 'Fabrication selon les plus hauts standards internationaux',
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Rapport qualité-prix',
                description: 'Fonctionnalités premium à un prix accessible',
              },
            ].map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <div className="text-primary">{advantage.icon}</div>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-4">{advantage.title}</h4>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Rejoignez la révolution Chamelo</h3>

            <p className="text-xl text-muted-foreground mb-8">
              Découvrez pourquoi des milliers de clients ont choisi Chamelo
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Sparkles className="mr-2 h-5 w-5" />
                Commander maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted">
                <Eye className="mr-2 h-5 w-5" />
                Voir la démo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChameleoComparison;
