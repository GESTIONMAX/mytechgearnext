'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sun,
  Moon,
  Zap,
  Eye,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Settings,
  Shield,
  Star,
  Clock,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ChameleoLensTechnologies = (): React.JSX.Element => {
  const [selectedLens, setSelectedLens] = useState(0);

  const lensTechnologies = [
    {
      name: 'HVL',
      fullName: 'High Visual Light',
      description: "La plage de transmittance la plus élevée de l'industrie",
      transmission: '63% à 17%',
      range: 'Gamme de teintes la plus large du marché',
      icon: <Sun className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      features: ['Transmittance de 63% à 17%', 'Polyvalence maximale', 'Adaptation transparente', 'Clarté optimale'],
      useCases: ['Conditions variables', 'Usage quotidien', 'Transitions douces', 'Confort prolongé'],
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop&crop=center',
      status: 'Disponible',
    },
    {
      name: 'ALPHA',
      fullName: 'Advanced Light Protection',
      description: 'La gamme de teintes la plus foncée à ce jour',
      transmission: '38% à 4%',
      range: "Protection maximale contre l'éblouissement",
      icon: <Moon className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-500',
      features: [
        'Transmittance de 38% à 4%',
        'Protection maximale',
        "Réduction d'éblouissement",
        'Vision nette et protégée',
      ],
      useCases: ['Soleil intense', 'Sports outdoor', 'Conduite au coucher', 'Conditions extrêmes'],
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop&crop=center',
      status: 'Disponible',
    },
    {
      name: 'XPANSE',
      fullName: 'Extended Performance',
      description: 'Technologie révolutionnaire en développement',
      transmission: '63% à 6%',
      range: 'Combinaison HVL + ALPHA',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      features: ['Transmittance de 63% à 6%', 'Technologie hybride', 'Protection + Polyvalence', 'Innovation 2025'],
      useCases: ['Toutes conditions', 'Performance maximale', 'Technologie future', 'Excellence absolue'],
      image: 'https://images.unsplash.com/photo-1517649772228-475012789097?w=400&h=300&fit=crop&crop=center',
      status: 'Prochainement 2025',
    },
  ];

  const handleLensSelect = (index: number): void => {
    setSelectedLens(index);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-500';
      case 'Prochainement 2025':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-border text-foreground px-6 py-2 text-sm font-semibold mb-6">
            <Eye className="w-4 h-4 mr-2" />
            Technologies de Lentilles Chamelo
          </Badge>

          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Innovation optique
            <br />
            <span className="text-muted-foreground">de nouvelle génération</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Découvrez nos trois technologies de lentilles révolutionnaires, chacune optimisée pour des usages
            spécifiques et offrant des performances inégalées dans l'industrie.
          </p>
        </div>

        {/* Lens Selection */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {lensTechnologies.map((lens, index) => (
              <Button
                key={index}
                variant={selectedLens === index ? 'default' : 'outline'}
                onClick={() => handleLensSelect(index)}
                className="flex items-center space-x-3 px-6 py-3"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedLens === index ? 'bg-primary-foreground text-primary' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {lens.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{lens.name}</div>
                  <div className="text-xs opacity-75">{lens.status}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Lens Details */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Lens Visualization */}
            <div className="space-y-8">
              <div className="relative w-full h-80 bg-gradient-to-br from-sky-200 to-blue-300 rounded-2xl overflow-hidden">
                <Image
                  src={lensTechnologies[selectedLens].image}
                  alt={lensTechnologies[selectedLens].name}
                  fill
                  className="object-cover"
                />

                {/* Lens Overlay with Transmission Simulation */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`${getStatusColor(lensTechnologies[selectedLens].status)} text-white`}>
                    {lensTechnologies[selectedLens].status}
                  </Badge>
                </div>

                {/* Lens Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${lensTechnologies[selectedLens].color} rounded-2xl flex items-center justify-center mb-4`}
                  >
                    <div className="text-white">{lensTechnologies[selectedLens].icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{lensTechnologies[selectedLens].name}</h3>
                  <p className="text-white/90 text-sm mb-2">{lensTechnologies[selectedLens].description}</p>
                  <div className="flex items-center space-x-4 text-white/80 text-sm">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{lensTechnologies[selectedLens].transmission}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lens Specifications */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4">{lensTechnologies[selectedLens].fullName}</h3>
                <p className="text-lg text-muted-foreground mb-6">{lensTechnologies[selectedLens].description}</p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {lensTechnologies[selectedLens].transmission}
                      </div>
                      <div className="text-sm text-muted-foreground">Transmittance</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{lensTechnologies[selectedLens].name}</div>
                      <div className="text-sm text-muted-foreground">Technologie</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-xl font-bold text-foreground mb-4">Caractéristiques techniques</h4>
                <div className="space-y-3">
                  {lensTechnologies[selectedLens].features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h4 className="text-xl font-bold text-foreground mb-4">Cas d'usage optimaux</h4>
                <div className="flex flex-wrap gap-2">
                  {lensTechnologies[selectedLens].useCases.map((useCase, index) => (
                    <Badge key={index} variant="outline" className="border-border text-foreground">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Comparaison des technologies</h3>
            <p className="text-muted-foreground">Choisissez la technologie qui correspond à vos besoins</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">Technologie</th>
                  <th className="text-center p-4 font-semibold text-foreground">Transmittance</th>
                  <th className="text-center p-4 font-semibold text-foreground">Usage optimal</th>
                  <th className="text-center p-4 font-semibold text-foreground">Disponibilité</th>
                </tr>
              </thead>
              <tbody>
                {lensTechnologies.map((lens, index) => (
                  <tr
                    key={index}
                    className={`border-b border-border hover:bg-muted/50 cursor-pointer ${
                      selectedLens === index ? 'bg-primary/5' : ''
                    }`}
                    onClick={() => handleLensSelect(index)}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${lens.color} rounded-lg flex items-center justify-center`}
                        >
                          <div className="text-white">{lens.icon}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{lens.name}</div>
                          <div className="text-sm text-muted-foreground">{lens.fullName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <div className="font-semibold text-primary">{lens.transmission}</div>
                      <div className="text-sm text-muted-foreground">{lens.range}</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-sm text-muted-foreground">{lens.useCases.slice(0, 2).join(', ')}</div>
                    </td>
                    <td className="text-center p-4">
                      <Badge className={`${getStatusColor(lens.status)} text-white`}>{lens.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Découvrez la technologie qui vous correspond
            </h3>

            <p className="text-xl text-muted-foreground mb-8">
              Commandez vos lunettes Chamelo avec la technologie de lentilles adaptée à votre style de vie
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

export default ChameleoLensTechnologies;
