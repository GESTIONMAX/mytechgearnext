'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MiniCartProps {
  onClose: () => void;
}

export const MiniCart: React.FC<MiniCartProps> = ({ onClose }): React.ReactNode => {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="font-merriweather text-lg font-semibold mb-2">Panier vide</h3>
        <p className="text-muted-foreground mb-6">Votre panier est actuellement vide. Découvrez nos produits !</p>
        <Button onClick={onClose} className="gradient-primary text-primary-foreground">
          Continuer mes achats
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={`${item.productId}-${item.variantId || 'default'}`} className="p-3">
              <div className="flex items-center space-x-3">
                <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                  {item.product.images[0] ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                  {item.variant && (
                    <p className="text-xs text-muted-foreground">
                      {Object.entries(item.variant.attributes)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ')}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.productId, item.variantId)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">
                    {formatPrice((item.variant?.price ?? item.product.price) * item.quantity)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="border-t p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total ({getTotalItems()} articles)</span>
          <span className="font-bold text-lg">{formatPrice(getTotalPrice())}</span>
        </div>
        <Separator />
        <div className="space-y-2">
          <Button asChild className="w-full">
            <Link href="/checkout" onClick={onClose}>
              Commander maintenant
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/cart" onClick={onClose}>
              Voir le panier
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
