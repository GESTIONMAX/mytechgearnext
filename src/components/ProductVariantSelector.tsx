'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import type { ProductVariantWithDetails } from '@/types';

interface ProductVariantSelectorProps {
  variants: ProductVariantWithDetails[];
  selectedVariant: ProductVariantWithDetails | null;
  onVariantSelect: (variant: ProductVariantWithDetails) => void;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantSelect,
  onClose,
  showCloseButton = false,
}) => {
  const [localSelectedVariant, setLocalSelectedVariant] = useState(selectedVariant);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price / 100);
  };

  const getVariantImage = (variant: ProductVariantWithDetails): string => {
    if (variant.images && variant.images.length > 0) {
      return variant.images[0].image_url;
    }
    return '/placeholder.svg';
  };

  const getStockStatus = (variant: ProductVariantWithDetails): { text: string; color: string; available: boolean } => {
    if (!variant.in_stock) {
      return { text: 'Rupture de stock', color: 'text-red-600', available: false };
    }
    if (variant.stock_quantity <= 5) {
      return { text: 'Stock faible', color: 'text-orange-600', available: true };
    }
    return { text: 'En stock', color: 'text-green-600', available: true };
  };

  const handleVariantClick = (variant: ProductVariantWithDetails): void => {
    setLocalSelectedVariant(variant);
  };

  const handleConfirmSelection = (): void => {
    if (localSelectedVariant) {
      onVariantSelect(localSelectedVariant);
    }
  };

  if (variants.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <X className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune variante disponible</h3>
        <p className="text-gray-600">Ce produit n&apos;a pas de variantes disponibles pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showCloseButton && onClose && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Choisir une variante</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {variants.map((variant) => {
          const isSelected = localSelectedVariant?.id === variant.id;
          const stockStatus = getStockStatus(variant);
          const isOnSale = variant.sale_price && variant.sale_price < variant.price;

          return (
            <Card
              key={variant.id}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected ? 'ring-2 ring-primary border-primary' : 'hover:shadow-md'
              } ${!stockStatus.available ? 'opacity-50' : ''}`}
              onClick={() => stockStatus.available && handleVariantClick(variant)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image src={getVariantImage(variant)} alt={variant.name} fill className="object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </div>

                  {/* Variant Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{variant.name}</h3>

                    {/* Attributes */}
                    {variant.attributes && (
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(variant.attributes)
                          .slice(0, 2)
                          .map(([key, value], index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {key}: {value}
                            </Badge>
                          ))}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(variant.sale_price || variant.price)}
                      </span>
                      {isOnSale && (
                        <span className="text-sm text-gray-500 line-through">{formatPrice(variant.price)}</span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className={`text-sm font-medium ${stockStatus.color}`}>{stockStatus.text}</div>

                    {/* Sale Badge */}
                    {isOnSale && (
                      <Badge variant="destructive" className="text-xs">
                        -{Math.round(((variant.price - variant.sale_price) / variant.price) * 100)}%
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        {showCloseButton && onClose && (
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        )}
        <Button onClick={handleConfirmSelection} disabled={!localSelectedVariant} className="min-w-[120px]">
          {localSelectedVariant ? 'Sélectionner' : 'Choisir une variante'}
        </Button>
      </div>
    </div>
  );
};
