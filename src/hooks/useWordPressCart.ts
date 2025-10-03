import { useWordPressCartStore } from '@/store/wordpress-cart';
import type { WordPressProduct } from '@/store/wordpress-cart';

interface UseWordPressCartReturn {
  // État
  items: Array<{
    id: string;
    productId: number;
    product: WordPressProduct;
    quantity: number;
    variantId?: number;
    variant?: any;
    price: number;
    total: number;
  }>;
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;

  // Actions
  addItem: (product: WordPressProduct, quantity: number, variant?: any) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Helpers
  getItemQuantity: (productId: number, variantId?: number) => number;
  isItemInCart: (productId: number, variantId?: number) => boolean;
}

export const useWordPressCart = (): UseWordPressCartReturn => {
  const {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getTotalItems,
    getTotalPrice,
    getItemQuantity,
    isItemInCart,
  } = useWordPressCartStore();

  return {
    items,
    isOpen,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getItemQuantity,
    isItemInCart,
  };
};
