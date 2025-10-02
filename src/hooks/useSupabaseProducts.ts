import { useQuery } from '@tanstack/react-query';
import { productService, type ProductFilters } from '@/services/productService';
import { categoryService } from '@/services/categoryService';

/**
 * Hook pour récupérer tous les produits avec filtres
 */
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook pour récupérer un produit par son slug
 */
export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook pour récupérer les produits par catégorie
 */
export const useProductsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug],
    queryFn: () => productService.getProductsByCategory(categorySlug),
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook pour récupérer les produits en vedette
 */
export const useFeaturedProducts = (limit: number = 8) => {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: () => productService.getFeaturedProducts(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook pour récupérer les produits en promotion
 */
export const useSaleProducts = (limit: number = 8) => {
  return useQuery({
    queryKey: ['products', 'sale', limit],
    queryFn: () => productService.getSaleProducts(limit),
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Hook pour rechercher des produits
 */
export const useSearchProducts = (searchTerm: string, limit: number = 20) => {
  return useQuery({
    queryKey: ['products', 'search', searchTerm, limit],
    queryFn: () => productService.searchProducts(searchTerm, limit),
    enabled: !!searchTerm && searchTerm.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook pour récupérer les produits similaires
 */
export const useSimilarProducts = (productId: string, categoryId: string, limit: number = 4) => {
  return useQuery({
    queryKey: ['products', 'similar', productId, categoryId, limit],
    queryFn: () => productService.getSimilarProducts(productId, categoryId, limit),
    enabled: !!productId && !!categoryId,
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Hook pour récupérer toutes les catégories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook pour récupérer une catégorie par son slug
 */
export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000,
  });
};

/**
 * Hook pour récupérer les catégories avec le nombre de produits
 */
export const useCategoriesWithProductCount = () => {
  return useQuery({
    queryKey: ['categories', 'with-count'],
    queryFn: () => categoryService.getCategoriesWithProductCount(),
    staleTime: 30 * 60 * 1000,
  });
};
