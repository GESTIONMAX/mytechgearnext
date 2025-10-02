'use client';

import LanguageSelector from '@/components/LanguageSelector';
import { MiniCart } from '@/components/MiniCart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/cart-context';
import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const Header = (): React.ReactNode => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

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
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Naviguez dans notre collection</SheetDescription>
                </SheetHeader>
                <nav className="mt-6 space-y-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href} className="block text-lg font-medium hover:text-primary">
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
              <span className="text-xl font-bold">MyTechGear</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(!isCartOpen)} className="relative">
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

            {/* User */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher des produits..." className="pl-10" autoFocus />
            </div>
          </div>
        )}
      </div>

      {/* Mini Cart */}
      {isCartOpen && (
        <div className="absolute right-4 top-full z-50 mt-2">
          <MiniCart onClose={() => setIsCartOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
