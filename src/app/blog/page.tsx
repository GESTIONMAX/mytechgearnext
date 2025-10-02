import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function BlogPage(): ReactNode {
  const blogPosts = [
    {
      id: '1',
      title: "L'avenir de la réalité augmentée dans le sport",
      excerpt:
        "Découvrez comment les lunettes connectées révolutionnent l'entraînement sportif avec des données en temps réel.",
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      author: 'Dr. Sarah Johnson',
      publishedAt: '2024-01-15',
      category: 'Sport',
      image: '/blog/sport-ar.jpg',
      readTime: '5 min',
      tags: ['Sport', 'AR', 'Technologie'],
    },
    {
      id: '2',
      title: 'Guide complet des lunettes connectées lifestyle',
      excerpt: 'Tout ce que vous devez savoir pour choisir vos lunettes connectées pour le quotidien.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      author: 'Marc Dubois',
      publishedAt: '2024-01-12',
      category: 'Lifestyle',
      image: '/blog/lifestyle-guide.jpg',
      readTime: '8 min',
      tags: ['Lifestyle', 'Guide', 'Achat'],
    },
    {
      id: '3',
      title: "Les applications professionnelles de l'AR",
      excerpt: "Comment la réalité augmentée transforme les métiers de l'architecture, médecine et éducation.",
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      author: 'Prof. Marie Leroy',
      publishedAt: '2024-01-10',
      category: 'Prismatic',
      image: '/blog/professional-ar.jpg',
      readTime: '12 min',
      tags: ['AR', 'Professionnel', 'Innovation'],
    },
    {
      id: '4',
      title: 'Comparatif des meilleures lunettes connectées 2024',
      excerpt: 'Notre sélection des lunettes connectées les plus performantes du marché cette année.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      author: 'Tech Review Team',
      publishedAt: '2024-01-08',
      category: 'Comparatif',
      image: '/blog/comparison-2024.jpg',
      readTime: '15 min',
      tags: ['Comparatif', '2024', 'Test'],
    },
    {
      id: '5',
      title: 'Sécurité et confidentialité des lunettes connectées',
      excerpt: 'Comment protéger vos données personnelles avec les lunettes connectées.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      author: 'Alex Chen',
      publishedAt: '2024-01-05',
      category: 'Sécurité',
      image: '/blog/privacy-security.jpg',
      readTime: '6 min',
      tags: ['Sécurité', 'Confidentialité', 'Données'],
    },
    {
      id: '6',
      title: "L'évolution des lunettes connectées : de la science-fiction à la réalité",
      excerpt: "Retour sur l'histoire et l'évolution des lunettes connectées depuis leurs débuts.",
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      author: 'Dr. Thomas Martin',
      publishedAt: '2024-01-03',
      category: 'Histoire',
      image: '/blog/evolution-smart-glasses.jpg',
      readTime: '10 min',
      tags: ['Histoire', 'Évolution', 'Technologie'],
    },
  ];

  const categories = ['Tous', 'Sport', 'Lifestyle', 'Prismatic', 'Comparatif', 'Sécurité', 'Histoire'];
  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog MyTechGear</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les dernières actualités, guides et innovations dans le monde des lunettes connectées
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Article en vedette</h2>
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-lg">Image article</span>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="secondary">{featuredPost.category}</Badge>
                  <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${featuredPost.id}`}>
                      Lire l&apos;article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardHeader>
                <CardTitle>Catégories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href="#"
                      className="block text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Recevez nos derniers articles directement dans votre boîte mail.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <Button className="w-full">S&apos;abonner</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts */}
          <div className="flex-1">
            <div className="grid gap-6 md:grid-cols-2">
              {blogPosts.slice(1).map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Image article</span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Lire
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline">Charger plus d&apos;articles</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
