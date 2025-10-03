import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { QueryProvider } from '@/components/providers/query-provider';
import { CartProvider } from '@/contexts/cart-context';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MyTechGear - Lunettes Connectées Haute Technologie',
  description:
    'Découvrez notre collection exclusive de lunettes connectées. Performance, élégance et innovation pour révolutionner votre quotidien.',
  keywords: 'lunettes connectées, réalité augmentée, technologie, sport, lifestyle',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-primary">
                      <Link href="/" className="hover:text-primary/80 transition-colors">
                        MyTechGear
                      </Link>
                    </h1>
                    <nav className="hidden md:flex space-x-6">
                      <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                        Accueil
                      </Link>
                      <Link href="/technologies" className="text-gray-700 hover:text-primary transition-colors">
                        Technologies
                      </Link>
                      <Link href="/products" className="text-gray-700 hover:text-primary transition-colors">
                        Produits
                      </Link>
                      <Link href="/sport" className="text-gray-700 hover:text-primary transition-colors">
                        Sport
                      </Link>
                      <Link href="/lifestyle" className="text-gray-700 hover:text-primary transition-colors">
                        Lifestyle
                      </Link>
                      <Link href="/prismatic" className="text-gray-700 hover:text-primary transition-colors">
                        Prismatic
                      </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-700 hover:text-primary transition-colors">🔍</button>
                      <button className="text-gray-700 hover:text-primary transition-colors">🛒</button>
                    </div>
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center text-gray-600">
                  <p>&copy; 2024 MyTechGear. Tous droits réservés.</p>
                </div>
              </footer>
            </div>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
