/**
 * WordPress Service
 *
 * Service unifié pour interagir avec WordPress/WooCommerce
 * Utilise l'adaptateur pour normaliser les données
 */

import { WordPressAdapter, type NormalizedProduct, type NormalizedVariation } from '@/lib/adapters/wordpress-adapter';

const WORDPRESS_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com';
const WC_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
  throw new Error('WooCommerce API credentials not configured');
}

const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

export class WordPressService {
  private static async makeRequest<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/${endpoint}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Récupère tous les produits normalisés
   */
  static async getProducts(): Promise<NormalizedProduct[]> {
    try {
      const wpProducts = await this.makeRequest<unknown[]>('products?per_page=100&status=publish');
      return WordPressAdapter.adaptProducts(wpProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  /**
   * Récupère un produit par ID
   */
  static async getProductById(id: number): Promise<NormalizedProduct | null> {
    try {
      const wpProduct = await this.makeRequest<unknown>(`products/${id}`);
      return WordPressAdapter.adaptProduct(wpProduct);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  }

  /**
   * Récupère un produit par slug
   */
  static async getProductBySlug(slug: string): Promise<NormalizedProduct | null> {
    try {
      const wpProducts = await this.makeRequest<unknown[]>(`products?slug=${slug}`);
      if (wpProducts.length === 0) return null;
      return WordPressAdapter.adaptProduct(wpProducts[0]);
    } catch (error) {
      console.error(`Error fetching product ${slug}:`, error);
      return null;
    }
  }

  /**
   * Récupère les variantes d'un produit
   */
  static async getProductVariations(productId: number): Promise<NormalizedVariation[]> {
    try {
      const wpVariations = await this.makeRequest<unknown[]>(`products/${productId}/variations`);
      return WordPressAdapter.adaptVariations(wpVariations);
    } catch (error) {
      console.error(`Error fetching variations for product ${productId}:`, error);
      return [];
    }
  }

  /**
   * Récupère les catégories
   */
  static async getCategories() {
    try {
      return await this.makeRequest('products/categories?per_page=100');
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  /**
   * Récupère les attributs
   */
  static async getAttributes() {
    try {
      return await this.makeRequest('products/attributes?per_page=100');
    } catch (error) {
      console.error('Error fetching attributes:', error);
      return [];
    }
  }

  /**
   * Recherche des produits
   */
  static async searchProducts(query: string): Promise<NormalizedProduct[]> {
    try {
      const wpProducts = await this.makeRequest<unknown[]>(`products?search=${encodeURIComponent(query)}&per_page=100`);
      return WordPressAdapter.adaptProducts(wpProducts);
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }

  /**
   * Filtre les produits par catégorie
   */
  static async getProductsByCategory(categorySlug: string): Promise<NormalizedProduct[]> {
    try {
      const wpProducts = await WordPressService.makeRequest<unknown[]>(
        `products?category=${categorySlug}&per_page=100`,
      );
      return WordPressAdapter.adaptProducts(wpProducts);
    } catch (error) {
      console.error(`Error fetching products for category ${categorySlug}:`, error);
      return [];
    }
  }
}

// ===== HOOKS PERSONNALISÉS =====

import { useQuery } from '@tanstack/react-query';

export function useWordPressProducts() {
  return useQuery({
    queryKey: ['wordpress-products'],
    queryFn: WordPressService.getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useWordPressProduct(id: number) {
  return useQuery({
    queryKey: ['wordpress-product', id],
    queryFn: () => WordPressService.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useWordPressProductBySlug(slug: string) {
  return useQuery({
    queryKey: ['wordpress-product', slug],
    queryFn: () => WordPressService.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useWordPressProductVariations(productId: number) {
  return useQuery({
    queryKey: ['wordpress-variations', productId],
    queryFn: () => WordPressService.getProductVariations(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useWordPressSearch(query: string) {
  return useQuery({
    queryKey: ['wordpress-search', query],
    queryFn: () => WordPressService.searchProducts(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
