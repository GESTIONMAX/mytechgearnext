import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type Category = Database['public']['Tables']['categories']['Row'];
type CategoryImage = Database['public']['Tables']['category_images']['Row'];

export interface CategoryWithDetails extends Category {
  images: CategoryImage[];
  productCount?: number;
}

export class CategoryService {
  private supabase = createClient();

  /**
   * Récupère toutes les catégories actives
   */
  async getCategories(): Promise<CategoryWithDetails[]> {
    const { data, error } = await this.supabase
      .from('categories')
      .select(`
        *,
        images:category_images(*)
      `)
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }

    return data || [];
  }

  /**
   * Récupère une catégorie par son slug
   */
  async getCategoryBySlug(slug: string): Promise<CategoryWithDetails | null> {
    const { data, error } = await this.supabase
      .from('categories')
      .select(`
        *,
        images:category_images(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching category by slug:', error);
      return null;
    }

    return data;
  }

  /**
   * Récupère les catégories principales (sans parent)
   */
  async getMainCategories(): Promise<CategoryWithDetails[]> {
    const { data, error } = await this.supabase
      .from('categories')
      .select(`
        *,
        images:category_images(*)
      `)
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching main categories:', error);
      throw new Error('Failed to fetch main categories');
    }

    return data || [];
  }

  /**
   * Récupère le nombre de produits par catégorie
   */
  async getCategoryProductCount(categoryId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', categoryId)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching category product count:', error);
      return 0;
    }

    return count || 0;
  }

  /**
   * Récupère les catégories avec le nombre de produits
   */
  async getCategoriesWithProductCount(): Promise<CategoryWithDetails[]> {
    const categories = await this.getCategories();
    
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await this.getCategoryProductCount(category.id);
        return {
          ...category,
          productCount
        };
      })
    );

    return categoriesWithCount;
  }
}

export const categoryService = new CategoryService();
