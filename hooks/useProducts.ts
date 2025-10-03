import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@/lib/wordpress/queries/products';
import type { ProductsResponse } from '@/types/wordpress';

interface UseProductsOptions {
  first?: number;
  after?: string;
  search?: string;
  categoryId?: string;
  enabled?: boolean;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { data, loading, error, fetchMore, refetch } = useQuery<ProductsResponse>(GET_PRODUCTS, {
    variables: {
      first: options.first || 12,
      after: options.after,
      search: options.search,
      categoryId: options.categoryId,
    },
    notifyOnNetworkStatusChange: true,
    skip: options.enabled === false,
    errorPolicy: 'all',
  });

  const products = data?.products?.nodes || [];
  const pageInfo = data?.products?.pageInfo;

  const loadMore = () => {
    if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
      });
    }
  };

  return {
    products,
    loading,
    error,
    hasNextPage: pageInfo?.hasNextPage || false,
    loadMore,
    refetch,
  };
}
