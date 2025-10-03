'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Shield, CheckCircle, Truck, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FalconProductPage(): React.JSX.Element {
  const product = {
    id: 'falcon',
    name: 'Falcon',
    description: 'Performance sunglasses with automatic tint adjustment',
    fullDescription:
      'Engineered for peak performance with automatic tint adjustment technology. Perfect for athletes and outdoor enthusiasts who demand the best in adaptive eyewear.',
    price: 199,
    originalPrice: null,
    rating: 4.6,
    reviews: 42,
    images: [
      'https://images.unsplash.com/photo-1517649772228-475012789097?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=600&fit=crop&crop=center',
    ],
    features: [
      'Automatic tint adjustment',
      'Performance-optimized design',
      'Lightweight titanium frame',
      'UV400 protection',
      'Anti-fog coating',
      'Secure fit system',
      'Durable construction',
      '2-year warranty',
    ],
    specifications: {
      Frame: 'Titanium',
      Weight: '24g',
      'UV Protection': 'UV400',
      'Tint Speed': '0.1 seconds',
      Warranty: '2 years',
      Fit: 'Performance',
    },
  };

  const handleAddToCart = (): void => {
    // TODO: Implement functionality
    // TODO: Implement cart functionality
  };

  const handleToggleWishlist = (): void => {
    // TODO: Implement functionality
    // TODO: Implement wishlist functionality
  };

  const handleShare = (): void => {
    // TODO: Implement functionality
    // TODO: Implement share functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="border-border text-foreground hover:bg-muted">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative w-full h-96 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl overflow-hidden">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                  <Shield className="w-4 h-4 mr-2" />
                  Bestseller
                </Badge>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image src={image} alt={`${product.name} view ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating}/5 ({product.reviews} avis)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-4xl font-bold text-foreground">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Fonctionnalités principales</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ajouter au panier
                </Button>
                <Button variant="outline" size="lg" onClick={handleToggleWishlist}>
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-semibold text-foreground">Livraison gratuite</div>
                <div className="text-xs text-muted-foreground">24-48h</div>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-semibold text-foreground">Garantie 2 ans</div>
                <div className="text-xs text-muted-foreground">Officielle</div>
              </div>
              <div className="text-center">
                <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-semibold text-foreground">Produit authentique</div>
                <div className="text-xs text-muted-foreground">Certifié</div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Spécifications techniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card text-card-foreground border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Caractéristiques</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Description complète</h3>
                <p className="text-muted-foreground leading-relaxed">{product.fullDescription}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
