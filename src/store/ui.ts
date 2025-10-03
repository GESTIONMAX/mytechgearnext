import { create } from 'zustand';

interface UIState {
  // Navigation
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;

  // Modals and overlays
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isQuickViewOpen: boolean;
  isFiltersOpen: boolean;

  // Loading states
  isLoading: boolean;
  loadingMessage?: string;

  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;

  // Theme and preferences
  theme: 'light' | 'dark' | 'system';
  language: string;

  // Product view preferences
  productViewMode: 'grid' | 'list';
  productsPerPage: number;
  sortBy: string;
}

interface UIActions {
  // Navigation actions
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;

  // Modal actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;

  openQuickView: () => void;
  closeQuickView: () => void;
  toggleQuickView: () => void;

  openFilters: () => void;
  closeFilters: () => void;
  toggleFilters: () => void;

  // Loading actions
  setLoading: (loading: boolean, message?: string) => void;

  // Notification actions
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Theme actions
  setTheme: (theme: UIState['theme']) => void;
  setLanguage: (language: string) => void;

  // Product view actions
  setProductViewMode: (mode: UIState['productViewMode']) => void;
  setProductsPerPage: (count: number) => void;
  setSortBy: (sort: string) => void;

  // Reset actions
  resetUI: () => void;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,
  isWishlistOpen: false,
  isQuickViewOpen: false,
  isFiltersOpen: false,
  isLoading: false,
  notifications: [],
  theme: 'system',
  language: 'fr',
  productViewMode: 'grid',
  productsPerPage: 12,
  sortBy: 'name',
};

export const useUIStore = create<UIState & UIActions>((set, get) => ({
  ...initialState,

  // Navigation actions
  toggleMobileMenu: (): void => {
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }));
  },

  closeMobileMenu: (): void => {
    set({ isMobileMenuOpen: false });
  },

  toggleSearch: (): void => {
    set((state) => ({ isSearchOpen: !state.isSearchOpen }));
  },

  closeSearch: (): void => {
    set({ isSearchOpen: false });
  },

  // Modal actions
  openCart: (): void => {
    set({ isCartOpen: true });
  },

  closeCart: (): void => {
    set({ isCartOpen: false });
  },

  toggleCart: (): void => {
    set((state) => ({ isCartOpen: !state.isCartOpen }));
  },

  openWishlist: (): void => {
    set({ isWishlistOpen: true });
  },

  closeWishlist: (): void => {
    set({ isWishlistOpen: false });
  },

  toggleWishlist: (): void => {
    set((state) => ({ isWishlistOpen: !state.isWishlistOpen }));
  },

  openQuickView: (): void => {
    set({ isQuickViewOpen: true });
  },

  closeQuickView: (): void => {
    set({ isQuickViewOpen: false });
  },

  toggleQuickView: (): void => {
    set((state) => ({ isQuickViewOpen: !state.isQuickViewOpen }));
  },

  openFilters: (): void => {
    set({ isFiltersOpen: true });
  },

  closeFilters: (): void => {
    set({ isFiltersOpen: false });
  },

  toggleFilters: (): void => {
    set((state) => ({ isFiltersOpen: !state.isFiltersOpen }));
  },

  // Loading actions
  setLoading: (loading: boolean, message?: string): void => {
    set({ isLoading: loading, loadingMessage: message });
  },

  // Notification actions
  addNotification: (notification): void => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove notification after duration
    if (notification.duration) {
      setTimeout(() => {
        get().removeNotification(id);
      }, notification.duration);
    }
  },

  removeNotification: (id: string): void => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    }));
  },

  clearNotifications: (): void => {
    set({ notifications: [] });
  },

  // Theme actions
  setTheme: (theme: UIState['theme']): void => {
    set({ theme });
  },

  setLanguage: (language: string): void => {
    set({ language });
  },

  // Product view actions
  setProductViewMode: (mode: UIState['productViewMode']): void => {
    set({ productViewMode: mode });
  },

  setProductsPerPage: (count: number): void => {
    set({ productsPerPage: count });
  },

  setSortBy: (sort: string): void => {
    set({ sortBy: sort });
  },

  // Reset actions
  resetUI: (): void => {
    set(initialState);
  },
}));
