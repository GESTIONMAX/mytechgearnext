import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Grid, List, Search } from 'lucide-react';
import type { ReactNode } from 'react';

export default function ProductsPage(): ReactNode {
  const products = [
    {
      id: '1',
      name: 'Sport Pro Max',
      category: 'Sport',
      price: 399,
      originalPrice: 499,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviews: 124,
      inStock: true,
      features: ['GPS intégré', 'Résistant à l&apos;eau', 'Monitoring cardiaque'],
    },
    {
      id: '2',
      name: 'Lifestyle Elite',
      category: 'Lifestyle',
      price: 299,
      originalPrice: null,
      image: '/placeholder-product.jpg',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      features: ['Design élégant', 'Assistant vocal', 'Reconnaissance faciale'],
    },
    {
      id: '3',
      name: 'Prismatic Vision',
      category: 'Prismatic',
      price: 1299,
      originalPrice: 1499,
      image: '/placeholder-product.jpg',
      rating: 4.9,
      reviews: 67,
      inStock: false,
      features: ['Réalité augmentée 4K', 'IA intégrée', 'Hologrammes'],
    },
    {
      id: '4',
      name: 'Urban Classic',
      category: 'Lifestyle',
      price: 199,
      originalPrice: null,
      image: '/placeholder-product.jpg',
      rating: 4.4,
      reviews: 156,
      inStock: true,
      features: ['Style minimaliste', 'Confort optimal', 'Qualité audio'],
    },
    {
      id: '5',
      name: 'Sport Endurance',
      category: 'Sport',
      price: 349,
      originalPrice: 399,
      image: '/placeholder-product.jpg',
      rating: 4.7,
      reviews: 98,
      inStock: true,
      features: ['Autonomie 12h', 'Résistant chocs', 'GPS haute précision'],
    },
    {
      id: '6',
      name: 'Prismatic Studio',
      category: 'Prismatic',
      price: 999,
      originalPrice: null,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviews: 45,
      inStock: true,
      features: ['Design 3D', 'Collaboration', 'Export haute qualité'],
    },
  ];

  const categories = ['Tous', 'Sport', 'Lifestyle', 'Prismatic'];
  const priceRanges = [
    { label: 'Moins de 200€', min: 0, max: 200 },
    { label: '200€ - 500€', min: 200, max: 500 },
    { label: '500€ - 1000€', min: 500, max: 1000 },
    { label: 'Plus de 1000€', min: 1000, max: Infinity },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nos Produits</h1>
          <p className="mt-2 text-gray-600">Découvrez notre collection complète de lunettes connectées</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardHeader>
                <CardTitle>Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Recherche</label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Rechercher..." className="pl-10" />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Catégories</label>
                  <div className="mt-2 space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input type="radio" name="category" value={category} className="mr-2" />
                        <span className="text-sm text-gray-600">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Gamme de prix</label>
                  <div className="mt-2 space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center">
                        <input type="radio" name="price" value={range.label} className="mr-2" />
                        <span className="text-sm text-gray-600">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">En stock uniquement</span>
                  </label>
                </div>

                <Button className="w-full">Appliquer les filtres</Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">12 produits trouvés</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Trier par:</span>
                <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
                  <option>Pertinence</option>
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                  <option>Note</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400">Image produit</span>
                    </div>
                    {!product.inStock && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="destructive">Rupture de stock</Badge>
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.reviews} avis)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl font-bold text-gray-900">{product.price}€</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}€</span>
                      )}
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-1">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" disabled={!product.inStock}>
                      {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Précédent
                </Button>
                <Button variant="outline" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
