'use client';

import { ProductCard } from '@/components/ProductCard';
import { ProductVariantCard } from '@/components/ProductVariantCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProductWithDetails, ProductVariantWithDetails } from '@/types';

interface ProductGridProps {
  products: ProductWithDetails[];
  isLoading?: boolean;
  onAddToCart?: (product: ProductWithDetails, variant?: ProductVariantWithDetails) => void;
  onToggleWishlist?: (product: ProductWithDetails) => void;
  onQuickView?: (product: ProductWithDetails) => void;
  showActions?: boolean;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  showVariants?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  showActions = true,
  columns = 4,
  showVariants = false,
}) => {
  const getGridCols = (): string => {
    const colMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6',
    };
    return colMap[columns];
  };

  if (isLoading) {
    return (
      <div className={`grid ${getGridCols()} gap-6`}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-600">Essayez de modifier vos critères de recherche ou de filtrage.</p>
        </div>
      </div>
    );
  }

  // Si on veut afficher les variantes, on les aplatit
  const itemsToRender = showVariants
    ? products.flatMap((product) =>
        product.variants && product.variants.length > 0
          ? product.variants.map((variant) => ({ product, variant }))
          : [{ product, variant: null }],
      )
    : products.map((product) => ({ product, variant: null }));

  return (
    <div className={`grid ${getGridCols()} gap-6`}>
      {itemsToRender.map((item, _index) => {
        if (item.variant) {
          return (
            <ProductVariantCard
              key={`${item.product.id}-${item.variant.id}`}
              product={item.product}
              variant={item.variant}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              showActions={showActions}
            />
          );
        } else {
          return (
            <ProductCard
              key={item.product.id}
              product={item.product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              showActions={showActions}
            />
          );
        }
      })}
    </div>
  );
};
