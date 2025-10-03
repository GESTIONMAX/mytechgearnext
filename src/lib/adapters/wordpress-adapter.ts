/**
 * WordPress Data Adapter
 *
 * Couche d'adaptation pour normaliser les données WordPress
 * - Conversion snake_case → camelCase
 * - Validation et parsing des types
 * - Interface unifiée pour le frontend
 */

import { z } from 'zod';

// ===== SCHEMAS DE VALIDATION =====

const WordPressImageSchema = z.object({
  id: z.number(),
  src: z.string().url(),
  name: z.string(),
  alt: z.string(),
});

const WordPressCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

const WordPressAttributeSchema = z.object({
  id: z.number(),
  name: z.string(),
  options: z.array(z.string()),
});

const WordPressProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  short_description: z.string(),
  price: z.string().transform((val) => parseFloat(val) || 0),
  regular_price: z.string().transform((val) => parseFloat(val) || 0),
  sale_price: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  images: z.array(WordPressImageSchema),
  categories: z.array(WordPressCategorySchema),
  stock_quantity: z.number().optional(),
  stock_status: z.enum(['instock', 'outofstock', 'onbackorder']),
  attributes: z.array(WordPressAttributeSchema),
  type: z.enum(['simple', 'variable', 'grouped', 'external']),
  status: z.enum(['draft', 'pending', 'private', 'publish']),
  sku: z.string().optional(),
  date_created: z.string().transform((val) => new Date(val)),
  date_modified: z.string().transform((val) => new Date(val)),
});

const WordPressVariationSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  price: z.string().transform((val) => parseFloat(val) || 0),
  regular_price: z.string().transform((val) => parseFloat(val) || 0),
  sale_price: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  stock_quantity: z.number().optional(),
  stock_status: z.enum(['instock', 'outofstock', 'onbackorder']),
  attributes: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      option: z.string(),
    }),
  ),
  sku: z.string().optional(),
  image: WordPressImageSchema.optional(),
});

// ===== TYPES NORMALISÉS =====

export interface NormalizedImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface NormalizedCategory {
  id: number;
  name: string;
  slug: string;
}

export interface NormalizedAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface NormalizedProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  regularPrice: number;
  salePrice?: number;
  images: NormalizedImage[];
  categories: NormalizedCategory[];
  stockQuantity?: number;
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
  attributes: NormalizedAttribute[];
  type: 'simple' | 'variable' | 'grouped' | 'external';
  status: 'draft' | 'pending' | 'private' | 'publish';
  sku?: string;
  dateCreated: Date;
  dateModified: Date;
}

export interface NormalizedVariation {
  id: number;
  productId: number;
  price: number;
  regularPrice: number;
  salePrice?: number;
  stockQuantity?: number;
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
  attributes: Array<{
    id: number;
    name: string;
    option: string;
  }>;
  sku?: string;
  image?: NormalizedImage;
}

// ===== ADAPTATEURS =====

export class WordPressAdapter {
  /**
   * Adapte un produit WordPress vers le format normalisé
   */
  static adaptProduct(wpProduct: unknown): NormalizedProduct {
    const validated = WordPressProductSchema.parse(wpProduct);

    return {
      id: validated.id,
      name: validated.name,
      slug: validated.slug,
      description: validated.description,
      shortDescription: validated.short_description,
      price: validated.price,
      regularPrice: validated.regular_price,
      salePrice: validated.sale_price,
      images: validated.images.map((img) => ({
        id: img.id,
        src: img.src,
        name: img.name,
        alt: img.alt,
      })),
      categories: validated.categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })),
      stockQuantity: validated.stock_quantity,
      stockStatus: validated.stock_status,
      attributes: validated.attributes.map((attr) => ({
        id: attr.id,
        name: attr.name,
        options: attr.options,
      })),
      type: validated.type,
      status: validated.status,
      sku: validated.sku,
      dateCreated: validated.date_created,
      dateModified: validated.date_modified,
    };
  }

  /**
   * Adapte une variante WordPress vers le format normalisé
   */
  static adaptVariation(wpVariation: unknown): NormalizedVariation {
    const validated = WordPressVariationSchema.parse(wpVariation);

    return {
      id: validated.id,
      productId: validated.product_id,
      price: validated.price,
      regularPrice: validated.regular_price,
      salePrice: validated.sale_price,
      stockQuantity: validated.stock_quantity,
      stockStatus: validated.stock_status,
      attributes: validated.attributes.map((attr) => ({
        id: attr.id,
        name: attr.name,
        option: attr.option,
      })),
      sku: validated.sku,
      image: validated.image
        ? {
            id: validated.image.id,
            src: validated.image.src,
            name: validated.image.name,
            alt: validated.image.alt,
          }
        : undefined,
    };
  }

  /**
   * Adapte un tableau de produits
   */
  static adaptProducts(wpProducts: unknown[]): NormalizedProduct[] {
    return wpProducts.map((product) => this.adaptProduct(product));
  }

  /**
   * Adapte un tableau de variantes
   */
  static adaptVariations(wpVariations: unknown[]): NormalizedVariation[] {
    return wpVariations.map((variation) => this.adaptVariation(variation));
  }

  /**
   * Génère un SKU normalisé pour une variante
   */
  static generateSKU(product: NormalizedProduct, variation?: NormalizedVariation): string {
    const baseSKU = product.sku || `PROD-${product.id}`;

    if (!variation) return baseSKU;

    const attributes = variation.attributes.map((attr) => attr.option.substring(0, 3).toUpperCase()).join('-');

    return `${baseSKU}-${attributes}`;
  }

  /**
   * Trouve une variante par ses attributs
   */
  static findVariationByAttributes(
    variations: NormalizedVariation[],
    attributes: Record<string, string>,
  ): NormalizedVariation | undefined {
    return variations.find((variation) => {
      return Object.entries(attributes).every(([key, value]) => {
        const attr = variation.attributes.find((a) => a.name === key);
        return attr && attr.option === value;
      });
    });
  }
}

// ===== UTILITAIRES =====

export const WordPressUtils = {
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
   * Calcule le prix final (sale_price ou price)
   */
  getFinalPrice: (product: NormalizedProduct): number => {
    return product.salePrice || product.price;
  },

  /**
   * Filtre les produits par catégorie
   */
  filterByCategory: (products: NormalizedProduct[], categorySlug: string): NormalizedProduct[] => {
    return products.filter((product) => product.categories.some((cat) => cat.slug === categorySlug));
  },

  /**
   * Filtre les produits par statut de stock
   */
  filterByStockStatus: (
    products: NormalizedProduct[],
    status: 'instock' | 'outofstock' | 'onbackorder',
  ): NormalizedProduct[] => {
    return products.filter((product) => product.stockStatus === status);
  },
};
