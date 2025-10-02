'use client';

import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/useSupabaseProducts';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Grid, List, Filter } from 'lucide-react';

interface ProductNavigationProps {
  onViewToggle?: (view: 'grid' | 'list') => void;
  currentView?: 'grid' | 'list';
  onFilterToggle?: () => void;
  showFilters?: boolean;
}

export const ProductNavigation: React.FC<ProductNavigationProps> = ({
  onViewToggle,
  currentView = 'grid',
  onFilterToggle,
  showFilters = false,
}) => {
  const pathname = usePathname();
  const { data: categories, isLoading } = useCategories();

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MT</span>
            </div>
            <span className="font-bold text-gray-900">MyTechGear</span>
          </Link>

          {/* Category Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/products"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/products')
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Tous les produits
            </Link>

            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.includes(category.slug)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-2">
            {/* Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={onFilterToggle}
              className={`${showFilters ? 'bg-primary text-primary-foreground' : ''}`}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filtres
            </Button>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg">
              <Button
                variant={currentView === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewToggle?.('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={currentView === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewToggle?.('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Category Navigation */}
        <div className="md:hidden py-3 border-t border-gray-200">
          <div className="flex items-center space-x-1 overflow-x-auto pb-2">
            <Link
              href="/products"
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isActive('/products')
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Tous
            </Link>

            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname.includes(category.slug)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
