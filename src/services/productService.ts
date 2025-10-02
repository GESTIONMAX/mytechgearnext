import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductVariant = Database['public']['Tables']['product_variants']['Row'];
type ProductImage = Database['public']['Tables']['product_images']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];

export interface ProductWithDetails extends Product {
  variants: ProductVariant[];
  images: ProductImage[];
  category?: Category;
}

export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  tags?: string[];
  search?: string;
  isActive?: boolean;
}

export class ProductService {
  private supabase = createClient();

  /**
   * Récupère tous les produits avec leurs détails
   */
  async getProducts(filters?: ProductFilters): Promise<ProductWithDetails[]> {
    let query = this.supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true);

    // Appliquer les filtres
    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters?.priceMin) {
      query = query.gte('price', filters.priceMin);
    }

    if (filters?.priceMax) {
      query = query.lte('price', filters.priceMax);
    }

    if (filters?.inStock !== undefined) {
      query = query.eq('in_stock', filters.inStock);
    }

    if (filters?.tags && filters.tags.length > 0) {
      query = query.overlaps('tags', filters.tags);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }

    return data || [];
  }

  /**
   * Récupère un produit par son slug
   */
  async getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        images:product_images(*),
        category:categories(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }

    return data;
  }

  /**
   * Récupère les produits par catégorie
   */
  async getProductsByCategory(categorySlug: string): Promise<ProductWithDetails[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true)
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }

    return data || [];
  }

  /**
   * Récupère les produits en vedette
   */
  async getFeaturedProducts(limit: number = 8): Promise<ProductWithDetails[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true)
      .eq('in_stock', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured products:', error);
      throw new Error('Failed to fetch featured products');
    }

    return data || [];
  }

  /**
   * Récupère les produits en promotion
   */
  async getSaleProducts(limit: number = 8): Promise<ProductWithDetails[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true)
      .not('sale_price', 'is', null)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching sale products:', error);
      throw new Error('Failed to fetch sale products');
    }

    return data || [];
  }

  /**
   * Recherche de produits
   */
  async searchProducts(searchTerm: string, limit: number = 20): Promise<ProductWithDetails[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true)
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }

    return data || [];
  }

  /**
   * Récupère les produits similaires
   */
  async getSimilarProducts(productId: string, categoryId: string, limit: number = 4): Promise<ProductWithDetails[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true)
      .eq('category_id', categoryId)
      .neq('id', productId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching similar products:', error);
      throw new Error('Failed to fetch similar products');
    }

    return data || [];
  }
}

export const productService = new ProductService();
