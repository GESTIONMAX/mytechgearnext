import type { ReactNode } from 'react';

export default function SportPage(): ReactNode {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Collection Sport</h1>
          <p className="mt-6 text-lg text-gray-600">
            Lunettes connectées conçues pour les athlètes et les passionnés de sport. Performance, endurance et
            technologie de pointe.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 p-8 text-white">
              <h2 className="text-2xl font-bold">Performance & Endurance</h2>
              <p className="mt-4 text-white/80">
                Conçues pour résister aux conditions les plus extrêmes tout en offrant des fonctionnalités de monitoring
                avancées.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Résistant à l&apos;eau (IP67)
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  GPS intégré haute précision
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Monitoring cardiaque en temps réel
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Reconnaissance vocale avancée
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Fonctionnalités Sport</h3>
                <p className="mt-2 text-gray-600">
                  Suivez vos performances avec des métriques précises et des analyses détaillées de vos entraînements.
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Résistance & Durabilité</h3>
                <p className="mt-2 text-gray-600">
                  Conçues pour durer, même dans les conditions les plus difficiles. Garantie 2 ans incluse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
