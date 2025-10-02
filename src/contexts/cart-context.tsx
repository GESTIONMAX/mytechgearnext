'use client';

import type { CartItem, Product, ReactNode } from '@/types';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

type CartAction =
  | {
      type: 'ADD_ITEM';
      payload: { product: Product; quantity: number; variantId?: string };
    }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantId?: string } }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { productId: string; quantity: number; variantId?: string };
    }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, variantId } = action.payload;
      const existingItemIndex = state.findIndex(
        (item) => item.productId === product.id && item.variantId === variantId,
      );

      if (existingItemIndex > -1) {
        const newState = [...state];
        newState[existingItemIndex].quantity += quantity;
        return newState;
      }

      const variant = variantId ? product.variants?.find((v) => v.id === variantId) : undefined;
      const newItem: CartItem = {
        productId: product.id,
        product,
        quantity,
        variantId,
        variant,
      };
      return [...state, newItem];
    }

    case 'REMOVE_ITEM': {
      const { productId, variantId } = action.payload;
      return state.filter((item) => !(item.productId === productId && item.variantId === variantId));
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity, variantId } = action.payload;
      if (quantity <= 0) {
        return state.filter((item) => !(item.productId === productId && item.variantId === variantId));
      }

      return state.map((item) =>
        item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item,
      );
    }

    case 'CLEAR_CART':
      return [];

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, variantId?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }): ReactNode {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (_error) {
        // console.error('Error loading cart from localStorage:', _error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number, variantId?: string): void => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, variantId } });
  };

  const removeItem = (productId: string, variantId?: string): void => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } });
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string): void => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, variantId } });
  };

  const clearCart = (): void => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return items.reduce((total, item) => {
      const price = item.variant?.price ?? item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
