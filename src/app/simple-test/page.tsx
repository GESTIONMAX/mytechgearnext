'use client';

import { ProductCard } from '@/components/ProductCard';
import { useState } from 'react';

// Données de test simples
const testProduct = {
  id: '1',
  name: 'Lunettes Sport Pro',
  slug: 'lunettes-sport-pro',
  description: 'Lunettes connectées pour le sport',
  short_description: 'Performance et style',
  price: 29900, // 299€
  sale_price: 24900, // 249€
  in_stock: true,
  stock_quantity: 15,
  category: { name: 'SPORT' },
  images: [
    { image_url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop&crop=center' },
  ],
  features: ['GPS', 'Cardio', "Résistant à l'eau"],
  variants: [],
};

export default function SimpleTestPage() {
  const [message, setMessage] = useState('');

  const handleAddToCart = (product: any) => {
    setMessage(`✅ Ajouté au panier: ${product.name}`);
    console.log('Ajouter au panier:', product);
  };

  const handleToggleWishlist = (product: any) => {
    setMessage(`❤️ Wishlist: ${product.name}`);
    console.log('Toggle wishlist:', product);
  };

  const handleQuickView = (product: any) => {
    setMessage(`👁️ Aperçu: ${product.name}`);
    console.log('Quick view:', product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Test Simple - Cartes de Produits</h1>

      {message && <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          product={testProduct}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={handleQuickView}
          showActions={true}
        />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Test des fonctionnalités :</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Cliquez sur la carte</strong> → Doit naviguer vers /product/lunettes-sport-pro
          </li>
          <li>
            <strong>Cliquez sur "Ajouter"</strong> → Doit afficher un message de confirmation
          </li>
          <li>
            <strong>Cliquez sur le cœur</strong> → Doit afficher un message wishlist
          </li>
          <li>
            <strong>Cliquez sur l'œil</strong> → Doit afficher un message aperçu
          </li>
        </ul>
      </div>
    </div>
  );
}
