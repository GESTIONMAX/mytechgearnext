'use client';

import { useWordPressProducts } from '@/services/wordpress-service';
import { WordPressUtils } from '@/lib/adapters/wordpress-adapter';

export function ProductList() {
  const { data: products, isLoading, error } = useWordPressProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Chargement des produits...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">Erreur de chargement</h3>
        <p className="text-red-600">Impossible de charger les produits WordPress</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Aucun produit trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const finalPrice = WordPressUtils.getFinalPrice(product);
  const isInStock = WordPressUtils.isInStock(product);
  const formattedPrice = WordPressUtils.formatPrice(finalPrice);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {product.images.length > 0 && (
        <div className="aspect-w-16 aspect-h-12">
          <img src={product.images[0].src} alt={product.images[0].alt} className="w-full h-48 object-cover" />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-blue-600">{formattedPrice}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isInStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {isInStock ? 'En stock' : 'Rupture'}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.categories.map((category: any) => (
            <span key={category.id} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {category.name}
            </span>
          ))}
        </div>

        <button
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isInStock ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isInStock}
        >
          {isInStock ? 'Ajouter au panier' : 'Rupture de stock'}
        </button>
      </div>
    </div>
  );
}
