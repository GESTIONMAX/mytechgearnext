'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ShoppingCart, Heart, Eye, ArrowRight, Music, Shield, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ChameleoBestSellers = (): React.JSX.Element => {
  const bestSellers = [
    {
      id: 'aura',
      name: 'Aura',
      description: 'Rimless sunglasses with Prismatic™ Color-changing Lenses',
      price: 385,
      originalPrice: null,
      rating: 4.8,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop&crop=center',
      badge: 'Bestseller',
      features: ['Prismatic™ Technology', 'Color-changing', 'Rimless design', 'Premium quality'],
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'music-shield',
      name: 'Music Shield',
      description: 'Tint-adjustable sports sunglasses with built-in audio',
      price: 260,
      originalPrice: null,
      rating: 4.7,
      reviews: 327,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop&crop=center',
      badge: 'Bestseller',
      features: ['Built-in Audio', 'Tint-adjustable', 'Sports optimized', 'Waterproof'],
      icon: <Music className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'falcon',
      name: 'Falcon',
      description: 'Performance sunglasses with automatic tint adjustment',
      price: 199,
      originalPrice: null,
      rating: 4.6,
      reviews: 42,
      image: 'https://images.unsplash.com/photo-1517649772228-475012789097?w=400&h=300&fit=crop&crop=center',
      badge: 'Bestseller',
      features: ['Auto tint adjustment', 'Performance design', 'Lightweight', 'Durable'],
      icon: <Shield className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const handleAddToCart = (productId: string): void => {
    // TODO: Implement cart functionality
  };

  const handleToggleWishlist = (productId: string): void => {
    // TODO: Implement wishlist functionality
  };

  const handleQuickView = (productId: string): void => {
    // TODO: Implement quick view functionality
  };

  const getProductUrl = (productId: string): string => {
    return `/product/${productId}`;
  };

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="border-border text-foreground px-4 py-2 text-sm font-semibold mb-4">
            <Star className="w-4 h-4 mr-2" />
            Best Sellers
          </Badge>

          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Nos produits phares</h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez les lunettes Chamelo les plus appréciées par nos clients
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {bestSellers.map((product) => (
            <Link key={product.id} href={getProductUrl(product.id)}>
              <Card className="bg-card text-card-foreground border-border hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="relative">
                  {/* Product Image */}
                  <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`bg-gradient-to-r ${product.color} text-white border-0`}>{product.badge}</Badge>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-col space-y-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-10 h-10 p-0 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickView(product.id);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-10 h-10 p-0 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleWishlist(product.id);
                          }}
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Product Info */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-8 h-8 bg-gradient-to-br ${product.color} rounded-lg flex items-center justify-center`}
                        >
                          <div className="text-white">{product.icon}</div>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                      </div>

                      <p className="text-muted-foreground text-sm">{product.description}</p>

                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews} avis)
                        </span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {product.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-foreground">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 mt-6">
                      <Button
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product.id);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Ajouter au panier
                      </Button>
                      <Link href={getProductUrl(product.id)}>
                        <Button variant="outline" size="sm" className="px-3" onClick={(e) => e.stopPropagation()}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/products">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Voir tous les produits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChameleoBestSellers;
