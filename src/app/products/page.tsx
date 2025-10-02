'use client';

import { ProductGrid } from '@/components/ProductGrid';
import { ProductFilters } from '@/components/ProductFilters';
import { SupabaseTest } from '@/components/SupabaseTest';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/hooks/useSupabaseProducts';
import { Grid, List, Search } from 'lucide-react';
import { useState } from 'react';

export default function ProductsPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [showVariants, setShowVariants] = useState(false);
  const [filters, setFilters] = useState({
    category: undefined,
    priceMin: undefined,
    priceMax: undefined,
    inStock: undefined,
    tags: undefined,
    search: searchTerm,
  });

  const { data: products = [], isLoading, error } = useProducts(filters);

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleFiltersChange = (newFilters: any): void => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleAddToCart = (product: any, variant?: any): void => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product, variant);
  };

  const handleToggleWishlist = (product: any): void => {
    // TODO: Implement wishlist functionality
    console.log('Toggle wishlist:', product);
  };

  const handleQuickView = (product: any): void => {
    // TODO: Implement quick view functionality
    console.log('Quick view:', product);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h1>
          <p className="text-gray-600">Impossible de charger les produits. Veuillez réessayer plus tard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Nos Produits</h1>
      
      {/* Test de connexion Supabase */}
      <div className="mb-8">
        <SupabaseTest />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters onFiltersChange={handleFiltersChange} />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Search and View Controls */}
          <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher des produits..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <Button variant={showVariants ? 'outline' : 'default'} onClick={() => setShowVariants(!showVariants)}>
                <List className="mr-2 h-4 w-4" />
                {showVariants ? 'Masquer variantes' : 'Afficher variantes'}
              </Button>
              <Button variant="outline">
                <Grid className="mr-2 h-4 w-4" />
                Grille
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={products}
            isLoading={isLoading}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleQuickView}
            columns={3}
            showVariants={showVariants}
          />
        </div>
      </div>
    </div>
  );
}
