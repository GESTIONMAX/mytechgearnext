'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ShoppingCart, Heart, Eye, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/cart-context';
import { logger } from '@/lib/logger';
import type { ProductWithDetails, ProductVariantWithDetails } from '@/types';

interface ProductVariantCardProps {
  product: ProductWithDetails;
  variant: ProductVariantWithDetails;
  onAddToCart?: (product: ProductWithDetails, variant: ProductVariantWithDetails) => void;
  onToggleWishlist?: (product: ProductWithDetails) => void;
  onQuickView?: (product: ProductWithDetails) => void;
  showActions?: boolean;
}

export const ProductVariantCard: React.FC<ProductVariantCardProps> = ({
  product,
  variant,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  showActions = true,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price / 100);
  };

  const getVariantImage = (): string => {
    // Chercher une image spécifique à la variante
    if (variant.images && variant.images.length > 0) {
      return variant.images[0].image_url;
    }
    // Sinon utiliser l'image du produit principal
    if (product.images && product.images.length > 0) {
      return product.images[0].image_url;
    }
    return '/placeholder.svg';
  };

  const getFinalPrice = (): number => {
    return variant.sale_price || variant.price;
  };

  const getOriginalPrice = (): number | null => {
    return variant.sale_price ? variant.price : null;
  };

  const isOnSale = (): boolean => {
    return !!variant.sale_price && variant.sale_price < variant.price;
  };

  const getStockStatus = (): { text: string; color: string } => {
    if (!variant.in_stock) {
      return { text: 'Rupture de stock', color: 'bg-red-100 text-red-800' };
    }
    if (variant.stock_quantity <= 5) {
      return { text: 'Stock faible', color: 'bg-orange-100 text-orange-800' };
    }
    return { text: 'En stock', color: 'bg-green-100 text-green-800' };
  };

  const stockStatus = getStockStatus();

  const handleToggleWishlist = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product);
  };

  const handleShare = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      navigator
        .share({
          title: `${product.name} - ${variant.name}`,
          text: product.short_description || product.description,
          url: `${window.location.origin}/product/${product.slug}?variant=${variant.id}`,
        })
        .catch((error) => {
          logger.error('Erreur lors du partage', error);
        });
    } else {
      // Fallback: copier le lien dans le presse-papiers
      navigator.clipboard
        .writeText(`${window.location.origin}/product/${product.slug}?variant=${variant.id}`)
        .then(() => {
          alert('Lien copié dans le presse-papiers !');
        })
        .catch((error) => {
          logger.error('Erreur lors de la copie', error);
        });
    }
  };

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    // Ajouter au panier via le contexte avec l'ID de la variante
    addItem(product, 1, variant.id);

    // Appeler la fonction callback si fournie
    onAddToCart?.(product, variant);

    // Feedback visuel (optionnel)
    logger.info('Product variant added to cart', {
      productName: product.name,
      variantName: variant.name,
      productId: product.id,
      variantId: variant.id,
    });
  };

  return (
    <Link href={`/product/${product.slug}?variant=${variant.id}`} className="block">
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={getVariantImage()}
            alt={`${product.name} - ${variant.name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isOnSale() && (
              <Badge variant="destructive" className="text-xs">
                -{Math.round(((variant.price - variant.sale_price) / variant.price) * 100)}%
              </Badge>
            )}
            {product.category && (
              <Badge variant="secondary" className="text-xs">
                {product.category.name}
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          <div className="absolute top-2 right-2">
            <Badge className={`text-xs ${stockStatus.color}`}>{stockStatus.text}</Badge>
          </div>

          {/* Actions overlay */}
          {showActions && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView?.(product);
                }}
                className="bg-white/90 hover:bg-white flex items-center gap-1.5 px-3"
                title="Aperçu rapide"
              >
                <Eye className="h-4 w-4" />
                <span className="text-xs font-medium">Aperçu</span>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleToggleWishlist}
                className={`bg-white/90 hover:bg-white flex items-center gap-1.5 px-3 ${isWishlisted ? 'text-red-500' : ''}`}
                title={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{isWishlisted ? 'Retiré' : 'Favoris'}</span>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleShare}
                className="bg-white/90 hover:bg-white flex items-center gap-1.5 px-3"
                title="Partager"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-xs font-medium">Partager</span>
              </Button>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 font-medium">{variant.name}</p>

            {/* Variant Attributes */}
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

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.5 (24 avis)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">{formatPrice(getFinalPrice())}</span>
              {getOriginalPrice() && (
                <span className="text-sm text-gray-500 line-through">{formatPrice(getOriginalPrice()!)}</span>
              )}
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1" onClick={handleAddToCart} disabled={!variant.in_stock}>
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Ajouter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleWishlist?.(product);
                  }}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
