'use client';

import { useState } from 'react';
import { useProducts, useCategories, useProductStats } from '@/hooks/useUnifiedAPI';
import { UnifiedUtils } from '@/lib/adapters';
import type { SearchFilters } from '@/lib/api';

export function UnifiedProductList() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const { data: productsResponse, isLoading, error } = useProducts(filters);
  const { data: categoriesResponse } = useCategories();
  const stats = useProductStats();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters((prev) => ({ ...prev, query }));
  };

  const handleCategoryFilter = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: category === 'all' ? undefined : category,
    }));
  };

  const handleStockFilter = (inStock?: boolean) => {
    setFilters((prev) => ({ ...prev, inStock }));
  };

  const handleSort = (sortBy: 'name' | 'price' | 'createdAt', sortOrder: 'asc' | 'desc') => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Chargement des produits...</span>
      </div>
    );
  }

  if (error || !productsResponse?.success) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">Erreur de chargement</h3>
        <p className="text-red-600">{productsResponse?.error || 'Impossible de charger les produits'}</p>
      </div>
    );
  }

  const products = productsResponse?.data || [];

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">📊 Statistiques</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalProducts}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.activeProducts}</div>
            <div className="text-sm text-gray-600">Actifs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.inStockProducts}</div>
            <div className="text-sm text-gray-600">En stock</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.averagePrice}€</div>
            <div className="text-sm text-gray-600">Prix moyen</div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">🔍 Filtres</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Recherche */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Nom du produit..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              {categoriesResponse?.data?.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <select
              onChange={(e) => {
                const value = e.target.value;
                handleStockFilter(value === 'all' ? undefined : value === 'instock');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous</option>
              <option value="instock">En stock</option>
              <option value="outofstock">Rupture</option>
            </select>
          </div>

          {/* Tri */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
            <select
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                handleSort(sortBy as 'name' | 'price' | 'createdAt', sortOrder as 'asc' | 'desc');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name-asc">Nom (A-Z)</option>
              <option value="name-desc">Nom (Z-A)</option>
              <option value="price-asc">Prix (croissant)</option>
              <option value="price-desc">Prix (décroissant)</option>
              <option value="createdAt-desc">Plus récent</option>
              <option value="createdAt-asc">Plus ancien</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <UnifiedProductCard key={`${product.source}-${product.sourceId}`} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
          <p className="text-gray-400 text-sm mt-2">Essayez de modifier vos filtres de recherche</p>
        </div>
      )}
    </div>
  );
}

function UnifiedProductCard({ product }: { product: any }) {
  const finalPrice = UnifiedUtils.getFinalPrice(product);
  const isInStock = UnifiedUtils.isInStock(product);
  const formattedPrice = UnifiedUtils.formatPrice(finalPrice);
  const sku = UnifiedUtils.generateSKU(product);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {product.images.length > 0 && (
        <div className="aspect-w-16 aspect-h-12">
          <img src={product.images[0].src} alt={product.images[0].alt} className="w-full h-48 object-cover" />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.source === 'wordpress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {product.source === 'wordpress' ? 'WP' : 'SB'}
          </span>
          <span className="text-xs text-gray-500">SKU: {sku}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-blue-600">{formattedPrice}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isInStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {isInStock ? 'En stock' : 'Rupture'}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.categories.map((category: any) => (
            <span key={category.id} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {category.name}
            </span>
          ))}
        </div>

        <button
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isInStock ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isInStock}
        >
          {isInStock ? 'Ajouter au panier' : 'Rupture de stock'}
        </button>
      </div>
    </div>
  );
}
