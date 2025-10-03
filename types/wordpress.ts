import { z } from 'zod';

// Schemas de validation Zod
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  price: z.number(),
  salePrice: z.number().optional(),
  stockStatus: z.enum(['IN_STOCK', 'OUT_OF_STOCK', 'ON_BACKORDER']),
  stockQuantity: z.number().optional(),
  image: z
    .object({
      sourceUrl: z.string(),
      altText: z.string().optional(),
    })
    .optional(),
  galleryImages: z
    .array(
      z.object({
        sourceUrl: z.string(),
        altText: z.string().optional(),
      }),
    )
    .optional(),
  categories: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
      }),
    )
    .optional(),
  attributes: z
    .array(
      z.object({
        name: z.string(),
        options: z.array(z.string()),
      }),
    )
    .optional(),
});

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  image: z
    .object({
      sourceUrl: z.string(),
      altText: z.string().optional(),
    })
    .optional(),
});

export const CartItemSchema = z.object({
  key: z.string(),
  product: z.object({
    node: z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      image: z
        .object({
          sourceUrl: z.string(),
          altText: z.string().optional(),
        })
        .optional(),
    }),
  }),
  quantity: z.number(),
  total: z.string(),
  subtotal: z.string(),
});

export const CartSchema = z.object({
  contents: z.object({
    nodes: z.array(CartItemSchema),
  }),
  total: z.string(),
  subtotal: z.string(),
  needsShippingAddress: z.boolean(),
  availableShippingMethods: z
    .array(
      z.object({
        packageDetails: z.string(),
        rates: z.array(
          z.object({
            id: z.string(),
            label: z.string(),
            cost: z.string(),
          }),
        ),
      }),
    )
    .optional(),
});

// Types TypeScript générés depuis les schemas
export type Product = z.infer<typeof ProductSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;

// Types pour les réponses GraphQL
export interface ProductsResponse {
  products: {
    nodes: Product[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface ProductResponse {
  product: Product;
}

export interface CategoriesResponse {
  productCategories: {
    nodes: Category[];
  };
}

export interface CartResponse {
  cart: Cart;
}
