'use client';

import { useWordPressCart } from '@/hooks/useWordPressCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { Trash2, ShoppingBag, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatWordPressPrice } from '@/lib/utils';

interface WordPressCartDrawerProps {
  children?: React.ReactNode;
}

export const WordPressCartDrawer: React.FC<WordPressCartDrawerProps> = ({ children }) => {
  const { items, isOpen, totalItems, totalPrice, updateQuantity, removeItem, clearCart, closeCart } =
    useWordPressCart();

  const getProductImage = (item: any): string => {
    if (item.variant?.image?.src) {
      return item.variant.image.src;
    }
    if (item.product.images && item.product.images.length > 0) {
      return item.product.images[0].src;
    }
    return '/placeholder.svg';
  };

  const getProductName = (item: any): string => {
    if (item.variant) {
      const variantName = item.variant.attributes?.map((attr: any) => attr.option).join(' - ');
      return `${item.product.name} - ${variantName}`;
    }
    return item.product.name;
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" />
            <span>Panier ({totalItems})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
              <p className="text-gray-500 mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
              <Link href="/products">
                <Button onClick={closeCart} className="bg-primary hover:bg-primary/90">
                  Voir les produits
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={getProductImage(item)}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{getProductName(item)}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatWordPressPrice(item.price)} × {item.quantity}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {item.product.categories?.[0]?.name || 'Produit'}
                          </Badge>
                          {item.variant && (
                            <Badge variant="secondary" className="text-xs">
                              Variante
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(quantity) => updateQuantity(item.id, quantity)}
                        max={10}
                        min={1}
                        allowDelete={true}
                        onDelete={() => removeItem(item.id)}
                      />

                      {/* Remove Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Cart Summary */}
              <div className="py-4 space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatWordPressPrice(totalPrice)}</span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Link href="/checkout" className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90" size="lg" onClick={closeCart}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Passer la commande
                    </Button>
                  </Link>

                  <div className="flex space-x-2">
                    <Link href="/products" className="flex-1">
                      <Button variant="outline" className="w-full" onClick={closeCart}>
                        Continuer mes achats
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Vider le panier
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
