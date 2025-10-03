'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = (): React.ReactNode => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MT</span>
              </div>
              <span className="font-merriweather font-bold text-xl text-primary">MyTechGear</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Votre destination tech pour les dernières innovations. Qualité, performance et service client au
              rendez-vous.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sport" className="text-muted-foreground hover:text-primary transition-colors">
                  Collection Sport
                </Link>
              </li>
              <li>
                <Link href="/lifestyle" className="text-muted-foreground hover:text-primary transition-colors">
                  Collection Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/prismatic" className="text-muted-foreground hover:text-primary transition-colors">
                  Collection Prismatic
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Service Client</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Retours
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">contact@mytechgear.fr</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Paris, France</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Newsletter</h4>
              <div className="flex space-x-2">
                <Input placeholder="Votre email" className="text-sm" />
                <Button size="sm">S&apos;abonner</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">© 2024 MyTechGear. Tous droits réservés.</p>
            <div className="flex space-x-4">
              <Link href="/legal" className="text-sm text-muted-foreground hover:text-primary">
                Mentions légales
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                CGV
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Paiement sécurisé</span>
            <div className="flex space-x-1">
              <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                V
              </div>
              <div className="w-6 h-4 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                M
              </div>
              <div className="w-6 h-4 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
