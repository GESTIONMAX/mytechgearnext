'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface CategoryVideoProps {
  category: string;
}

const CategoryVideo: React.FC<CategoryVideoProps> = ({ category }) => {
  const getVideoData = (cat: string): void => {
    const categoryLower = cat.toLowerCase();

    switch (categoryLower) {
      case 'sport':
        return {
          title: 'Découvrez nos lunettes sport en action',
          description:
            'Voyez comment nos lunettes connectées révolutionnent votre pratique sportive avec des fonctionnalités avancées.',
          videoThumbnail: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=450&fit=crop&crop=center',
          videoUrl: '#', // TODO: Add real video URL
        };
      case 'lifestyle':
        return {
          title: 'Intégrez la technologie à votre style',
          description: "Découvrez comment nos lunettes lifestyle s'intègrent parfaitement à votre quotidien urbain.",
          videoThumbnail:
            'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=450&fit=crop&crop=center',
          videoUrl: '#', // TODO: Add real video URL
        };
      case 'prismatic':
        return {
          title: 'La magie des couleurs prismatiques',
          description: "Explorez l'univers des couleurs avec nos lunettes prismatiques qui s'adaptent à votre humeur.",
          videoThumbnail:
            'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=450&fit=crop&crop=center',
          videoUrl: '#', // TODO: Add real video URL
        };
      default:
        return {
          title: 'Découvrez nos lunettes connectées',
          description: "Explorez l'univers de nos lunettes connectées et leurs fonctionnalités innovantes.",
          videoThumbnail: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=450&fit=crop&crop=center',
          videoUrl: '#', // TODO: Add real video URL
        };
    }
  };

  const data = getVideoData(category);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-merriweather text-3xl font-bold mb-4">{data.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{data.description}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="relative aspect-video">
              <Image src={data.videoThumbnail} alt={data.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-white/90 text-black hover:bg-white shadow-lg"
                  onClick={() => {
                    // TODO: Implement video modal or redirect
                    console.log('Play video');
                  }}
                >
                  <Play className="h-6 w-6 mr-2" />
                  Regarder la vidéo
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{data.title}</h3>
                  <p className="text-muted-foreground text-sm">{data.description}</p>
                </div>
                <Button variant="outline" className="ml-4">
                  En savoir plus
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CategoryVideo;
