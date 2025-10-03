'use client';

import { useState, useEffect, useCallback } from 'react';
import type { WordPressProductVariant } from '@/hooks/useWordPressProducts';

interface UseWordPressProductVariationsResult {
  variations: WordPressProductVariant[];
  isLoading: boolean;
  error: string | null;
  getVariationsForProduct: (productId: number) => Promise<WordPressProductVariant[]>;
}

export const useWordPressProductVariations = (): UseWordPressProductVariationsResult => {
  const [variations, setVariations] = useState<WordPressProductVariant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const WORDPRESS_URL =
    process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com';
  const WC_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
  const WC_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

  const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

  const getVariationsForProduct = useCallback(
    async (productId: number): Promise<WordPressProductVariant[]> => {
      setIsLoading(true);
      setError(null);

      try {
        if (!WORDPRESS_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
          throw new Error('WordPress API credentials are not configured.');
        }

        const response = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products/${productId}/variations?per_page=100`, {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch variations for product ${productId}: ${response.statusText}`);
        }

        const variationsData: WordPressProductVariant[] = await response.json();
        setVariations(variationsData);
        return variationsData;
      } catch (err: any) {
        setError(err.message);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [WORDPRESS_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET, auth],
  );

  return {
    variations,
    isLoading,
    error,
    getVariationsForProduct,
  };
};
