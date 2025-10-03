'use client';

import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { WordPressProductCardDetails } from '@/components/WordPressProductCardDetails';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetailPage(): React.JSX.Element {
  const params = useParams();
  const slug = params.slug as string;
  const { products, isLoading, error } = useWordPressProducts();
  const [product, setProduct] = useState<unknown>(null);

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((p) => p.slug === slug);
      setProduct(foundProduct);
    }
  }, [products, slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Erreur de chargement</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/products">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
          <p className="text-gray-600 mb-6">Le produit que vous recherchez n&apos;existe pas ou a été supprimé.</p>
          <div className="space-x-4">
            <Link href="/products">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux produits
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Retour à l&apos;accueil</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/products">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux produits
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Détails du produit</h1>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <WordPressProductCardDetails
        product={product}
        onAddToCart={(product, quantity, _variant) => {
          alert(`Ajouté au panier: ${product.name} (${quantity}x)`);
        }}
        onToggleWishlist={(product) => {
          alert(`Ajouté aux favoris: ${product.name}`);
        }}
        onShare={(product) => {
          if (navigator.share) {
            navigator.share({
              title: product.name,
              text: product.short_description,
              url: window.location.href,
            });
          } else {
            alert(`Partage: ${product.name}`);
          }
        }}
      />
    </div>
  );
}
