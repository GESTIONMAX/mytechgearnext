'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
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
import { useState, useEffect } from 'react';
import { useWordPressCart } from '@/hooks/useWordPressCart';
import { useWordPressProductVariations } from '@/hooks/useWordPressProductVariations';

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
  variations?: Array<{
    id: number;
    attributes: Array<{
      id: number;
      name: string;
      option: string;
    }>;
    price: string;
    regular_price: string;
    sale_price?: string;
    stock_quantity?: number;
    stock_status: string;
    image?: {
      id: number;
      src: string;
    };
  }>;
}

interface WordPressProductVariant {
  id: number;
  attributes: Array<{
    id: number;
    name: string;
    option: string;
  }>;
  price: string;
  regular_price: string;
  sale_price?: string;
  stock_quantity?: number;
  stock_status: string;
  image?: {
    id: number;
    src: string;
  };
}

interface WordPressProductCardDetailsProps {
  product: WordPressProduct;
  onAddToCart?: (product: WordPressProduct, quantity: number, variant?: WordPressProductVariant) => void;
  onToggleWishlist?: (product: WordPressProduct) => void;
  onShare?: (product: WordPressProduct) => void;
}

export const WordPressProductCardDetails: React.FC<WordPressProductCardDetailsProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onShare,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<WordPressProductVariant | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [_showVariantSelector, _setShowVariantSelector] = useState(false);
  const { addItem, openCart } = useWordPressCart();
  const { variations, isLoading: _variationsLoading, getVariationsForProduct } = useWordPressProductVariations();

  // Charger les variantes quand le composant se monte
  useEffect(() => {
    if (product.variations && product.variations.length > 0) {
      getVariationsForProduct(product.id);
    }
  }, [product.id, product.variations, getVariationsForProduct]);

  // Sélectionner la première variante par défaut
  useEffect(() => {
    if (variations.length > 0 && !selectedVariant) {
      setSelectedVariant(variations[0]);
    }
  }, [variations, selectedVariant]);

  const formatPrice = (price: string | number): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(numPrice);
  };

  const getFinalPrice = (): number => {
    if (selectedVariant) {
      return parseFloat(selectedVariant.sale_price || selectedVariant.price);
    }
    return parseFloat(product.sale_price || product.price);
  };

  const getOriginalPrice = (): number | null => {
    if (selectedVariant) {
      return selectedVariant.sale_price ? parseFloat(selectedVariant.regular_price) : null;
    }
    return product.sale_price ? parseFloat(product.regular_price) : null;
  };

  const isOnSale = (): boolean => {
    if (selectedVariant) {
      return (
        !!selectedVariant.sale_price &&
        parseFloat(selectedVariant.sale_price) < parseFloat(selectedVariant.regular_price)
      );
    }
    return !!product.sale_price && parseFloat(product.sale_price) < parseFloat(product.regular_price);
  };

  const getStockStatus = (): { text: string; color: string; available: boolean } => {
    const stockStatus = selectedVariant ? selectedVariant.stock_status : product.stock_status;
    const stockQuantity = selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;
    const inStock = stockStatus === 'instock';

    if (!inStock) {
      return { text: 'Rupture de stock', color: 'text-red-600', available: false };
    }
    if (stockQuantity && stockQuantity <= 5) {
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
    addItem(product, quantity, selectedVariant ?? undefined);
    openCart();
    onAddToCart?.(product, quantity, selectedVariant ?? undefined);
  };

  const handleToggleWishlist = (): void => {
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product);
  };

  const handleShare = (): void => {
    onShare?.(product);
  };

  const getMainImage = (): string => {
    if (product.images && product.images.length > 0) {
      return product.images[selectedImageIndex]?.src || product.images[0].src;
    }
    return '/placeholder.svg';
  };

  const getFeatureIcon = (feature: string): React.ReactElement => {
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

  // Extraire les caractéristiques depuis les attributs WordPress
  const getFeatures = (): string[] => {
    const features: string[] = [];

    // Ajouter des caractéristiques basées sur les attributs
    product.attributes.forEach((attr) => {
      if (attr.name.toLowerCase().includes('couleur')) {
        features.push(`Couleurs disponibles: ${attr.options.join(', ')}`);
      } else if (attr.name.toLowerCase().includes('taille')) {
        features.push(`Tailles: ${attr.options.join(', ')}`);
      } else if (attr.name.toLowerCase().includes('matériau')) {
        features.push(`Matériau: ${attr.options.join(', ')}`);
      }
    });

    // Caractéristiques par défaut basées sur le nom du produit
    if (product.name.toLowerCase().includes('audio') || product.name.toLowerCase().includes('music')) {
      features.push('Audio intégré', 'Contrôle tactile', "Résistant à l'eau");
    }
    if (product.name.toLowerCase().includes('sport')) {
      features.push('Design sportif', 'Lentilles polarisées', 'Protection UV');
    }
    if (product.name.toLowerCase().includes('smart')) {
      features.push('Technologie intelligente', 'Connexion Bluetooth', 'Application mobile');
    }

    return features;
  };

  const features = getFeatures();

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
            {product.categories && product.categories.length > 0 && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="text-sm">
                  {product.categories[0].name}
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
                  <Image
                    src={image.src}
                    alt={image.alt || `${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
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
          {product.variations && product.variations.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Variantes disponibles</h3>
                <Button variant="outline" size="sm" onClick={() => _setShowVariantSelector(true)}>
                  Voir toutes les variantes
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {variations.slice(0, 3).map((variant) => (
                  <button
                    key={`variant-${variant.id}`}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedVariant?.id === variant.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {variant.attributes?.map((attr: { id: number; name: string; option: string }) => attr.option).join(' - ') || `Variante ${variant.id}`}
                  </button>
                ))}
                {product.variations.length > 3 && (
                  <button
                    onClick={() => _setShowVariantSelector(true)}
                    className="px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700"
                  >
                    +{product.variations.length - 3} autres
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
          {features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Caractéristiques</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
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

          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Catégories</h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <Badge key={category.id} variant="outline" className="text-xs">
                    {category.name}
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

      {/* Attributes */}
      {product.attributes && product.attributes.length > 0 && (
        <div className="mt-12 space-y-6">
          <Separator />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Spécifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.attributes.map((attr) => (
                <div key={attr.id} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">{attr.name}</span>
                  <span className="text-gray-600">{attr.options.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
