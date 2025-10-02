import type { ReactNode } from 'react';

export default function PrismaticPage(): ReactNode {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Collection Prismatic</h1>
          <p className="mt-6 text-lg text-gray-600">
            L&apos;avenir de la réalité augmentée. Expérience immersive avec des fonctionnalités AR avancées pour le
            travail et les loisirs.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 p-8 text-white">
              <h2 className="text-2xl font-bold">Innovation & AR</h2>
              <p className="mt-4 text-white/80">
                Plongez dans le futur avec nos lunettes à réalité augmentée. Une technologie de pointe pour
                révolutionner votre façon de travailler et de vous divertir.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Réalité augmentée 4K
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Hologrammes interactifs
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Navigation 3D
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Reconnaissance d&apos;objets IA
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Technologie AR</h3>
                <p className="mt-2 text-gray-600">
                  Une expérience de réalité augmentée immersive avec des fonctionnalités avancées pour le travail
                  collaboratif et les loisirs.
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Applications Professionnelles</h3>
                <p className="mt-2 text-gray-600">
                  Idéales pour l&apos;architecture, la médecine, l&apos;éducation et bien d&apos;autres domaines
                  professionnels.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AR Features showcase */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Fonctionnalités AR Avancées</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Visualisation 3D',
                description: 'Projetez des modèles 3D dans votre espace de travail',
                icon: '🎯',
              },
              {
                title: 'Collaboration Virtuelle',
                description: 'Travaillez en équipe avec des hologrammes partagés',
                icon: '👥',
              },
              {
                title: 'Formation Interactive',
                description: 'Apprenez avec des simulations immersives',
                icon: '🎓',
              },
              {
                title: 'Design Architectural',
                description: 'Visualisez vos projets en temps réel',
                icon: '🏗️',
              },
              {
                title: 'Médecine Assistée',
                description: 'Diagnostics assistés par IA',
                icon: '🏥',
              },
              {
                title: 'Gaming Immersif',
                description: 'Jeux en réalité augmentée',
                icon: '🎮',
              },
            ].map((feature, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 shadow-sm text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product showcase */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nos Modèles Prismatic</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Prismatic Pro',
                description: 'Pour les professionnels exigeants',
                price: '1299€',
                features: ['Écran 4K', 'IA intégrée', 'Autonomie 6h'],
              },
              {
                name: 'Prismatic Studio',
                description: 'Pour les créateurs et designers',
                price: '999€',
                features: ['Design 3D', 'Collaboration', 'Export haute qualité'],
              },
              {
                name: 'Prismatic Explorer',
                description: 'Pour découvrir l&apos;AR',
                price: '699€',
                features: ['AR basique', 'Apps éducatives', 'Parfait débutant'],
              },
            ].map((product, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
                  Découvrir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
