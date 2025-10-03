/**
 * Unified Adapters Index
 *
 * Point d'entrée unifié pour tous les adaptateurs
 * - Interface commune pour WordPress et Supabase
 * - Types normalisés partagés
 * - Utilitaires unifiés
 */

// ===== TYPES UNIFIÉS =====

export interface UnifiedUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UnifiedProduct {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: Array<{
    id: string;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  stockQuantity?: number;
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Métadonnées de source
  source: 'wordpress' | 'supabase';
  sourceId: string | number;
}

export interface UnifiedOrder {
  id: string;
  userId: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    productId: string | number;
    quantity: number;
    price: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
  source: 'wordpress' | 'supabase';
}

// ===== ADAPTATEURS =====

export { WordPressAdapter, WordPressUtils } from './wordpress-adapter';
export { SupabaseAdapter, SupabaseUtils } from './supabase-adapter';

// ===== ADAPTATEUR UNIFIÉ =====

export class UnifiedAdapter {
  /**
   * Convertit un produit WordPress vers le format unifié
   */
  static fromWordPressProduct(wpProduct: unknown): UnifiedProduct {
    const adapted = WordPressAdapter.adaptProduct(wpProduct);

    return {
      id: adapted.id,
      name: adapted.name,
      slug: adapted.slug,
      description: adapted.description,
      price: adapted.price,
      images: adapted.images,
      categories: adapted.categories,
      stockQuantity: adapted.stockQuantity,
      stockStatus: adapted.stockStatus,
      isActive: adapted.status === 'publish',
      createdAt: adapted.dateCreated,
      updatedAt: adapted.dateModified,
      source: 'wordpress',
      sourceId: adapted.id,
    };
  }

  /**
   * Convertit un produit Supabase vers le format unifié
   */
  static fromSupabaseProduct(sbProduct: unknown): UnifiedProduct {
    const adapted = SupabaseAdapter.adaptProduct(sbProduct);

    return {
      id: adapted.id,
      name: adapted.name,
      slug: adapted.slug,
      description: adapted.description,
      price: adapted.price,
      images: adapted.images,
      categories: adapted.categories,
      stockQuantity: adapted.stockQuantity,
      stockStatus: adapted.stockStatus,
      isActive: adapted.isActive,
      createdAt: adapted.createdAt,
      updatedAt: adapted.updatedAt,
      source: 'supabase',
      sourceId: adapted.id,
    };
  }

  /**
   * Convertit un utilisateur Supabase vers le format unifié
   */
  static fromSupabaseUser(sbUser: unknown): UnifiedUser {
    return SupabaseAdapter.adaptUser(sbUser);
  }

  /**
   * Convertit une commande Supabase vers le format unifié
   */
  static fromSupabaseOrder(sbOrder: unknown): UnifiedOrder {
    const adapted = SupabaseAdapter.adaptOrder(sbOrder);

    return {
      ...adapted,
      source: 'supabase',
    };
  }
}

// ===== UTILITAIRES UNIFIÉS =====

export const UnifiedUtils = {
  /**
   * Formate un prix pour l'affichage
   */
  formatPrice: (price: number, currency = '€'): string => {
    return `${price.toFixed(2)}${currency}`;
  },

  /**
   * Vérifie si un produit est en stock
   */
  isInStock: (product: UnifiedProduct): boolean => {
    return product.stockStatus === 'instock';
  },

  /**
   * Calcule le prix final (avec remises, etc.)
   */
  getFinalPrice: (product: UnifiedProduct): number => {
    return product.price; // Peut être étendu pour gérer les remises
  },

  /**
   * Filtre les produits par source
   */
  filterBySource: (products: UnifiedProduct[], source: 'wordpress' | 'supabase'): UnifiedProduct[] => {
    return products.filter((product) => product.source === source);
  },

  /**
   * Filtre les produits actifs
   */
  filterActiveProducts: (products: UnifiedProduct[]): UnifiedProduct[] => {
    return products.filter((product) => product.isActive);
  },

  /**
   * Filtre les produits en stock
   */
  filterInStockProducts: (products: UnifiedProduct[]): UnifiedProduct[] => {
    return products.filter((product) => this.isInStock(product));
  },

  /**
   * Filtre les produits par catégorie
   */
  filterByCategory: (products: UnifiedProduct[], categorySlug: string): UnifiedProduct[] => {
    return products.filter((product) => product.categories.some((cat) => cat.slug === categorySlug));
  },

  /**
   * Recherche dans les produits
   */
  searchProducts: (products: UnifiedProduct[], query: string): UnifiedProduct[] => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.categories.some((cat) => cat.name.toLowerCase().includes(lowercaseQuery)),
    );
  },

  /**
   * Trie les produits par prix
   */
  sortByPrice: (products: UnifiedProduct[], ascending = true): UnifiedProduct[] => {
    return [...products].sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
  },

  /**
   * Trie les produits par nom
   */
  sortByName: (products: UnifiedProduct[], ascending = true): UnifiedProduct[] => {
    return [...products].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return ascending ? comparison : -comparison;
    });
  },

  /**
   * Génère un SKU unifié
   */
  generateSKU: (product: UnifiedProduct): string => {
    const prefix = product.source === 'wordpress' ? 'WP' : 'SB';
    return `${prefix}-${product.sourceId}`;
  },

  /**
   * Valide qu'un produit est complet
   */
  isValidProduct: (product: UnifiedProduct): boolean => {
    return !!(product.id && product.name && product.slug && product.price >= 0 && product.images.length > 0);
  },
};
