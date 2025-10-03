'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Zap, Palette, CheckCircle, ArrowRight, Sparkles, Eye, Settings, Sliders } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const ChameleoInteractiveLenses = (): React.JSX.Element => {
  const [eclipseTint, setEclipseTint] = useState(0); // 0 = CLAIR, 1 = ACTIF, 2 = FONCÉ
  const [prismaticColor, setPrismaticColor] = useState(0); // 0 = Bleu, 1 = Rose, 2 = Violet
  const [isAnimating, setIsAnimating] = useState(false);

  const eclipseLevels = [
    { name: 'CLAIR', opacity: 0.1, description: 'Transparence maximale' },
    { name: 'ACTIF', opacity: 0.5, description: 'Protection optimale' },
    { name: 'FONCÉ', opacity: 0.9, description: 'Protection maximale' },
  ];

  const prismaticColors = [
    { name: 'Bleu', color: 'from-blue-400 to-blue-600', description: 'Calme et concentration' },
    { name: 'Rose', color: 'from-pink-400 to-pink-600', description: 'Énergie et créativité' },
    { name: 'Violet', color: 'from-purple-400 to-purple-600', description: 'Luxe et sophistication' },
  ];

  const handleEclipseChange = (level: number): void => {
    setIsAnimating(true);
    setEclipseTint(level);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrismaticChange = (color: number): void => {
    setIsAnimating(true);
    setPrismaticColor(color);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-border text-foreground px-6 py-2 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Technologies Interactives Chamelo
          </Badge>

          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Découvrez les technologies
            <br />
            <span className="text-muted-foreground">en temps réel</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Testez les fonctionnalités révolutionnaires des lunettes Chamelo directement sur cette page
          </p>
        </div>

        {/* Eclipse™ Interactive Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Demo */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-foreground mb-4">Eclipse™ Lentilles réglables</h3>
                <p className="text-muted-foreground mb-8">
                  Ajustez la teinte de vos lunettes selon la luminosité ambiante
                </p>
              </div>

              {/* Interactive Lens Demo */}
              <div className="relative w-full h-64 bg-gradient-to-br from-sky-200 to-blue-300 rounded-2xl overflow-hidden">
                {/* Background Scene */}
                <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-blue-600 opacity-30" />
                <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
                <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full opacity-80" />

                {/* Lens Overlay */}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-500 ${isAnimating ? 'animate-pulse' : ''}`}
                  style={{ opacity: eclipseLevels[eclipseTint].opacity }}
                />

                {/* Lens Frame */}
                <div className="absolute inset-4 border-4 border-gray-800 rounded-lg" />

                {/* Interactive Controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2">
                    {eclipseLevels.map((level, index) => (
                      <Button
                        key={index}
                        variant={eclipseTint === index ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleEclipseChange(index)}
                        className="flex-1"
                      >
                        {level.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Level Info */}
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Sun className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Niveau {eclipseLevels[eclipseTint].name}</h4>
                      <p className="text-sm text-muted-foreground">{eclipseLevels[eclipseTint].description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-foreground mb-6">Fonctionnalités Eclipse™</h4>

              <div className="space-y-4">
                {[
                  {
                    icon: <Zap className="w-5 h-5" />,
                    title: 'Adaptation automatique',
                    desc: 'Réagit à la luminosité ambiante',
                  },
                  {
                    icon: <Settings className="w-5 h-5" />,
                    title: 'Contrôle manuel',
                    desc: 'Ajustement précis selon vos besoins',
                  },
                  {
                    icon: <Sun className="w-5 h-5" />,
                    title: 'Protection UV',
                    desc: 'Protection maximale contre les rayons',
                  },
                  {
                    icon: <Eye className="w-5 h-5" />,
                    title: 'Clarté optimale',
                    desc: 'Vision parfaite dans toutes les conditions',
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-primary">{feature.icon}</div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">{feature.title}</h5>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Prismatic™ Interactive Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Features List */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-foreground mb-6">Fonctionnalités Prismatic™</h4>

              <div className="space-y-4">
                {[
                  {
                    icon: <Palette className="w-5 h-5" />,
                    title: 'Changement de couleur',
                    desc: 'Adaptez vos lunettes à votre humeur',
                  },
                  {
                    icon: <Sparkles className="w-5 h-5" />,
                    title: 'Style personnalisé',
                    desc: 'Exprimez votre personnalité',
                  },
                  {
                    icon: <Zap className="w-5 h-5" />,
                    title: 'Technologie avancée',
                    desc: 'Innovation unique au monde',
                  },
                  { icon: <Eye className="w-5 h-5" />, title: 'Design unique', desc: 'Esthétique révolutionnaire' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-primary">{feature.icon}</div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">{feature.title}</h5>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-foreground mb-4">Prismatic™ Changement de couleur</h3>
                <p className="text-muted-foreground mb-8">Changez la couleur de vos lunettes selon votre humeur</p>
              </div>

              {/* Interactive Color Demo */}
              <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                {/* Lens with Color Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${prismaticColors[prismaticColor].color} transition-all duration-500 ${isAnimating ? 'animate-pulse' : ''}`}
                  style={{ opacity: 0.7 }}
                />

                {/* Lens Frame */}
                <div className="absolute inset-4 border-4 border-gray-800 rounded-lg" />

                {/* Color Controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2">
                    {prismaticColors.map((color, index) => (
                      <Button
                        key={index}
                        variant={prismaticColor === index ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePrismaticChange(index)}
                        className="flex-1"
                      >
                        {color.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Color Info */}
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${prismaticColors[prismaticColor].color} rounded-lg flex items-center justify-center`}
                    >
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Couleur {prismaticColors[prismaticColor].name}</h4>
                      <p className="text-sm text-muted-foreground">{prismaticColors[prismaticColor].description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Prêt à découvrir ces technologies en vrai ?
            </h3>

            <p className="text-xl text-muted-foreground mb-8">
              Commandez vos lunettes Chamelo et expérimentez ces innovations révolutionnaires
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

export default ChameleoInteractiveLenses;
