import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import type { Product, ProductVariant } from '@/types';

export const useCart = () => {
  const cartStore = useCartStore();
  const uiStore = useUIStore();

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1): void => {
    cartStore.addItem(product, variant, quantity);
    uiStore.addNotification({
      type: 'success',
      message: `${product.name} ajouté au panier`,
      duration: 3000,
    });
  };

  const removeFromCart = (productId: string, variantId?: string): void => {
    const item = cartStore.items.find((item) => item.productId === productId && item.variantId === variantId);

    if (item) {
      cartStore.removeItem(productId, variantId);
      uiStore.addNotification({
        type: 'info',
        message: `${item.product.name} retiré du panier`,
        duration: 3000,
      });
    }
  };

  const updateQuantity = (productId: string, variantId: string | undefined, quantity: number): void => {
    cartStore.updateQuantity(productId, variantId, quantity);
  };

  const clearCart = (): void => {
    cartStore.clearCart();
    uiStore.addNotification({
      type: 'info',
      message: 'Panier vidé',
      duration: 3000,
    });
  };

  const openCart = (): void => {
    uiStore.openCart();
  };

  const closeCart = (): void => {
    uiStore.closeCart();
  };

  const toggleCart = (): void => {
    uiStore.toggleCart();
  };

  const getItemQuantity = (productId: string, variantId?: string): number => {
    return cartStore.getItemQuantity(productId, variantId);
  };

  const isInCart = (productId: string, variantId?: string): boolean => {
    return getItemQuantity(productId, variantId) > 0;
  };

  return {
    // State
    items: cartStore.items,
    totalItems: cartStore.totalItems,
    totalPrice: cartStore.totalPrice,
    isOpen: uiStore.isCartOpen,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    getItemQuantity,
    isInCart,
  };
};
