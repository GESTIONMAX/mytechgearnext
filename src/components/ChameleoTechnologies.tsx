'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Eye,
  Palette,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Sun,
  Moon,
  Droplets,
  Camera,
  Smartphone,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ChameleoTechnologies = (): React.JSX.Element => {
  const technologies = [
    {
      name: 'Eclipse™',
      subtitle: 'Lentilles réglables en teinte',
      description:
        'Ajustez la teinte de vos lunettes en fonction de la luminosité ambiante. Technologie brevetée pour une adaptation automatique et manuelle.',
      icon: <Sun className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      features: ['Adaptation automatique', 'Contrôle manuel', 'Protection UV', 'Clarté optimale'],
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop&crop=center',
    },
    {
      name: 'Prismatic™',
      subtitle: 'Lentilles changeant de couleur',
      description:
        'Découvrez des lunettes qui changent de couleur selon votre humeur et votre style. Innovation unique au monde.',
      icon: <Palette className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      features: ['Changement de couleur', 'Style personnalisé', 'Technologie avancée', 'Design unique'],
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop&crop=center',
    },
  ];

  const useCases = [
    {
      title: 'Sport & Performance',
      description: 'Cyclisme, course, compétitions',
      icon: <Zap className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1517649772228-475012789097?w=300&h=200&fit=crop&crop=center',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Lifestyle & Urbain',
      description: 'Usage quotidien, mode, social',
      icon: <Smartphone className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=200&fit=crop&crop=center',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Professionnel',
      description: 'Architecture, médecine, tech',
      icon: <Camera className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=200&fit=crop&crop=center',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-border text-foreground px-6 py-2 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Technologies Brevetées Chamelo
          </Badge>

          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Chamelo
            <br />
            <span className="text-muted-foreground">Innovation Technologique</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Découvrez les technologies révolutionnaires qui font des lunettes Chamelo les plus avancées au monde.
            <span className="font-semibold text-foreground"> Innovation, performance et style réunis.</span>
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {technologies.map((tech, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-auto">
                  <Image src={tech.image} alt={tech.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Tech Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`bg-gradient-to-r ${tech.color} text-white border-0 px-3 py-1 text-xs font-semibold`}
                    >
                      {tech.name}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-8 text-white">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center mr-4`}
                    >
                      <div className="text-white">{tech.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{tech.name}</h3>
                      <p className="text-blue-200 text-sm">{tech.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-blue-100 mb-6 leading-relaxed">{tech.description}</p>

                  <div className="space-y-2 mb-6">
                    {tech.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-sm text-blue-200">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Scénarios d'usage
              </span>
            </h3>
            <p className="text-xl text-blue-100">
              Découvrez comment les lunettes Chamelo s'adaptent à votre style de vie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${useCase.color} rounded-lg flex items-center justify-center mb-2`}
                    >
                      <div className="text-white">{useCase.icon}</div>
                    </div>
                    <h4 className="text-white font-bold text-lg">{useCase.title}</h4>
                    <p className="text-blue-200 text-sm">{useCase.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Message */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-12 backdrop-blur-sm border border-white/10 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              "Ensemble, nous sommes plus qu'une simple marque, nous sommes une communauté qui façonne l'avenir de la
              lunetterie."
            </h3>

            <p className="text-xl text-blue-100 mb-8">
              Rejoignez la révolution Chamelo et découvrez comment nos lunettes connectées transforment votre vision du
              monde.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Découvrir Chamelo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
              >
                <Eye className="mr-2 h-5 w-5" />
                Voir la démo
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Technologies brevetées</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Innovation constante</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Communauté active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChameleoTechnologies;
