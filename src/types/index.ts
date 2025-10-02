import type React from 'react';

// MyTechGear.eu Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  categorySlug?: string; // for robust filtering by slug
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  variants?: ProductVariant[];
  features?: string[];
  specifications?: Record<string, string>;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string; // Stock Keeping Unit - identifiant unique pour la variante
  price: number;
  salePrice?: number;
  inStock: boolean;
  attributes: Record<string, string>; // e.g., { color: "blue", size: "M" }
  images?: string[]; // Images spécifiques à cette variante
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  variantId?: string;
  variant?: ProductVariant;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  tags: string[];
  category: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'staff';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  children?: Category[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
}

// Search and Filter Types
export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  tags?: string[];
  search?: string;
}

export interface SortOption {
  field: 'name' | 'price' | 'createdAt' | 'popularity';
  direction: 'asc' | 'desc';
}

// React Types
export type ReactNode = React.ReactNode;
