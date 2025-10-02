'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductVariantsGrid } from '@/components/ProductVariantsGrid';
import { ProductVariantSelector } from '@/components/ProductVariantSelector';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  Minus,
  Plus,
  Zap,
  Battery,
  Wifi,
  Camera,
  MapPin,
  Users,
  Star as StarIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { ProductWithDetails } from '@/services/productService';

interface ProductCardDetailsProps {
  product: ProductWithDetails;
  onAddToCart?: (product: ProductWithDetails, quantity: number, variant?: any) => void;
  onToggleWishlist?: (product: ProductWithDetails) => void;
  onShare?: (product: ProductWithDetails) => void;
}

export const ProductCardDetails: React.FC<ProductCardDetailsProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onShare,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showVariantSelector, setShowVariantSelector] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price / 100);
  };

  const getFinalPrice = (): number => {
    if (selectedVariant) {
      return selectedVariant.sale_price || selectedVariant.price;
    }
    return product.sale_price || product.price;
  };

  const getOriginalPrice = (): number | null => {
    if (selectedVariant) {
      return selectedVariant.sale_price ? selectedVariant.price : null;
    }
    return product.sale_price ? product.price : null;
  };

  const isOnSale = (): boolean => {
    if (selectedVariant) {
      return !!selectedVariant.sale_price && selectedVariant.sale_price < selectedVariant.price;
    }
    return !!product.sale_price && product.sale_price < product.price;
  };

  const getStockStatus = (): { text: string; color: string; available: boolean } => {
    const inStock = selectedVariant ? selectedVariant.in_stock : product.in_stock;
    const stockQuantity = selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;

    if (!inStock) {
      return { text: 'Rupture de stock', color: 'text-red-600', available: false };
    }
    if (stockQuantity <= 5) {
      return { text: `Plus que ${stockQuantity} en stock`, color: 'text-orange-600', available: true };
    }
    return { text: 'En stock', color: 'text-green-600', available: true };
  };

  const stockStatus = getStockStatus();

  const handleQuantityChange = (newQuantity: number): void => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = (): void => {
    onAddToCart?.(product, quantity, selectedVariant);
  };

  const handleToggleWishlist = (): void => {
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product);
  };

  const handleQuickView = (): void => {
    // TODO: Implémenter l'aperçu rapide
    console.log('Quick view:', product.name);
  };

  const handleShare = (): void => {
    onShare?.(product);
  };

  const getMainImage = (): string => {
    if (product.images && product.images.length > 0) {
      return product.images[selectedImageIndex]?.image_url || product.images[0].image_url;
    }
    return '/placeholder.svg';
  };

  const getFeatureIcon = (feature: string): JSX.Element => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('gps') || featureLower.includes('navigation')) {
      return <MapPin className="h-4 w-4" />;
    }
    if (featureLower.includes('batterie') || featureLower.includes('autonomie')) {
      return <Battery className="h-4 w-4" />;
    }
    if (featureLower.includes('wifi') || featureLower.includes('connecté')) {
      return <Wifi className="h-4 w-4" />;
    }
    if (featureLower.includes('caméra') || featureLower.includes('photo')) {
      return <Camera className="h-4 w-4" />;
    }
    if (featureLower.includes('social') || featureLower.includes('partage')) {
      return <Users className="h-4 w-4" />;
    }
    return <Zap className="h-4 w-4" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={getMainImage()}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority
            />

            {/* Sale Badge */}
            {isOnSale() && (
              <div className="absolute top-4 left-4">
                <Badge variant="destructive" className="text-sm font-semibold">
                  -{Math.round(((getOriginalPrice()! - getFinalPrice()) / getOriginalPrice()!) * 100)}%
                </Badge>
              </div>
            )}

            {/* Category Badge */}
            {product.category && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="text-sm">
                  {product.category.name}
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImageIndex === index
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image src={image.image_url} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            {product.short_description && <p className="text-lg text-gray-600 mb-4">{product.short_description}</p>}

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.8 (127 avis)</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(getFinalPrice())}</span>
              {getOriginalPrice() && (
                <span className="text-xl text-gray-500 line-through">{formatPrice(getOriginalPrice()!)}</span>
              )}
            </div>
            <div className={`text-sm font-medium ${stockStatus.color}`}>{stockStatus.text}</div>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Variantes disponibles</h3>
                <Button variant="outline" size="sm" onClick={() => setShowVariantSelector(true)}>
                  Voir toutes les variantes
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.slice(0, 3).map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedVariant?.id === variant.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {variant.name.split(' - ')[1] || variant.name}
                  </button>
                ))}
                {product.variants.length > 3 && (
                  <button
                    onClick={() => setShowVariantSelector(true)}
                    className="px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700"
                  >
                    +{product.variants.length - 3} autres
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-900">Quantité</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!stockStatus.available}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Ajouter au panier
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleToggleWishlist}
                className={isWishlisted ? 'text-red-600 border-red-600' : ''}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
              <Button size="lg" variant="outline" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Caractéristiques</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {getFeatureIcon(feature)}
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Truck className="h-5 w-5" />
              <span>Livraison gratuite</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-5 w-5" />
              <span>Garantie 2 ans</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <RotateCcw className="h-5 w-5" />
              <span>Retour 30 jours</span>
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description Section */}
      {product.description && (
        <div className="mt-12 space-y-6">
          <Separator />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Specifications */}
      {product.specifications && (
        <div className="mt-12 space-y-6">
          <Separator />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Spécifications techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Variantes disponibles */}
      {product.variants && product.variants.length > 0 && (
        <div className="mt-16">
          <ProductVariantsGrid
            product={product}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleQuickView}
            showActions={true}
            columns={3}
          />
        </div>
      )}

      {/* Variant Selector Modal */}
      {showVariantSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <ProductVariantSelector
                variants={product.variants || []}
                selectedVariant={selectedVariant}
                onVariantSelect={(variant) => {
                  setSelectedVariant(variant);
                  setShowVariantSelector(false);
                }}
                onClose={() => setShowVariantSelector(false)}
                showCloseButton={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
