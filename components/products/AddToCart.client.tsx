'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useUIStore } from '@/store/ui';
import { ShoppingCart, Loader2 } from 'lucide-react';

interface AddToCartProps {
  productId: number;
  variationId?: number;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCart({ productId, variationId, className, children }: AddToCartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();
  const { setCartOpen } = useUIStore();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(productId, 1, variationId);
      setCartOpen(true); // Ouvrir le panier après ajout
    } catch {
      // Error silently handled - cart state managed by hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleAddToCart} disabled={isLoading} className={className}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
      {children || 'Ajouter au panier'}
    </Button>
  );
}
