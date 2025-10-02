import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { QueryProvider } from '@/components/providers/query-provider';
import { CartProvider } from '@/contexts/cart-context';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
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
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
