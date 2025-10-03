import { useState, useEffect } from 'react';

interface WordPressProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price?: string;
  images: Array<{
    id: number;
    src: string;
    name: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  stock_quantity?: number;
  stock_status: string;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
  variations?: Array<{
    id: number;
    attributes: Array<{
      id: number;
      name: string;
      option: string;
    }>;
    price: string;
    regular_price: string;
    sale_price?: string;
    stock_quantity?: number;
    stock_status: string;
    image?: {
      id: number;
      src: string;
    };
  }>;
}

interface UseWordPressProductsReturn {
  products: WordPressProduct[];
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useWordPressProducts = (): UseWordPressProductsReturn => {
  const [products, setProducts] = useState<WordPressProduct[]>([]);
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Configuration WordPress
      const WORDPRESS_URL =
        process.env.NEXT_PUBLIC_WORDPRESS_URL ||
        'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com';
      const WC_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
      const WC_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

      if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
        throw new Error('Clés WooCommerce manquantes');
      }

      const auth = btoa(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`);

      // Récupérer les produits
      const productsResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products?per_page=100`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      });

      if (!productsResponse.ok) {
        throw new Error(`Erreur produits: ${productsResponse.status}`);
      }

      const productsData = await productsResponse.json();
      setProducts(productsData);

      // Récupérer les catégories
      const categoriesResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products/categories`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      });

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue lors de la récupération des produits';
      setError(errorMessage);
      console.error('Erreur récupération produits WordPress:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = (): void => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    categories,
    isLoading,
    error,
    refetch,
  };
};

// Hook pour un produit spécifique
export const useWordPressProduct = (productId: string) => {
  const [product, setProduct] = useState<WordPressProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const WORDPRESS_URL =
        process.env.NEXT_PUBLIC_WORDPRESS_URL ||
        'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com';
      const WC_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
      const WC_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

      if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
        throw new Error('Clés WooCommerce manquantes');
      }

      const auth = btoa(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`);

      const response = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products/${productId}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur produit: ${response.status}`);
      }

      const productData = await response.json();
      setProduct(productData);
    } catch (err: any) {
      setError(err.message);
      console.error('Erreur récupération produit WordPress:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return {
    product,
    isLoading,
    error,
    refetch: fetchProduct,
  };
};
