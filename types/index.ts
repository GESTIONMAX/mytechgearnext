// Export des types WordPress
export * from './wordpress';

// Export des types Supabase
export * from './supabase';

// Types communs
export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface SearchParams {
  query?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
}

// Types pour les composants
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps extends BaseComponentProps {
  isLoading: boolean;
  loadingText?: string;
}

export interface ErrorProps extends BaseComponentProps {
  error: string;
  onRetry?: () => void;
}
