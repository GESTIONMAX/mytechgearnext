import { z } from 'zod';

// Schemas de validation Zod pour Supabase
export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().optional(),
  avatar_url: z.string().url().optional(),
  phone: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      postal_code: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const FavoriteSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  product_id: z.string(), // ID du produit WordPress
  product_slug: z.string(),
  product_name: z.string(),
  product_image: z.string().url().optional(),
  product_price: z.number(),
  created_at: z.string(),
});

export const ReviewSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  product_id: z.string(), // ID du produit WordPress
  product_slug: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(100),
  comment: z.string().min(1).max(1000),
  is_verified_purchase: z.boolean().default(false),
  helpful_count: z.number().default(0),
  created_at: z.string(),
  updated_at: z.string(),
});

export const NotificationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.enum(['order_update', 'price_drop', 'restock', 'review_request']),
  title: z.string(),
  message: z.string(),
  data: z.record(z.any()).optional(),
  read: z.boolean().default(false),
  created_at: z.string(),
});

// Types TypeScript générés depuis les schemas
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Favorite = z.infer<typeof FavoriteSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type Notification = z.infer<typeof NotificationSchema>;

// Types pour les réponses Supabase
export interface FavoritesResponse {
  data: Favorite[];
  count: number;
}

export interface ReviewsResponse {
  data: Review[];
  count: number;
}

export interface NotificationsResponse {
  data: Notification[];
  count: number;
}

// Types pour les mutations
export interface CreateFavoriteInput {
  product_id: string;
  product_slug: string;
  product_name: string;
  product_image?: string;
  product_price: number;
}

export interface CreateReviewInput {
  product_id: string;
  product_slug: string;
  rating: number;
  title: string;
  comment: string;
  is_verified_purchase?: boolean;
}

export interface UpdateProfileInput {
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  };
}
