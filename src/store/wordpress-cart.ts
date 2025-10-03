import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

interface WordPressCartItem {
  id: string; // Combinaison productId + variantId (si applicable)
  productId: number;
  product: WordPressProduct;
  quantity: number;
  variantId?: number;
  variant?: any; // Variante sélectionnée
  price: number; // Prix au moment de l'ajout
  total: number; // price * quantity
}

interface WordPressCartState {
  items: WordPressCartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: WordPressProduct, quantity: number, variant?: any) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: number, variantId?: number) => number;
  isItemInCart: (productId: number, variantId?: number) => boolean;
}

export const useWordPressCartStore = create<WordPressCartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity, variant) => {
        const variantId = variant?.id;
        const itemId = `${product.id}-${variantId || 'default'}`;
        const price = parseFloat(variant?.sale_price || variant?.price || product.sale_price || product.price);

        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.id === itemId);

          if (existingItemIndex > -1) {
            // Mettre à jour la quantité si l'item existe déjà
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            updatedItems[existingItemIndex].total =
              updatedItems[existingItemIndex].quantity * updatedItems[existingItemIndex].price;
            return { items: updatedItems };
          } else {
            // Ajouter un nouvel item
            const newItem: WordPressCartItem = {
              id: itemId,
              productId: product.id,
              product,
              quantity,
              variantId,
              variant,
              price,
              total: price * quantity,
            };
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity, total: item.price * quantity } : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.total, 0);
      },

      getItemQuantity: (productId, variantId) => {
        const itemId = `${productId}-${variantId || 'default'}`;
        const item = get().items.find((item) => item.id === itemId);
        return item?.quantity || 0;
      },

      isItemInCart: (productId, variantId) => {
        const itemId = `${productId}-${variantId || 'default'}`;
        return get().items.some((item) => item.id === itemId);
      },
    }),
    {
      name: 'wordpress-cart-storage',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
