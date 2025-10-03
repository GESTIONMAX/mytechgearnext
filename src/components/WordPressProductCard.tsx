'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ShoppingCart, Heart, Eye, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useWordPressCart } from '@/hooks/useWordPressCart';

interface WordPressProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price?: string;
  images: Array<{
    id: number;
    src: string;
    name: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  stock_quantity?: number;
  stock_status: string;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
}

interface WordPressProductCardProps {
  product: WordPressProduct;
  onAddToCart?: (product: WordPressProduct) => void;
  onToggleWishlist?: (product: WordPressProduct) => void;
  onQuickView?: (product: WordPressProduct) => void;
  onShare?: (product: WordPressProduct) => void;
  showActions?: boolean;
  className?: string;
}

export const WordPressProductCard: React.FC<WordPressProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onShare,
  showActions = true,
  className = '',
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, openCart } = useWordPressCart();

  const formatPrice = (price: string): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(price));
  };

  const getMainImage = (): string => {
    if (product.images && product.images.length > 0) {
      return product.images[0].src;
    }
    return '/placeholder.svg';
  };

  const getProductUrl = (): string => {
    return `/product/${product.slug}`;
  };

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    openCart();
    onAddToCart?.(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product);
  };

  const handleQuickView = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleShare = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(product);
  };

  const isOnSale = (): boolean => {
    return !!product.sale_price && parseFloat(product.sale_price) < parseFloat(product.regular_price);
  };

  const isInStock = (): boolean => {
    return product.stock_status === 'instock';
  };

  const getDiscountPercentage = (): number => {
    if (!isOnSale()) return 0;
    const original = parseFloat(product.regular_price);
    const sale = parseFloat(product.sale_price!);
    return Math.round(((original - sale) / original) * 100);
  };

  return (
    <Card
      className={`bg-white shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={getProductUrl()}>
        <div className="relative">
          {/* Product Image */}
          <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
            <Image
              src={getMainImage()}
              alt={product.images?.[0]?.alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Sale Badge */}
            {isOnSale() && (
              <div className="absolute top-3 left-3">
                <Badge variant="destructive" className="text-xs font-semibold">
                  -{getDiscountPercentage()}%
                </Badge>
              </div>
            )}

            {/* Stock Badge */}
            <div className="absolute top-3 right-3">
              <Badge
                variant={isInStock() ? 'default' : 'destructive'}
                className={`text-xs ${isInStock() ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
              >
                {isInStock() ? 'En stock' : 'Rupture'}
              </Badge>
            </div>

            {/* Quick Actions */}
            {showActions && isHovered && (
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col space-y-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 rounded-full"
                    onClick={handleQuickView}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 rounded-full"
                    onClick={handleToggleWishlist}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                  <Button size="sm" variant="secondary" className="w-10 h-10 p-0 rounded-full" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <CardContent className="p-4">
            {/* Categories */}
            {product.categories && product.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {product.categories.slice(0, 2).map((category) => (
                  <Badge key={category.id} variant="outline" className="text-xs">
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Product Name */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.short_description || product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-xs text-gray-500">4.8 (127)</span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold text-primary">
                  {formatPrice(product.sale_price || product.price)}
                </span>
                {product.sale_price && (
                  <span className="text-sm text-gray-500 line-through">{formatPrice(product.regular_price)}</span>
                )}
              </div>
              {product.stock_quantity && <span className="text-xs text-gray-500">Stock: {product.stock_quantity}</span>}
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex space-x-2">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                  disabled={!isInStock()}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isInStock() ? 'Ajouter' : 'Rupture'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleWishlist}
                  className={isWishlisted ? 'text-red-600 border-red-600' : ''}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </Link>
    </Card>
  );
};
