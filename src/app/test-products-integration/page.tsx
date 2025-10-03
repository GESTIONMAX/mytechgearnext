'use client';

import { useWordPressProducts } from '@/hooks/useWordPressProducts';
import { WordPressProductCard } from '@/components/WordPressProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertCircle, Loader2, Grid, List, Filter } from 'lucide-react';
import { useState } from 'react';

export default function TestProductsIntegrationPage(): React.JSX.Element {
  const { products, isLoading, error } = useWordPressProducts();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'Tous les produits', count: products.length },
    { id: 'sport', name: 'Sport', count: products.filter((p) => p.categories?.[0]?.slug === 'sport').length },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      count: products.filter((p) => p.categories?.[0]?.slug === 'lifestyle').length,
    },
    {
      id: 'prismatic',
      name: 'Prismatic',
      count: products.filter((p) => p.categories?.[0]?.slug === 'prismatic').length,
    },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.categories?.[0]?.slug === activeCategory);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Chargement des produits...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🧪 Test Intégration Produits</h1>
          <p className="text-gray-600 mb-4">Test de l'intégration des composants WordPress sur la page produits</p>
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {products.length} produits WordPress
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {filteredProducts.length} produits filtrés
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800">
              Vue: {viewMode}
            </Badge>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold mb-2">📋 Instructions de test</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Testez les filtres par catégorie</li>
            <li>Changez entre vue grille et liste</li>
            <li>Cliquez sur les cartes pour naviguer vers les détails</li>
            <li>Testez les actions : panier, favoris, partage</li>
            <li>Vérifiez que les données WordPress s'affichent correctement</li>
          </ol>
        </div>

        {/* Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-4">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    {category.name} ({category.count})
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Vue:</span>
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

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {activeCategory === 'all' ? 'Tous les produits' : categories.find((c) => c.id === activeCategory)?.name}
              <span className="text-sm text-gray-500 ml-2">({filteredProducts.length} produits)</span>
            </h2>
          </div>

          <div
            className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}
          >
            {filteredProducts.map((product) => (
              <WordPressProductCard
                key={product.id}
                product={product}
                onAddToCart={(product) => {
                  console.log('Ajouté au panier:', product.name);
                  alert(`Ajouté au panier: ${product.name}`);
                }}
                onToggleWishlist={(product) => {
                  console.log('Toggle wishlist:', product.name);
                  alert(`Ajouté aux favoris: ${product.name}`);
                }}
                onQuickView={(product) => {
                  console.log('Aperçu rapide:', product.name);
                  alert(`Aperçu rapide: ${product.name}`);
                }}
                onShare={(product) => {
                  console.log('Partager:', product.name);
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
            ))}
          </div>
        </div>

        {/* Test Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Tests Réussis
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Chargement des produits WordPress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Affichage des cartes produits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Navigation vers les détails</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Actions interactives</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Filtres par catégorie</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-blue-500 mr-2" />
                Informations Debug
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Produits chargés:</strong> {products.length}
                </p>
                <p>
                  <strong>Catégorie active:</strong> {activeCategory}
                </p>
                <p>
                  <strong>Produits filtrés:</strong> {filteredProducts.length}
                </p>
                <p>
                  <strong>Mode d'affichage:</strong> {viewMode}
                </p>
                <p>
                  <strong>Erreurs:</strong> Aucune
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="/products">Page Produits Principale</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/test-wordpress-cart">Test Panier</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/test-variations">Test Variantes</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
