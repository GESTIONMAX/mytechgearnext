import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
}

interface CartActions {
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (productId: string, variantId?: string) => number;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      // State
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      // Actions
      addItem: (product: Product, variant?: ProductVariant, quantity = 1): void => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => item.productId === product.id && item.variantId === variant?.id,
        );

        if (existingItemIndex > -1) {
          // Update existing item
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem: CartItem = {
            productId: product.id,
            product,
            quantity,
            variantId: variant?.id,
            variant,
          };
          set({ items: [...items, newItem] });
        }

        // Update totals
        get().updateTotals();
      },

      removeItem: (productId: string, variantId?: string): void => {
        const { items } = get();
        const filteredItems = items.filter((item) => !(item.productId === productId && item.variantId === variantId));
        set({ items: filteredItems });
        get().updateTotals();
      },

      updateQuantity: (productId: string, variantId: string | undefined, quantity: number): void => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map((item) =>
          item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item,
        );
        set({ items: updatedItems });
        get().updateTotals();
      },

      clearCart: (): void => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      toggleCart: (): void => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: (): void => {
        set({ isOpen: true });
      },

      closeCart: (): void => {
        set({ isOpen: false });
      },

      getItemQuantity: (productId: string, variantId?: string): number => {
        const { items } = get();
        const item = items.find((item) => item.productId === productId && item.variantId === variantId);
        return item?.quantity || 0;
      },

      updateTotals: (): void => {
        const { items } = get();
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum, item) => {
          const price = item.variant?.price || item.product.price;
          return sum + price * item.quantity;
        }, 0);
        set({ totalItems, totalPrice });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
