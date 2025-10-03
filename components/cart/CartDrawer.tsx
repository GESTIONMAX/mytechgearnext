'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';

export const CartDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCart();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price / 100);
  };

  const handleQuantityChange = (productId: string, variantId: string | undefined, newQuantity: number): void => {
    if (newQuantity <= 0) {
      removeItem(productId, variantId);
    } else {
      updateQuantity(productId, newQuantity, variantId);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Panier ({getTotalItems()} articles)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
              <p className="text-gray-600 mb-4">Découvrez nos produits et ajoutez-les à votre panier</p>
              <Link href="/products">
                <Button>Voir les produits</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <Card key={`${item.productId}-${item.variantId || 'default'}`}>
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={item.variant?.image_url || item.product.image_url || '/placeholder.svg'}
                              alt={item.product.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 truncate">{item.product.name}</h4>
                            {item.variant && <p className="text-xs text-gray-600 truncate">{item.variant.name}</p>}
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              {formatPrice(item.variant?.price ?? item.product.price)}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.productId, item.variantId)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>

                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.productId, item.variantId, item.quantity - 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.productId, item.variantId, item.quantity + 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">{formatPrice(getTotalPrice())}</span>
                </div>

                <div className="space-y-2">
                  <Link href="/checkout" className="block">
                    <Button className="w-full" size="lg">
                      Commander maintenant
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Continuer mes achats
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
