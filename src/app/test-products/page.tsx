'use client';

import { ProductCard } from '@/components/ProductCard';
import { ProductVariantCard } from '@/components/ProductVariantCard';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Données de test
const testProduct = {
  id: '1',
  name: 'Test Product',
  slug: 'test-product',
  description: 'Un produit de test',
  short_description: 'Description courte',
  price: 19900, // 199€
  sale_price: 14900, // 149€
  in_stock: true,
  stock_quantity: 10,
  category: { name: 'SPORT' },
  images: [
    { image_url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop&crop=center' },
  ],
  features: ['Fonction 1', 'Fonction 2'],
  variants: [
    {
      id: 'v1',
      name: 'Test Product - Rouge',
      price: 19900,
      sale_price: 14900,
      in_stock: true,
      stock_quantity: 5,
      attributes: { color: 'Rouge', size: 'M' },
      images: [
        { image_url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop&crop=center' },
      ],
    },
    {
      id: 'v2',
      name: 'Test Product - Bleu',
      price: 19900,
      in_stock: true,
      stock_quantity: 8,
      attributes: { color: 'Bleu', size: 'L' },
      images: [
        { image_url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop&crop=center' },
      ],
    },
  ],
};

export default function TestProductsPage() {
  const [showVariants, setShowVariants] = useState(false);

  const handleAddToCart = (product: any, variant?: any) => {
    console.log('Ajouter au panier:', product.name, variant ? variant.name : '');
    alert(`Ajouté au panier: ${product.name}${variant ? ` - ${variant.name}` : ''}`);
  };

  const handleToggleWishlist = (product: any) => {
    console.log('Toggle wishlist:', product.name);
    alert(`Wishlist: ${product.name}`);
  };

  const handleQuickView = (product: any) => {
    console.log('Quick view:', product.name);
    alert(`Aperçu rapide: ${product.name}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Test des Cartes de Produits</h1>

      <div className="mb-8">
        <Button onClick={() => setShowVariants(!showVariants)} className="mb-4">
          {showVariants ? 'Masquer les variantes' : 'Afficher les variantes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Test ProductCard */}
        <div>
          <h2 className="text-xl font-semibold mb-4">ProductCard</h2>
          <ProductCard
            product={testProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleQuickView}
            showActions={true}
          />
        </div>

        {/* Test ProductVariantCard */}
        {showVariants &&
          testProduct.variants.map((variant) => (
            <div key={variant.id}>
              <h2 className="text-xl font-semibold mb-4">ProductVariantCard - {variant.attributes.color}</h2>
              <ProductVariantCard
                product={testProduct}
                variant={variant}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={handleQuickView}
                showActions={true}
              />
            </div>
          ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Instructions de test :</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Cliquez sur les cartes pour naviguer vers la page de détail</li>
          <li>Cliquez sur "Ajouter" pour tester l'ajout au panier</li>
          <li>Cliquez sur l'icône cœur pour tester la wishlist</li>
          <li>Cliquez sur l'icône œil pour tester l'aperçu rapide</li>
          <li>Les boutons d'action ne doivent pas déclencher la navigation</li>
        </ul>
      </div>
    </div>
  );
}
