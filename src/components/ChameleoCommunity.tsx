'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Heart,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Zap,
  Camera,
  Headphones,
  Shield,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ChameleoCommunity = (): React.JSX.Element => {
  const communityStats = [
    { number: '50,000+', label: 'Membres actifs', icon: <Users className="w-6 h-6" /> },
    { number: '98%', label: 'Satisfaction', icon: <Heart className="w-6 h-6" /> },
    { number: '4.9/5', label: 'Note moyenne', icon: <Star className="w-6 h-6" /> },
    { number: '24/7', label: 'Support communautaire', icon: <Award className="w-6 h-6" /> },
  ];

  const communityFeatures = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Communauté Mondiale',
      description: "Rejoignez des milliers d'utilisateurs Chamelo à travers le monde",
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation Continue',
      description: 'Participez au développement des nouvelles fonctionnalités',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Partage d'Expériences",
      description: 'Partagez vos créations et découvertes avec la communauté',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Support Communautaire',
      description: 'Entraide et conseils entre utilisateurs Chamelo',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const testimonials = [
    {
      name: 'Alexandre M.',
      role: 'Designer UX',
      content: "La communauté Chamelo m'a permis de découvrir des usages incroyables que je n'aurais jamais imaginés !",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Sarah L.',
      role: 'Photographe',
      content: "Grâce à la communauté, j'ai appris à exploiter pleinement les capacités de mes lunettes Chamelo.",
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Marc D.',
      role: 'Architecte',
      content: "L'entraide dans la communauté Chamelo est exceptionnelle. On apprend constamment des autres !",
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
    },
  ];

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-border text-foreground px-6 py-2 text-sm font-semibold mb-6">
            <Users className="w-4 h-4 mr-2" />
            Communauté Chamelo
          </Badge>

          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Ensemble
            <br />
            <span className="text-muted-foreground">Nous façonnons l'avenir</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            "Ensemble, nous sommes plus qu'une simple marque, nous sommes une communauté qui façonne l'avenir de la
            lunetterie."
          </p>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Rejoignez des milliers d'utilisateurs Chamelo qui transforment leur vision du monde grâce à nos lunettes
            connectées.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-pink-400">{stat.icon}</div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-blue-200 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Témoignages Communauté
              </span>
            </h3>
            <p className="text-xl text-blue-100">Ce que disent nos membres de la communauté Chamelo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-blue-100 mb-6 italic">"{testimonial.content}"</p>

                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-blue-200">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 rounded-3xl p-12 backdrop-blur-sm border border-white/10 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Prêt à rejoindre la{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                communauté Chamelo
              </span>{' '}
              ?
            </h3>

            <p className="text-xl text-blue-100 mb-8">
              Découvrez comment nos lunettes connectées transforment votre quotidien et rejoignez une communauté
              passionnée.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
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
                <Users className="mr-2 h-5 w-5" />
                Rejoindre la communauté
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Communauté active</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Support dédié</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Innovation continue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChameleoCommunity;
