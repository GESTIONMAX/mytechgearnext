import { create } from 'zustand';

interface UIStore {
  // Modales
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;

  // Loading states
  isGlobalLoading: boolean;
  loadingMessage: string;

  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
  }>;

  // Actions
  setCartOpen: (isOpen: boolean) => void;
  setAuthModalOpen: (isOpen: boolean) => void;
  setSearchOpen: (isOpen: boolean) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;

  setGlobalLoading: (isLoading: boolean, message?: string) => void;

  addNotification: (notification: Omit<UIStore['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Getters
  hasNotifications: () => boolean;
  getUnreadNotifications: () => number;
}

export const useUIStore = create<UIStore>((set, get) => ({
  // État initial
  isCartOpen: false,
  isAuthModalOpen: false,
  isSearchOpen: false,
  isMobileMenuOpen: false,

  isGlobalLoading: false,
  loadingMessage: '',

  notifications: [],

  // Actions modales
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),

  // Actions loading
  setGlobalLoading: (isLoading, message = '') => set({ isGlobalLoading: isLoading, loadingMessage: message }),

  // Actions notifications
  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove après la durée spécifiée
    const duration = notification.duration || 5000;
    setTimeout(() => {
      get().removeNotification(id);
    }, duration);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  // Getters
  hasNotifications: () => get().notifications.length > 0,
  getUnreadNotifications: () => get().notifications.length,
}));
