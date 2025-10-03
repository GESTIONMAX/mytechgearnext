'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Shield, Truck, CheckCircle, ArrowRight, Star, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

const ChameleoCompactPartnership = (): React.JSX.Element => {
  const benefits = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Livraison Express',
      description: '24-48h partout en Europe',
      highlight: 'Gratuite',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Garantie 2 ans',
      description: 'Support technique inclus',
      highlight: 'Officielle',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Produits authentiques',
      description: 'Revendeur officiel certifié',
      highlight: 'Certifié',
    },
  ];

  const certifications = [
    { name: 'CE', description: 'Conformité européenne' },
    { name: 'FDA', description: 'Approbation médicale' },
    { name: 'JIS', description: 'Standards japonais' },
  ];

  return (
    <div className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="border-border text-foreground px-4 py-2 text-sm font-semibold mb-4">
            <Award className="w-4 h-4 mr-2" />
            Partenariat Officiel Chameleo
          </Badge>

          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            MyTechGear
            <br />
            <span className="text-muted-foreground">Revendeur Officiel Europe</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Depuis 2020, MyTechGear est le partenaire officiel de Chameleo en Europe. Nous vous garantissons des
            produits authentiques et un support technique de niveau enterprise.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">{benefit.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{benefit.description}</p>
                <Badge className="bg-primary text-primary-foreground text-xs">{benefit.highlight}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2 bg-card p-3 rounded-lg border border-border">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-foreground">{cert.name}</span>
                <span className="text-sm text-muted-foreground">- {cert.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Prêt à découvrir les lunettes Chamelo ?</h3>

            <p className="text-muted-foreground mb-6">
              Rejoignez des milliers de professionnels qui ont déjà adopté la technologie Chamelo
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Découvrir la collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted">
                Demander une démo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChameleoCompactPartnership;
