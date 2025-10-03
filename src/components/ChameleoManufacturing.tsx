'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, CheckCircle, Award, Shield, ArrowRight, Sparkles, Eye, Zap, Star, Globe } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const ChameleoManufacturing = (): React.JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const manufacturingSteps = [
    {
      title: 'Conception CAD',
      description: 'Modélisation 3D précise avec logiciels japonais de pointe',
      icon: <Settings className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Sélection des matériaux',
      description: 'Choix rigoureux des matières premières premium',
      icon: <Shield className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Usinage de précision',
      description: 'Fabrication avec machines CNC japonaises ultra-précises',
      icon: <Zap className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&crop=center',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Traitement des verres',
      description: 'Application des technologies Eclipse™ et Prismatic™',
      icon: <Eye className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Contrôle qualité',
      description: 'Tests rigoureux selon standards japonais',
      icon: <CheckCircle className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  const certifications = [
    { name: 'ISO 9001', description: 'Qualité de fabrication' },
    { name: 'CE', description: 'Conformité européenne' },
    { name: 'FDA', description: 'Approbation médicale' },
    { name: 'JIS', description: 'Standards japonais' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % manufacturingSteps.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (step: number): void => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-border text-foreground px-6 py-2 text-sm font-semibold mb-6">
            <Award className="w-4 h-4 mr-2" />
            Processus de Fabrication Japonais
          </Badge>

          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Excellence japonaise
            <br />
            <span className="text-muted-foreground">au service de l'innovation</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Nos lunettes sont produites selon un processus de fabrication japonais de pointe, garantissant une qualité
            exceptionnelle et une durabilité maximale.
          </p>
        </div>

        {/* Interactive Manufacturing Process */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Process Visualization */}
            <div className="space-y-8">
              <div className="relative w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                {/* Current Step Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={manufacturingSteps[currentStep].image}
                    alt={manufacturingSteps[currentStep].title}
                    fill
                    className={`object-cover transition-all duration-500 ${isAnimating ? 'scale-105 opacity-80' : 'scale-100 opacity-100'}`}
                  />

                  {/* Overlay with step info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${manufacturingSteps[currentStep].color} rounded-2xl flex items-center justify-center mb-4`}
                    >
                      <div className="text-white">{manufacturingSteps[currentStep].icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{manufacturingSteps[currentStep].title}</h3>
                    <p className="text-white/90 text-sm">{manufacturingSteps[currentStep].description}</p>
                  </div>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex space-x-2">
                {manufacturingSteps.map((step, index) => (
                  <Button
                    key={index}
                    variant={currentStep === index ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStepClick(index)}
                    className="flex-1"
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>

            {/* Process Details */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground mb-6">Processus de fabrication en 5 étapes</h3>

              <div className="space-y-4">
                {manufacturingSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      currentStep === index ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleStepClick(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          currentStep === index ? `bg-gradient-to-br ${step.color}` : 'bg-muted'
                        }`}
                      >
                        <div className={currentStep === index ? 'text-white' : 'text-muted-foreground'}>
                          {step.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      {currentStep === index && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Certifications et Standards</h3>
            <p className="text-muted-foreground">Nos lunettes respectent les plus hauts standards internationaux</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dr. Jay Schwartz Endorsement */}
        <div className="bg-background rounded-3xl p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">Soutenu par le Dr Jay Schwartz</h3>
              <p className="text-lg text-muted-foreground mb-6">
                "Les lunettes Chamelo représentent une avancée majeure dans la protection oculaire. En tant
                qu'ophtalmologiste des Phoenix Suns, je recommande ces lunettes à tous mes patients."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Dr Jay Schwartz</h4>
                  <p className="text-sm text-muted-foreground">Ophtalmologiste des Phoenix Suns</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-12 h-12 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Endorsement Médical</h4>
                  <p className="text-muted-foreground">Recommandé par les professionnels</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Découvrez la qualité japonaise</h3>

            <p className="text-xl text-muted-foreground mb-8">
              Commandez vos lunettes Chamelo et expérimentez l'excellence japonaise
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

export default ChameleoManufacturing;
