'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { BlogPost } from '@/types/blog';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BlogCarouselProps {
  posts: BlogPost[];
  title: string;
  subtitle: string;
}

export const BlogCarousel: React.FC<BlogCarouselProps> = ({ posts, title, subtitle }) => {
  const [_currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-black">{post.category.name}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" className="w-full">
                      Lire l&apos;article
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {posts.length > 3 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
