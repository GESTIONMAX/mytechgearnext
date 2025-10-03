/**
 * Unified API Layer
 *
 * Façade unifiée pour tous les services
 * - Interface commune WordPress + Supabase
 * - Abstraction des sources de données
 * - API frontend agnostique
 */

import type { UnifiedProduct } from '@/lib/adapters';
import { UnifiedAdapter, UnifiedUtils } from '@/lib/adapters';
import { WordPressService } from '@/services/wordpress-service';

// ===== TYPES D'API =====

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  source: 'wordpress' | 'supabase' | 'mixed';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
  error?: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  source?: 'wordpress' | 'supabase' | 'all';
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// ===== API UNIFIÉE =====

export class UnifiedAPI {
  /**
   * Récupère tous les produits (WordPress + Supabase)
   */
  static async getProducts(filters?: SearchFilters): Promise<ApiResponse<UnifiedProduct[]>> {
    try {
      // Récupérer les produits WordPress
      const wpProducts = await WordPressService.getProducts();
      const unifiedWpProducts = wpProducts.map((p) => UnifiedAdapter.fromWordPressProduct(p));

      // TODO: Récupérer les produits Supabase
      // const sbProducts = await SupabaseService.getProducts();
      // const unifiedSbProducts = sbProducts.map(p => UnifiedAdapter.fromSupabaseProduct(p));

      let allProducts = [...unifiedWpProducts];

      // Appliquer les filtres
      if (filters) {
        allProducts = this.applyFilters(allProducts, filters);
      }

      return {
        data: allProducts,
        success: true,
        source: 'wordpress', // 'mixed' quand Supabase sera ajouté
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'wordpress',
      };
    }
  }

  /**
   * Récupère un produit par ID
   */
  static async getProductById(id: string | number): Promise<ApiResponse<UnifiedProduct | null>> {
    try {
      // Essayer WordPress d'abord
      const wpProduct = await WordPressService.getProductById(Number(id));
      if (wpProduct) {
        return {
          data: UnifiedAdapter.fromWordPressProduct(wpProduct),
          success: true,
          source: 'wordpress',
        };
      }

      // TODO: Essayer Supabase
      // const sbProduct = await SupabaseService.getProductById(id);
      // if (sbProduct) {
      //   return {
      //     data: UnifiedAdapter.fromSupabaseProduct(sbProduct),
      //     success: true,
      //     source: 'supabase',
      //   };
      // }

      return {
        data: null,
        success: true,
        source: 'wordpress',
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'wordpress',
      };
    }
  }

  /**
   * Récupère un produit par slug
   */
  static async getProductBySlug(slug: string): Promise<ApiResponse<UnifiedProduct | null>> {
    try {
      const wpProduct = await WordPressService.getProductBySlug(slug);
      if (wpProduct) {
        return {
          data: UnifiedAdapter.fromWordPressProduct(wpProduct),
          success: true,
          source: 'wordpress',
        };
      }

      return {
        data: null,
        success: true,
        source: 'wordpress',
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'wordpress',
      };
    }
  }

  /**
   * Recherche des produits
   */
  static async searchProducts(
    query: string,
    filters?: Omit<SearchFilters, 'query'>,
  ): Promise<ApiResponse<UnifiedProduct[]>> {
    try {
      const wpProducts = await WordPressService.searchProducts(query);
      const unifiedProducts = wpProducts.map((p) => UnifiedAdapter.fromWordPressProduct(p));

      const searchFilters: SearchFilters = { ...filters, query };
      const filteredProducts = this.applyFilters(unifiedProducts, searchFilters);

      return {
        data: filteredProducts,
        success: true,
        source: 'wordpress',
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'wordpress',
      };
    }
  }

  /**
   * Récupère les produits par catégorie
   */
  static async getProductsByCategory(categorySlug: string): Promise<ApiResponse<UnifiedProduct[]>> {
    try {
      const wpProducts = await WordPressService.getProductsByCategory(categorySlug);
      const unifiedProducts = wpProducts.map((p) => UnifiedAdapter.fromWordPressProduct(p));

      return {
        data: unifiedProducts,
        success: true,
        source: 'wordpress',
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'wordpress',
      };
    }
  }

  /**
   * Applique les filtres aux produits
   */
  private static applyFilters(products: UnifiedProduct[], filters: SearchFilters): UnifiedProduct[] {
    let filtered = [...products];

    // Filtre par source
    if (filters.source && filters.source !== 'all') {
      filtered = UnifiedUtils.filterBySource(filtered, filters.source);
    }

    // Filtre par catégorie
    if (filters.category) {
      filtered = UnifiedUtils.filterByCategory(filtered, filters.category);
    }

    // Filtre par prix
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // Filtre par stock
    if (filters.inStock !== undefined) {
      if (filters.inStock) {
        filtered = UnifiedUtils.filterInStockProducts(filtered);
      } else {
        filtered = filtered.filter((p) => !UnifiedUtils.isInStock(p));
      }
    }

    // Recherche textuelle
    if (filters.query) {
      filtered = UnifiedUtils.searchProducts(filtered, filters.query);
    }

    // Tri
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'name':
          filtered = UnifiedUtils.sortByName(filtered, filters.sortOrder === 'asc');
          break;
        case 'price':
          filtered = UnifiedUtils.sortByPrice(filtered, filters.sortOrder === 'asc');
          break;
        case 'createdAt':
          filtered = filtered.sort((a, b) => {
            const comparison = a.createdAt.getTime() - b.createdAt.getTime();
            return filters.sortOrder === 'asc' ? comparison : -comparison;
          });
          break;
      }
    }

    return filtered;
  }

  /**
   * Récupère les catégories disponibles
   */
  static async getCategories(): Promise<ApiResponse<Array<{ id: string; name: string; slug: string }>>> {
    try {
      const wpCategories = await WordPressService.getCategories();
      const categories = (wpCategories as Array<{ id: number; name: string; slug: string }>).map((cat) => ({
        id: cat.id.toString(),
        name: cat.name,
        slug: cat.slug,
      }));

      return {
        data: categories,
        success: true,
        source: 'wordpress',
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'wordpress',
      };
    }
  }

  /**
   * Valide un produit
   */
  static validateProduct(product: UnifiedProduct): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!UnifiedUtils.isValidProduct(product)) {
      errors.push('Product is missing required fields');
    }

    if (product.price < 0) {
      errors.push('Price cannot be negative');
    }

    if (product.images.length === 0) {
      errors.push('Product must have at least one image');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
