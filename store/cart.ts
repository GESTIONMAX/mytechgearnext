import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  productSlug: string;
  productName: string;
  productImage?: string;
  price: number;
  quantity: number;
  variationId?: string;
  variationName?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string, variationId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variationId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;

  // Getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string, variationId?: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const { productId, variationId } = newItem;
        const existingItem = get().items.find(
          (item) => item.productId === productId && item.variationId === variationId,
        );

        if (existingItem) {
          set((state) => ({
            items: state.items.map((item) =>
              item.productId === productId && item.variationId === variationId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...newItem, quantity: 1 }],
          }));
        }
      },

      removeItem: (productId, variationId) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.productId === productId && item.variationId === variationId)),
        }));
      },

      updateQuantity: (productId, quantity, variationId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variationId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.variationId === variationId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setCartOpen: (isOpen) => {
        set({ isOpen });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemQuantity: (productId, variationId) => {
        const item = get().items.find((item) => item.productId === productId && item.variationId === variationId);
        return item?.quantity || 0;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
