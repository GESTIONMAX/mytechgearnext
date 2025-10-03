import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ProductVariantWithDetails } from '@/types';

interface UseProductVariantsOptions {
  productId?: string;
  productSlug?: string;
}

interface UseProductVariantsReturn {
  variants: ProductVariantWithDetails[];
  isLoading: boolean;
  error: string | null;
  selectedVariant: ProductVariantWithDetails | null;
  setSelectedVariant: (variant: ProductVariantWithDetails) => void;
}

export const useProductVariants = ({ productId, productSlug }: UseProductVariantsOptions): UseProductVariantsReturn => {
  const [variants, setVariants] = useState<ProductVariantWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantWithDetails | null>(null);

  useEffect(() => {
    const fetchVariants = async (): Promise<void> => {
      if (!productId && !productSlug) return;

      setIsLoading(true);
      setError(null);

      try {
        const supabase = createClient();

        let query = supabase.from('product_variants').select(`
            *,
            images:variant_images(*)
          `);

        if (productId) {
          query = query.eq('product_id', productId);
        } else if (productSlug) {
          // D'abord récupérer l'ID du produit
          const { data: product, error: productError } = await supabase
            .from('products')
            .select('id')
            .eq('slug', productSlug)
            .single();

          if (productError) {
            throw new Error(`Produit non trouvé: ${productError.message}`);
          }

          query = query.eq('product_id', product.id);
        }

        const { data, error: variantsError } = await query;

        if (variantsError) {
          throw new Error(`Erreur lors du chargement des variantes: ${variantsError.message}`);
        }

        setVariants(data || []);

        // Sélectionner la première variante par défaut
        if (data && data.length > 0) {
          setSelectedVariant(data[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        console.error('Erreur lors du chargement des variantes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVariants();
  }, [productId, productSlug]);

  return {
    variants,
    isLoading,
    error,
    selectedVariant,
    setSelectedVariant,
  };
};
