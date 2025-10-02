import type { ReactNode } from 'react';

export default function LifestylePage(): ReactNode {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Collection Lifestyle</h1>
          <p className="mt-6 text-lg text-gray-600">
            Style et technologie se rencontrent. Parfaites pour la vie urbaine avec des fonctionnalités intelligentes
            discrètes.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 p-8 text-white">
              <h2 className="text-2xl font-bold">Élégance & Confort</h2>
              <p className="mt-4 text-white/80">
                Conçues pour s&apos;intégrer parfaitement dans votre quotidien urbain tout en offrant des
                fonctionnalités technologiques avancées.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Design élégant et discret
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Assistant vocal intégré
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Reconnaissance faciale
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Connexion Bluetooth 5.0
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Fonctionnalités Lifestyle</h3>
                <p className="mt-2 text-gray-600">
                  Restez connecté en toute discrétion avec des fonctionnalités conçues pour la vie moderne.
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Design & Confort</h3>
                <p className="mt-2 text-gray-600">
                  Un design soigné qui s&apos;adapte à tous les styles, du bureau aux sorties en ville.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product showcase */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nos Modèles Lifestyle</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Urban Pro',
                description: 'Parfait pour le quotidien urbain',
                price: '299€',
                features: ['Assistant vocal', 'Reconnaissance faciale', 'Autonomie 8h'],
              },
              {
                name: 'Executive Elite',
                description: 'Pour les professionnels exigeants',
                price: '399€',
                features: ['Écran HD', 'Traduction temps réel', 'Gestion agenda'],
              },
              {
                name: 'Style Classic',
                description: 'Élégance intemporelle',
                price: '249€',
                features: ['Design minimaliste', 'Confort optimal', 'Qualité audio'],
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
