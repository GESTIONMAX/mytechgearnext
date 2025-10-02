'use client';

import { ProductVariantCard } from '@/components/ProductVariantCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProductWithDetails } from '@/services/productService';

interface ProductVariantsGridProps {
  product: ProductWithDetails;
  onAddToCart?: (product: ProductWithDetails, variant: any) => void;
  onToggleWishlist?: (product: ProductWithDetails) => void;
  onQuickView?: (product: ProductWithDetails) => void;
  showActions?: boolean;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const ProductVariantsGrid: React.FC<ProductVariantsGridProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  showActions = true,
  columns = 4,
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

  if (!product.variants || product.variants.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune variante disponible</h3>
        <p className="text-gray-600">Ce produit n&apos;a pas de variantes disponibles pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Variantes disponibles</h2>
        <p className="text-gray-600">Choisissez la variante qui correspond le mieux à vos besoins</p>
      </div>

      <div className={`grid ${getGridCols()} gap-6`}>
        {product.variants.map((variant) => (
          <ProductVariantCard
            key={variant.id}
            product={product}
            variant={variant}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onQuickView={onQuickView}
            showActions={showActions}
          />
        ))}
      </div>
    </div>
  );
};
