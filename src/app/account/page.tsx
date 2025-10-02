import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, MapPin, Settings, User } from 'lucide-react';
import type { ReactNode } from 'react';

export default function AccountPage(): ReactNode {
  const user = {
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Paix, 75001 Paris',
    memberSince: '2023-01-15',
    totalOrders: 5,
    totalSpent: 1249.5,
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Livré',
      total: 399.0,
      items: ['Sport Pro Max'],
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'En cours',
      total: 299.0,
      items: ['Lifestyle Elite'],
    },
    {
      id: 'ORD-003',
      date: '2023-12-20',
      status: 'Livré',
      total: 1299.0,
      items: ['Prismatic Vision'],
    },
  ];

  const wishlist = [
    {
      id: '1',
      name: 'Sport Endurance',
      price: 349.0,
      image: '/placeholder-product.jpg',
    },
    {
      id: '2',
      name: 'Urban Classic',
      price: 199.0,
      image: '/placeholder-product.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Compte</h1>
          <p className="mt-2 text-gray-600">Gérez vos informations personnelles et vos commandes</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>
                  Membre depuis {new Date(user.memberSince).toLocaleDateString('fr-FR')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Commandes</span>
                  <span className="font-semibold">{user.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total dépensé</span>
                  <span className="font-semibold">{user.totalSpent.toFixed(2)}€</span>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
                <Button variant="destructive" className="w-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="orders">Commandes</TabsTrigger>
                <TabsTrigger value="wishlist">Liste de souhaits</TabsTrigger>
                <TabsTrigger value="addresses">Adresses</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>Mettez à jour vos informations de profil</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Prénom</label>
                        <Input defaultValue="Jean" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Nom</label>
                        <Input defaultValue="Dupont" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <Input type="email" defaultValue={user.email} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Téléphone</label>
                      <Input defaultValue={user.phone} />
                    </div>
                    <Button>Enregistrer les modifications</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Changer le mot de passe</CardTitle>
                    <CardDescription>Mettez à jour votre mot de passe pour sécuriser votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Mot de passe actuel</label>
                      <Input type="password" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                      <Input type="password" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                      <Input type="password" />
                    </div>
                    <Button>Changer le mot de passe</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes commandes</CardTitle>
                    <CardDescription>Suivez l&apos;état de vos commandes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">Commande {order.id}</h3>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{order.total.toFixed(2)}€</p>
                              <Badge variant={order.status === 'Livré' ? 'default' : 'secondary'} className="text-xs">
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">{order.items.join(', ')}</div>
                          <div className="mt-3 flex space-x-2">
                            <Button variant="outline" size="sm">
                              Voir les détails
                            </Button>
                            {order.status === 'Livré' && (
                              <Button variant="outline" size="sm">
                                Télécharger la facture
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ma liste de souhaits</CardTitle>
                    <CardDescription>Produits que vous souhaitez acheter plus tard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {wishlist.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">Image</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-lg font-bold text-primary">{item.price.toFixed(2)}€</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button size="sm">Ajouter au panier</Button>
                              <Button variant="outline" size="sm">
                                Supprimer
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes adresses</CardTitle>
                    <CardDescription>Gérez vos adresses de livraison et de facturation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">Adresse principale</h3>
                          <p className="text-sm text-gray-600 mt-1">{user.address}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <MapPin className="h-4 w-4 mr-2" />
                      Ajouter une nouvelle adresse
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
