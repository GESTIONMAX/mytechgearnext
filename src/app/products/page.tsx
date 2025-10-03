'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Music, Shield, Sparkles, Filter, Grid, List } from 'lucide-react';
import { useState } from 'react';
import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { WordPressProductCard } from '@/components/WordPressProductCard';

export default function ProductsPage(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Utiliser les données WordPress au lieu des données statiques
  const { products: wordpressProducts, isLoading, error } = useWordPressProducts();

  const categories = [
    {
      id: 'all',
      name: 'Tous les produits',
      description: 'Découvrez notre collection complète',
      icon: <Grid className="w-5 h-5" />,
      color: 'from-gray-500 to-gray-600',
    },
    {
      id: 'sport',
      name: 'Sport',
      description: 'Performance et durabilité pour les athlètes',
      icon: <Shield className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      description: 'Élégance et confort pour le quotidien',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'prismatic',
      name: 'Prismatic',
      description: 'Innovation et technologie révolutionnaire',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const _products = [
    // Sport Collection
    {
      id: 'music-shield',
      name: 'Music Shield',
      category: 'sport',
      description: 'Tint-adjustable sports sunglasses with built-in audio',
      price: 260,
      rating: 4.7,
      reviews: 327,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop&crop=center',
      features: ['Built-in Audio', 'Tint-adjustable', 'Sports optimized', 'Waterproof'],
      icon: <Music className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'falcon',
      name: 'Falcon',
      category: 'sport',
      description: 'Performance sunglasses with automatic tint adjustment',
      price: 199,
      rating: 4.6,
      reviews: 42,
      image: 'https://images.unsplash.com/photo-1517649772228-475012789097?w=400&h=300&fit=crop&crop=center',
      features: ['Auto tint adjustment', 'Performance design', 'Lightweight', 'Durable'],
      icon: <Shield className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'shield',
      name: 'Shield',
      category: 'sport',
      description: 'Next-gen sports sunglasses with dual-tint adjustment',
      price: 199,
      rating: 4.5,
      reviews: 20,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop&crop=center',
      features: ['Dual-tint adjustment', 'Sports optimized', 'UV400 protection', 'Secure fit'],
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
    },

    // Lifestyle Collection
    {
      id: 'aura',
      name: 'Aura',
      category: 'lifestyle',
      description: 'Rimless sunglasses with Prismatic™ Color-changing Lenses',
      price: 385,
      rating: 4.8,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop&crop=center',
      features: ['Prismatic™ Technology', 'Color-changing', 'Rimless design', 'Premium quality'],
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'dusk-classic',
      name: 'Dusk Classic',
      category: 'lifestyle',
      description: 'App-enabled tint-adjustable sunglasses with built-in audio',
      price: 249,
      rating: 4.7,
      reviews: 220,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop&crop=center',
      features: ['App-enabled', 'Tint-adjustable', 'Built-in audio', 'Classic design'],
      icon: <Music className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'veil',
      name: 'Veil',
      category: 'lifestyle',
      description: 'Cat-eye frames with tint-adjusting technology',
      price: 199,
      rating: 4.4,
      reviews: 8,
      image: 'https://images.unsplash.com/photo-1517649772228-475012789097?w=400&h=300&fit=crop&crop=center',
      features: ['Cat-eye design', 'Tint-adjusting', 'Sleek aesthetic', 'Effortless control'],
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
    },

    // Prismatic Collection
    {
      id: 'euphoria',
      name: 'Euphoria',
      category: 'prismatic',
      description: 'Revolutionary color-changing sunglasses',
      price: 385,
      rating: 4.9,
      reviews: 15,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop&crop=center',
      features: ['Color-changing', 'Revolutionary tech', 'Unique design', 'Premium materials'],
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'dragon',
      name: 'Dragon',
      category: 'prismatic',
      description: 'Adaptive eyewear with smart liquid crystal lenses',
      price: 249,
      rating: 4.6,
      reviews: 4,
      image: 'https://images.unsplash.com/photo-1517649772228-475012789097?w=400&h=300&fit=crop&crop=center',
      features: ['Smart liquid crystal', 'Adaptive technology', 'Sculpted aesthetic', 'Total control'],
      icon: <Zap className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
    },
  ];

  // Gestion du chargement
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Erreur de chargement</h1>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  // Utiliser les produits WordPress
  const mappedProducts = wordpressProducts.map((wpProduct) => ({
    id: wpProduct.id.toString(),
    name: wpProduct.name,
    description: wpProduct.short_description || wpProduct.description,
    price: parseFloat(wpProduct.sale_price || wpProduct.price),
    originalPrice: wpProduct.sale_price ? parseFloat(wpProduct.regular_price) : null,
    rating: 4.5, // Valeur par défaut
    reviews: Math.floor(Math.random() * 100), // Valeur par défaut
    image: wpProduct.images?.[0]?.src || '/placeholder.svg',
    category: wpProduct.categories?.[0]?.slug || 'uncategorized',
    features: [], // À adapter selon vos besoins
    icon: <Shield className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
  }));

  const filteredProducts =
    activeCategory === 'all' ? mappedProducts : mappedProducts.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Collection Chamelo</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre collection complète de lunettes connectées, organisée par catégories pour une expérience
            optimale.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-12">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 bg-gradient-to-r ${category.color} rounded`} />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Category Description */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div
                  className={`w-8 h-8 bg-gradient-to-r ${categories.find((c) => c.id === activeCategory)?.color} rounded-lg flex items-center justify-center`}
                >
                  <div className="text-white">{categories.find((c) => c.id === activeCategory)?.icon}</div>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {categories.find((c) => c.id === activeCategory)?.name}
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {categories.find((c) => c.id === activeCategory)?.description}
              </p>
            </div>

            {/* View Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <TabsContent value={activeCategory} className="mt-0">
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product) => {
                  // Trouver le produit WordPress correspondant
                  const wpProduct = wordpressProducts.find((wp) => wp.id.toString() === product.id);
                  if (!wpProduct) return null;

                  return (
                    <WordPressProductCard
                      key={wpProduct.id}
                      product={wpProduct}
                      onAddToCart={(product) => {
                        alert(`Ajouté au panier: ${product.name}`);
                      }}
                      onToggleWishlist={(product) => {
                        alert(`Ajouté aux favoris: ${product.name}`);
                      }}
                      onQuickView={(product) => {
                        alert(`Aperçu rapide: ${product.name}`);
                      }}
                      onShare={(product) => {
                        if (navigator.share) {
                          navigator.share({
                            title: product.name,
                            text: product.short_description,
                            url: window.location.href,
                          });
                        } else {
                          alert(`Partage: ${product.name}`);
                        }
                      }}
                      showActions={true}
                      className={viewMode === 'list' ? 'flex' : ''}
                    />
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 bg-muted rounded-lg">
          <h3 className="text-2xl font-bold text-foreground mb-4">Vous ne trouvez pas ce que vous cherchez ?</h3>
          <p className="text-muted-foreground mb-6">Contactez notre équipe d&apos;experts pour des conseils personnalisés</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Filter className="mr-2 h-5 w-5" />
              Filtres avancés
            </Button>
            <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted">
              Contacter un expert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
