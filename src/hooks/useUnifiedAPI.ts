/**
 * Unified API Hooks
 *
 * Hooks React Query pour l'API unifiée
 * - Interface commune pour WordPress + Supabase
 * - Cache intelligent et synchronisation
 * - Gestion d'erreurs centralisée
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UnifiedAPI, type SearchFilters, type ApiResponse } from '@/lib/api';
import type { UnifiedProduct, UnifiedUser, UnifiedOrder } from '@/lib/adapters';

// ===== QUERY KEYS =====

export const queryKeys = {
  products: ['unified-products'] as const,
  product: (id: string | number) => ['unified-product', id] as const,
  productBySlug: (slug: string) => ['unified-product-slug', slug] as const,
  searchProducts: (query: string, filters?: SearchFilters) => ['unified-search', query, filters] as const,
  productsByCategory: (category: string) => ['unified-products-category', category] as const,
  categories: ['unified-categories'] as const,
  user: (id: string) => ['unified-user', id] as const,
  userOrders: (userId: string) => ['unified-user-orders', userId] as const,
} as const;

// ===== HOOKS DE RÉCUPÉRATION =====

/**
 * Hook pour récupérer tous les produits
 */
export function useProducts(filters?: SearchFilters) {
  return useQuery({
    queryKey: [...queryKeys.products, filters],
    queryFn: () => UnifiedAPI.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

/**
 * Hook pour récupérer un produit par ID
 */
export function useProduct(id: string | number) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => UnifiedAPI.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

/**
 * Hook pour récupérer un produit par slug
 */
export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: queryKeys.productBySlug(slug),
    queryFn: () => UnifiedAPI.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

/**
 * Hook pour rechercher des produits
 */
export function useSearchProducts(query: string, filters?: Omit<SearchFilters, 'query'>) {
  return useQuery({
    queryKey: queryKeys.searchProducts(query, filters),
    queryFn: () => UnifiedAPI.searchProducts(query, filters),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
}

/**
 * Hook pour récupérer les produits par catégorie
 */
export function useProductsByCategory(categorySlug: string) {
  return useQuery({
    queryKey: queryKeys.productsByCategory(categorySlug),
    queryFn: () => UnifiedAPI.getProductsByCategory(categorySlug),
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

/**
 * Hook pour récupérer les catégories
 */
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => UnifiedAPI.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}

// ===== HOOKS DE MUTATION =====

/**
 * Hook pour créer un produit
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: Partial<UnifiedProduct>) => {
      // TODO: Implémenter la création de produit
      throw new Error('Not implemented yet');
    },
    onSuccess: () => {
      // Invalider le cache des produits
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
}

/**
 * Hook pour mettre à jour un produit
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: Partial<UnifiedProduct> }) => {
      // TODO: Implémenter la mise à jour de produit
      throw new Error('Not implemented yet');
    },
    onSuccess: (_, { id }) => {
      // Invalider le cache du produit spécifique et de la liste
      queryClient.invalidateQueries({ queryKey: queryKeys.product(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
}

/**
 * Hook pour supprimer un produit
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      // TODO: Implémenter la suppression de produit
      throw new Error('Not implemented yet');
    },
    onSuccess: (_, id) => {
      // Invalider le cache
      queryClient.invalidateQueries({ queryKey: queryKeys.product(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
}

// ===== HOOKS UTILITAIRES =====

/**
 * Hook pour précharger un produit
 */
export function usePrefetchProduct() {
  const queryClient = useQueryClient();

  return (id: string | number) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.product(id),
      queryFn: () => UnifiedAPI.getProductById(id),
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Hook pour précharger les produits d'une catégorie
 */
export function usePrefetchProductsByCategory() {
  const queryClient = useQueryClient();

  return (categorySlug: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.productsByCategory(categorySlug),
      queryFn: () => UnifiedAPI.getProductsByCategory(categorySlug),
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Hook pour invalider le cache des produits
 */
export function useInvalidateProducts() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products });
  };
}

// ===== HOOKS DE STATISTIQUES =====

/**
 * Hook pour récupérer les statistiques des produits
 */
export function useProductStats() {
  const { data: productsResponse } = useProducts();

  if (!productsResponse?.data) {
    return {
      totalProducts: 0,
      activeProducts: 0,
      inStockProducts: 0,
      outOfStockProducts: 0,
      averagePrice: 0,
      totalValue: 0,
    };
  }

  const products = productsResponse.data;
  const activeProducts = products.filter((p) => p.isActive);
  const inStockProducts = products.filter((p) => p.stockStatus === 'instock');
  const outOfStockProducts = products.filter((p) => p.stockStatus === 'outofstock');
  const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * (p.stockQuantity || 0), 0);

  return {
    totalProducts: products.length,
    activeProducts: activeProducts.length,
    inStockProducts: inStockProducts.length,
    outOfStockProducts: outOfStockProducts.length,
    averagePrice: Math.round(averagePrice * 100) / 100,
    totalValue: Math.round(totalValue * 100) / 100,
  };
}
