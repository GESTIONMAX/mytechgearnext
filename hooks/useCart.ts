import { useMutation, useQuery } from '@apollo/client';
import { GET_CART, ADD_TO_CART, UPDATE_CART_ITEM, REMOVE_CART_ITEM } from '@/lib/wordpress/queries/cart';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import type { CartResponse } from '@/types/wordpress';

export function useCart() {
  const { data, loading, error, refetch } = useQuery<CartResponse>(GET_CART);
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [updateCartItemMutation] = useMutation(UPDATE_CART_ITEM);
  const [removeCartItemMutation] = useMutation(REMOVE_CART_ITEM);

  const { addNotification } = useUIStore();

  const cart = data?.cart;
  const items = cart?.contents?.nodes || [];

  const addToCart = async (productId: number, quantity: number = 1, variationId?: number) => {
    try {
      const { data: result } = await addToCartMutation({
        variables: {
          productId,
          quantity,
          variationId,
        },
      });

      if (result?.addToCart?.cartItem) {
        addNotification({
          type: 'success',
          title: 'Produit ajouté',
          message: 'Le produit a été ajouté à votre panier',
        });
        refetch();
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Erreur',
        message: "Impossible d'ajouter le produit au panier",
      });
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (key: string, quantity: number) => {
    try {
      await updateCartItemMutation({
        variables: { key, quantity },
      });
      refetch();
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Erreur',
        message: 'Impossible de mettre à jour la quantité',
      });
      console.error('Error updating cart item:', error);
    }
  };

  const removeItem = async (key: string) => {
    try {
      await removeCartItemMutation({
        variables: { key },
      });
      refetch();
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Erreur',
        message: "Impossible de supprimer l'article",
      });
      console.error('Error removing cart item:', error);
    }
  };

  return {
    items,
    total: cart?.total || '0',
    subtotal: cart?.subtotal || '0',
    loading,
    error,
    addToCart,
    updateQuantity,
    removeItem,
    refetch,
  };
}
