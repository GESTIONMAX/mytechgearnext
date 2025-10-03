'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Award,
  Shield,
  Globe,
  CheckCircle,
  Star,
  Truck,
  Headphones,
  Camera,
  Zap,
  Users,
  MapPin,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

const ChameleoPartnership = (): React.JSX.Element => {
  const certifications = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Certification CE',
      description: 'Conformité européenne',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'ISO 27001',
      description: 'Sécurité des données',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'GDPR Compliant',
      description: 'Protection des données',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const benefits = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Livraison Express',
      description: '24-48h partout en Europe',
      highlight: 'Gratuite',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Garantie Officielle',
      description: '2 ans Chameleo',
      highlight: 'Sans conditions',
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: 'Support Premium',
      description: 'Service client dédié',
      highlight: '24/7',
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: 'Formation Incluse',
      description: 'Prise en main personnalisée',
      highlight: 'Gratuite',
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Clients satisfaits' },
    { number: '98%', label: 'Taux de satisfaction' },
    { number: '24h', label: 'Support technique' },
    { number: '2 ans', label: 'Garantie officielle' },
  ];

  return (
    <div className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-border text-foreground px-6 py-2 text-sm font-semibold mb-6">
            <Award className="w-4 h-4 mr-2" />
            Partenariat Officiel Chameleo
          </Badge>

          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            MyTechGear
            <br />
            <span className="text-muted-foreground">Revendeur Officiel Europe</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Depuis 2020, MyTechGear est le partenaire officiel de Chameleo en Europe. Nous vous garantissons des
            produits authentiques, un support technique de niveau enterprise et une expérience client exceptionnelle.
          </p>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <div className="text-white">{cert.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{cert.title}</h3>
                <p className="text-blue-200">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="bg-gradient-to-r from-slate-800/50 to-blue-800/50 rounded-3xl p-8 backdrop-blur-sm border border-white/10 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Avantages{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                MyTechGear
              </span>
            </h3>
            <p className="text-blue-100">Pourquoi choisir MyTechGear comme revendeur officiel Chameleo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-blue-400">{benefit.icon}</div>
                </div>
                <h4 className="font-semibold text-white mb-2">{benefit.title}</h4>
                <p className="text-sm text-blue-200 mb-2">{benefit.description}</p>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                  {benefit.highlight}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-blue-200 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Prêt à découvrir les lunettes{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Chameleo
              </span>{' '}
              ?
            </h3>

            <p className="text-xl text-blue-100 mb-8">
              Rejoignez des milliers de professionnels qui ont déjà adopté la technologie Chameleo
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Découvrir la collection
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
              >
                <Users className="mr-2 h-5 w-5" />
                Demander une démo
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Produits authentiques</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Support officiel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Garantie 2 ans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChameleoPartnership;
