'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sun, Palette, Zap, Eye, CheckCircle, ArrowRight, Sparkles, Settings, Shield, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ChameleoCompactTechnologies = (): React.JSX.Element => {
  const [selectedTech, setSelectedTech] = useState(0);

  const technologies = [
    {
      name: 'Eclipse™',
      description: 'Lentilles réglables en teinte',
      icon: <Sun className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      features: ['Adaptation automatique', 'Contrôle manuel', 'Protection UV', 'Clarté optimale'],
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop&crop=center',
    },
    {
      name: 'Prismatic™',
      description: 'Lentilles changeant de couleur',
      icon: <Palette className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      features: ['Changement de couleur', 'Style personnalisé', 'Technologie avancée', 'Design unique'],
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop&crop=center',
    },
    {
      name: 'HVL/ALPHA',
      description: 'Technologies de lentilles premium',
      icon: <Eye className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      features: ['Transmittance optimale', 'Protection maximale', 'Polyvalence', 'Qualité japonaise'],
      image: 'https://images.unsplash.com/photo-1517649772228-475012789097?w=400&h=300&fit=crop&crop=center',
    },
  ];

  const handleTechSelect = (index: number): void => {
    setSelectedTech(index);
  };

  return (
    <div className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="border-border text-foreground px-4 py-2 text-sm font-semibold mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Technologies Chamelo
          </Badge>

          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Innovation technologique
            <br />
            <span className="text-muted-foreground">de nouvelle génération</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez les technologies révolutionnaires qui font des lunettes Chamelo les plus avancées au monde.
          </p>
        </div>

        {/* Technology Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <Button
                key={index}
                variant={selectedTech === index ? 'default' : 'outline'}
                onClick={() => handleTechSelect(index)}
                className="flex items-center space-x-2 px-4 py-2"
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    selectedTech === index ? 'bg-primary-foreground text-primary' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {tech.icon}
                </div>
                <span>{tech.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Technology */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Technology Image */}
          <div className="relative w-full h-64 bg-gradient-to-br from-sky-200 to-blue-300 rounded-2xl overflow-hidden">
            <Image
              src={technologies[selectedTech].image}
              alt={technologies[selectedTech].name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${technologies[selectedTech].color} rounded-xl flex items-center justify-center mb-2`}
              >
                <div className="text-white">{technologies[selectedTech].icon}</div>
              </div>
              <h3 className="text-xl font-bold text-white">{technologies[selectedTech].name}</h3>
              <p className="text-white/90 text-sm">{technologies[selectedTech].description}</p>
            </div>
          </div>

          {/* Technology Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{technologies[selectedTech].name}</h3>
              <p className="text-muted-foreground mb-6">{technologies[selectedTech].description}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {technologies[selectedTech].features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Sparkles className="mr-2 h-5 w-5" />
            Découvrir toutes les technologies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChameleoCompactTechnologies;
