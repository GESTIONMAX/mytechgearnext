'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Quote, Users, Award, Shield, CheckCircle, Globe, Zap, Camera, Headphones } from 'lucide-react';
import Image from 'next/image';

const ChameleoTestimonials = (): React.JSX.Element => {
  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Ingénieure Tech',
      company: 'Google France',
      content:
        'Les lunettes Chameleo ont révolutionné ma façon de travailler. La réalité augmentée est incroyablement fluide et précise.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Thomas Martin',
      role: 'Architecte',
      company: 'Foster + Partners',
      content:
        "Pour mes projets d'architecture, Chameleo me permet de visualiser mes maquettes 3D en temps réel. C'est révolutionnaire !",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Sophie Chen',
      role: 'Médecin',
      company: 'Hôpital Pitié-Salpêtrière',
      content:
        "En chirurgie, la précision des lunettes Chameleo est exceptionnelle. Elles m'aident à visualiser les données patient en temps réel.",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Connexion 5G',
      description: 'Ultra-rapide et fiable',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Batterie 12h',
      description: 'Autonomie exceptionnelle',
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: 'Caméra 4K',
      description: 'Qualité professionnelle',
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: 'Audio Spatial',
      description: 'Son immersif 3D',
    },
  ];

  return (
    <div className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-border text-foreground px-6 py-2 text-sm font-semibold mb-6">
            <Award className="w-4 h-4 mr-2" />
            Témoignages Clients
          </Badge>

          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Ce que disent nos clients Chameleo</h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment les lunettes Chameleo transforment le quotidien de nos clients professionnels
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-blue-400" />
                </div>

                <p className="text-blue-100 mb-6 italic">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-blue-200">{testimonial.role}</p>
                    <p className="text-xs text-blue-300">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Showcase */}
        <div className="bg-gradient-to-r from-slate-800/50 to-blue-800/50 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Technologies{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Chameleo
              </span>
            </h3>
            <p className="text-blue-100">Les innovations qui font la différence</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-blue-400">{feature.icon}</div>
                </div>
                <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-blue-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl px-8 py-6 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-400" />
              <div className="text-left">
                <p className="font-semibold text-white">Garantie Officielle</p>
                <p className="text-sm text-blue-200">2 ans Chameleo</p>
              </div>
            </div>

            <div className="w-px h-12 bg-white/20" />

            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div className="text-left">
                <p className="font-semibold text-white">50,000+ Clients</p>
                <p className="text-sm text-blue-200">En Europe</p>
              </div>
            </div>

            <div className="w-px h-12 bg-white/20" />

            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-purple-400" />
              <div className="text-left">
                <p className="font-semibold text-white">Support Premium</p>
                <p className="text-sm text-blue-200">24/7 dédié</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Rejoignez nos clients satisfaits
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChameleoTestimonials;
