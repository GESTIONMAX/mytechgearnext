'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ShoppingCart, Heart, Eye, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/cart-context';
import type { ProductWithDetails, Product } from '@/types';

interface ProductCardProps {
  product: ProductWithDetails;
  onAddToCart?: (product: ProductWithDetails) => void;
  onToggleWishlist?: (product: ProductWithDetails) => void;
  onQuickView?: (product: ProductWithDetails) => void;
  showActions?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
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

  const getMainImage = (): string => {
    if (product.images && product.images.length > 0) {
      return typeof product.images[0] === 'string' ? product.images[0] : product.image_url || '/placeholder.svg';
    }
    return product.image_url || '/placeholder.svg';
  };

  const getFinalPrice = (): number => {
    return product.salePrice || product.price;
  };

  const getOriginalPrice = (): number | null => {
    return product.salePrice ? product.price : null;
  };

  const isOnSale = (): boolean => {
    return !!product.salePrice && product.salePrice < product.price;
  };

  const getStockStatus = (): { text: string; color: string } => {
    if (!product.inStock) {
      return { text: 'Rupture de stock', color: 'bg-red-100 text-red-800' };
    }
    if (product.stockQuantity <= 5) {
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
          title: product.name,
          text: product.shortDescription || product.description,
          url: `${window.location.origin}/product/${product.slug}`,
        })
        .catch(() => {
          // Error handled silently
        });
    } else {
      // Fallback: copier le lien dans le presse-papiers
      navigator.clipboard
        .writeText(`${window.location.origin}/product/${product.slug}`)
        .then(() => {
          alert('Lien copié dans le presse-papiers !');
        })
        .catch(() => {
          // Error handled silently
        });
    }
  };

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    // Convertir ProductWithDetails en Product pour le contexte
    const productForCart: Product = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      category: typeof product.category === 'object' && product.category !== null ? product.category.name : (product.category || ''),
      categorySlug: typeof product.category === 'object' && product.category !== null ? product.category.slug : undefined,
      tags: product.tags || [],
      inStock: product.inStock,
      stockQuantity: product.stockQuantity,
      variants: product.variants,
      features: product.features,
      specifications: product.specifications,
    };

    // Ajouter au panier via le contexte
    addItem(productForCart, 1);

    // Appeler la fonction callback si fournie
    onAddToCart?.(product);

    // Feedback visuel (optionnel)
    // logger.info('Product added to cart', { productName: product.name, productId: product.id });
  };

  return (
    <Link href={`/product/${product.slug}`} className="block">
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={getMainImage()}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isOnSale() && (
              <Badge variant="destructive" className="text-xs">
                -{Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
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

            {product.shortDescription && (
              <p className="text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>
            )}

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.5)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">{formatPrice(getFinalPrice())}</span>
              {getOriginalPrice() && (
                <span className="text-sm text-gray-500 line-through">{formatPrice(getOriginalPrice()!)}</span>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {product.variants.slice(0, 3).map((variant: { name: string; id: string }, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {variant.name.split(' - ')[1] || variant.name}
                    </Badge>
                  ))}
                  {product.variants.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.variants.length - 3} autres
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            {showActions && (
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
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
