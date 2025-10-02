import { ArrowRight, CheckCircle, Clock, CreditCard, Eye, Shield, Trophy, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
  const categories = [
    {
      id: 'sport',
      name: 'SPORT',
      title: 'Performance & Endurance',
      description:
        'Lunettes connectées conçues pour les athlètes et les passionnés de sport. Monitoring en temps réel, résistance aux conditions extrêmes.',
      href: '/sport',
      icon: Trophy,
      gradient: 'from-red-500 to-orange-500',
      features: ['Résistant à l&apos;eau', 'GPS intégré', 'Monitoring cardiaque'],
    },
    {
      id: 'lifestyle',
      name: 'LIFESTYLE',
      title: 'Élégance & Confort',
      description:
        'Style et technologie se rencontrent. Parfaites pour la vie urbaine avec des fonctionnalités intelligentes discrètes.',
      href: '/lifestyle',
      icon: Eye,
      gradient: 'from-blue-500 to-purple-500',
      features: ['Design élégant', 'Assistant vocal', 'Reconnaissance faciale'],
    },
    {
      id: 'prismatic',
      name: 'PRISMATIC',
      title: 'Innovation & AR',
      description:
        'L&apos;avenir de la réalité augmentée. Expérience immersive avec des fonctionnalités AR avancées pour le travail et les loisirs.',
      href: '/prismatic',
      icon: Zap,
      gradient: 'from-green-500 to-teal-500',
      features: ['Réalité augmentée', 'Hologrammes', 'Navigation 3D'],
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Sécurité Avancée',
      description: 'Chiffrement de bout en bout pour protéger vos données personnelles.',
    },
    {
      icon: Clock,
      title: 'Autonomie Longue',
      description: 'Jusqu&apos;à 8 heures d&apos;utilisation continue avec recharge rapide.',
    },
    {
      icon: CreditCard,
      title: 'Paiement Sécurisé',
      description: 'Transactions protégées avec les dernières technologies de sécurité.',
    },
    {
      icon: CheckCircle,
      title: 'Garantie 2 Ans',
      description: 'Support technique et garantie constructeur pour votre tranquillité.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <Image
          src="/hero-smart-glasses.jpg"
          alt="Lunettes connectées haute technologie"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              L&apos;Avenir de la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Vision Connectée
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Découvrez notre collection exclusive de lunettes connectées haute technologie. Performance, élégance et
              innovation réunies pour révolutionner votre quotidien.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/products"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Découvrir la Collection
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-white">
                En savoir plus <ArrowRight className="ml-2 inline h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Explorez nos Collections</h2>
            <p className="mt-4 text-lg text-gray-600">
              Chaque collection est conçue pour répondre à vos besoins spécifiques
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} />
                <div className="relative z-10">
                  <div className="flex items-center space-x-3">
                    <category.icon className="h-8 w-8 text-white" />
                    <span className="text-sm font-semibold text-white/80">{category.name}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-white">{category.title}</h3>
                  <p className="mt-2 text-white/80">{category.description}</p>
                  <ul className="mt-4 space-y-1">
                    {category.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-white/70">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pourquoi Choisir MyTechGear ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Des fonctionnalités avancées pour une expérience exceptionnelle
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Prêt à Révolutionner votre Vision ?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Rejoignez des milliers d&apos;utilisateurs qui ont déjà adopté la technologie de demain
            </p>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
              >
                Commencer Maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
