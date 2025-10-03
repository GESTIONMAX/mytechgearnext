'use client';

import LanguageSelector from '@/components/LanguageSelector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/store/cart';
import { Heart, LogOut, Menu, Search, ShoppingCart, User, X, Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Header = (): React.JSX.Element => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  // TODO: Implémenter l'authentification
  const user = null;
  const loading = false;
  const signOut = (): void => {};

  const navigation = [
    { name: 'Sport', href: '/sport' },
    { name: 'Lifestyle', href: '/lifestyle' },
    { name: 'Prismatic', href: '/prismatic' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-effect border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MT</span>
              </div>
              <span className="font-merriweather font-bold text-xl text-primary">MyTechGear</span>
            </Link>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher des produits..."
                className="pl-10 pr-4 bg-muted/50 border-0 focus:bg-background transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1">
            {/* Search - Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Account */}
            {!loading &&
              (user ? (
                <div className="flex items-center space-x-1">
                  <span className="hidden lg:block text-sm text-muted-foreground mr-2">
                    {user && typeof user === 'object' && 'email' in user
                      ? (user as { email?: string }).email?.split('@')[0]
                      : 'Utilisateur'}
                  </span>
                  <Button variant="ghost" size="icon" asChild title="Mon compte">
                    <Link href="/account">
                      <User className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={signOut} title="Déconnexion">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" asChild title="Connexion">
                  <Link href="/auth">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              ))}

            {/* Cart */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                      {totalItems > 99 ? '99+' : totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96">
                <SheetHeader>
                  <SheetTitle>Panier</SheetTitle>
                  <SheetDescription>Articles sélectionnés pour votre commande</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-4">
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center py-8">
                        <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
                        <p className="text-gray-600 mb-4">Découvrez nos produits et ajoutez-les à votre panier</p>
                        <Link href="/products">
                          <Button>Voir les produits</Button>
                        </Link>
                      </div>
                    ) : (
                      items.map((item) => (
                        <div
                          key={`${item.productId}-${item.variantId || 'default'}`}
                          className="flex gap-3 p-3 border rounded-lg"
                        >
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
                              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
                                (item.variant?.price ?? item.product.price) / 100,
                              )}
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
                                onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                {items.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold">
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
                          getTotalPrice() / 100,
                        )}
                      </span>
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
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search */}
        {isSearchOpen && (
          <div className="pb-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Rechercher des produits..." className="pl-10 pr-10 bg-muted/50 border-0" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 pb-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary relative group"
            >
              {item.name}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
