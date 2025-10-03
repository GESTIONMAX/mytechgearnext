/**
 * Supabase Data Adapter
 *
 * Adaptateur pour normaliser les données Supabase
 * - Conversion vers format unifié
 * - Validation et parsing des types
 * - Interface cohérente avec WordPress
 */

import { z } from 'zod';

// ===== SCHEMAS DE VALIDATION SUPABASE =====

const SupabaseUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().optional(),
  avatar_url: z.string().url().optional(),
  created_at: z.string().transform((val) => new Date(val)),
  updated_at: z.string().transform((val) => new Date(val)),
});

const SupabaseProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number(),
  image_url: z.string().url().optional(),
  category: z.string(),
  stock_quantity: z.number().optional(),
  is_active: z.boolean(),
  created_at: z.string().transform((val) => new Date(val)),
  updated_at: z.string().transform((val) => new Date(val)),
});

const SupabaseOrderSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  total_amount: z.number(),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  items: z.array(
    z.object({
      product_id: z.number(),
      quantity: z.number(),
      price: z.number(),
    }),
  ),
  created_at: z.string().transform((val) => new Date(val)),
  updated_at: z.string().transform((val) => new Date(val)),
});

// ===== TYPES NORMALISÉS UNIFIÉS =====

export interface NormalizedUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NormalizedProduct {
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
}

export interface NormalizedOrder {
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
}

// ===== ADAPTATEUR SUPABASE =====

export class SupabaseAdapter {
  /**
   * Adapte un utilisateur Supabase vers le format normalisé
   */
  static adaptUser(supabaseUser: unknown): NormalizedUser {
    const validated = SupabaseUserSchema.parse(supabaseUser);

    return {
      id: validated.id,
      email: validated.email,
      name: validated.full_name,
      avatar: validated.avatar_url,
      createdAt: validated.created_at,
      updatedAt: validated.updated_at,
    };
  }

  /**
   * Adapte un produit Supabase vers le format normalisé
   */
  static adaptProduct(supabaseProduct: unknown): NormalizedProduct {
    const validated = SupabaseProductSchema.parse(supabaseProduct);

    return {
      id: validated.id,
      name: validated.name,
      slug: validated.slug,
      description: validated.description,
      price: validated.price,
      images: validated.image_url
        ? [
            {
              id: `img-${validated.id}`,
              src: validated.image_url,
              alt: validated.name,
            },
          ]
        : [],
      categories: [
        {
          id: validated.category,
          name: validated.category,
          slug: validated.category.toLowerCase().replace(/\s+/g, '-'),
        },
      ],
      stockQuantity: validated.stock_quantity,
      stockStatus: validated.stock_quantity && validated.stock_quantity > 0 ? 'instock' : 'outofstock',
      isActive: validated.is_active,
      createdAt: validated.created_at,
      updatedAt: validated.updated_at,
    };
  }

  /**
   * Adapte une commande Supabase vers le format normalisé
   */
  static adaptOrder(supabaseOrder: unknown): NormalizedOrder {
    const validated = SupabaseOrderSchema.parse(supabaseOrder);

    return {
      id: validated.id,
      userId: validated.user_id,
      totalAmount: validated.total_amount,
      status: validated.status,
      items: validated.items.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
      createdAt: validated.created_at,
      updatedAt: validated.updated_at,
    };
  }

  /**
   * Adapte un tableau d'utilisateurs
   */
  static adaptUsers(supabaseUsers: unknown[]): NormalizedUser[] {
    return supabaseUsers.map((user) => this.adaptUser(user));
  }

  /**
   * Adapte un tableau de produits
   */
  static adaptProducts(supabaseProducts: unknown[]): NormalizedProduct[] {
    return supabaseProducts.map((product) => this.adaptProduct(product));
  }

  /**
   * Adapte un tableau de commandes
   */
  static adaptOrders(supabaseOrders: unknown[]): NormalizedOrder[] {
    return supabaseOrders.map((order) => this.adaptOrder(order));
  }
}

// ===== UTILITAIRES SUPABASE =====

export const SupabaseUtils = {
  /**
   * Formate un prix pour l'affichage
   */
  formatPrice: (price: number, currency = '€'): string => {
    return `${price.toFixed(2)}${currency}`;
  },

  /**
   * Vérifie si un produit est en stock
   */
  isInStock: (product: NormalizedProduct): boolean => {
    return product.stockStatus === 'instock';
  },

  /**
   * Filtre les produits actifs
   */
  filterActiveProducts: (products: NormalizedProduct[]): NormalizedProduct[] => {
    return products.filter((product) => product.isActive);
  },

  /**
   * Filtre les commandes par statut
   */
  filterOrdersByStatus: (orders: NormalizedOrder[], status: NormalizedOrder['status']): NormalizedOrder[] => {
    return orders.filter((order) => order.status === status);
  },

  /**
   * Calcule le total d'une commande
   */
  calculateOrderTotal: (order: NormalizedOrder): number => {
    return order.items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
};
