'use client';

import { ProductCardDetails } from '@/components/ProductCardDetails';
import { useProductBySlug, useSimilarProducts } from '@/hooks/useSupabaseProducts';
import { ProductGrid } from '@/components/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { ProductWithDetails, ProductVariantWithDetails } from '@/types';

export default function ProductDetailPage(): React.JSX.Element {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: product, isLoading, error } = useProductBySlug(slug);
  const { data: similarProducts } = useSimilarProducts(product?.id || '', product?.category_id || '', 4);

  const handleAddToCart = (
    _product: ProductWithDetails,
    _quantity: number,
    _variant?: ProductVariantWithDetails,
  ): void => {
    // TODO: Implement add to cart functionality
  };

  const handleToggleWishlist = (_product: ProductWithDetails): void => {
    // TODO: Implement wishlist functionality
  };

  const handleShare = (product: ProductWithDetails): void => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.short_description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Breadcrumbs Skeleton */}
        <div className="bg-gray-50 py-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-12 w-48" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900 flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Accueil
              </Link>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
            <p className="text-gray-600 mb-8">Le produit que vous recherchez n&apos;existe pas ou a été supprimé.</p>
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Accueil
            </Link>
            <span className="mx-2">&gt;</span>
            <Link href="/products" className="hover:text-gray-900">
              Produits
            </Link>
            <span className="mx-2">&gt;</span>
            {product.category && (
              <>
                <Link href={`/products?category=${product.category.slug}`} className="hover:text-gray-900">
                  {product.category.name}
                </Link>
                <span className="mx-2">&gt;</span>
              </>
            )}
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <ProductCardDetails
        product={product}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onShare={handleShare}
      />

      {/* Similar Products */}
      {similarProducts && similarProducts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Produits similaires</h2>
              <p className="text-gray-600">Découvrez d&apos;autres produits qui pourraient vous intéresser</p>
            </div>
            <ProductGrid
              products={similarProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              columns={4}
            />
          </div>
        </div>
      )}
    </div>
  );
}
