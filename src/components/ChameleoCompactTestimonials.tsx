'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Award, ArrowRight, CheckCircle, Users, Heart } from 'lucide-react';
import Image from 'next/image';

const ChameleoCompactTestimonials = (): React.JSX.Element => {
  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Ingénieure Tech',
      company: 'Google France',
      content:
        'Les lunettes Chameleo ont révolutionné ma façon de travailler. La réalité augmentée est incroyablement fluide.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Alexandre M.',
      role: 'Designer UX',
      content: "La communauté Chamelo m'a permis de découvrir des usages incroyables que je n'aurais jamais imaginés !",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Sophie Chen',
      role: 'Architecte',
      content:
        "Les lentilles Eclipse™ s'adaptent parfaitement à mes besoins professionnels. Un investissement qui vaut le coup.",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Clients satisfaits', icon: <Users className="w-5 h-5" /> },
    { number: '98%', label: 'Satisfaction', icon: <Heart className="w-5 h-5" /> },
    { number: '4.9/5', label: 'Note moyenne', icon: <Star className="w-5 h-5" /> },
  ];

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="border-border text-foreground px-4 py-2 text-sm font-semibold mb-4">
            <Award className="w-4 h-4 mr-2" />
            Témoignages Clients
          </Badge>

          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Ce que disent nos clients</h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment les lunettes Chamelo transforment le quotidien de nos clients professionnels
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <div className="text-primary">{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Users className="mr-2 h-5 w-5" />
            Rejoindre la communauté
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChameleoCompactTestimonials;
