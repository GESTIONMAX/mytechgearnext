const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Charger les variables d'environnement depuis .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key] = value;
    }
  });
}

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Variables d'environnement Supabase manquantes");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Variantes par produit
const productVariants = {
  'sport-pro-max': [
    {
      name: 'Sport Pro Max - Standard',
      price: 39900,
      sale_price: 29900, // -25% de réduction
      in_stock: true,
      stock_quantity: 15,
      attributes: { color: 'Standard', features: 'GPS + Cardio' },
    },
    {
      name: 'Sport Pro Max - Premium',
      price: 49900,
      in_stock: true,
      stock_quantity: 8,
      attributes: { color: 'Premium', features: 'GPS + Cardio + AR' },
    },
    {
      name: 'Sport Pro Max - Elite',
      price: 59900,
      in_stock: false,
      stock_quantity: 0,
      attributes: { color: 'Elite', features: 'GPS + Cardio + AR + IA' },
    },
  ],
  'sport-lite': [
    {
      name: 'Sport Lite - Standard',
      price: 19900,
      in_stock: true,
      stock_quantity: 25,
      attributes: { color: 'Standard', weight: 'Léger' },
    },
    {
      name: 'Sport Lite - Pro',
      price: 24900,
      in_stock: true,
      stock_quantity: 12,
      attributes: { color: 'Pro', weight: 'Léger', features: 'GPS basique' },
    },
  ],
  'lifestyle-elite': [
    {
      name: 'Lifestyle Elite - Classic',
      price: 29900,
      in_stock: true,
      stock_quantity: 8,
      attributes: { color: 'Classic', style: 'Élégant' },
    },
    {
      name: 'Lifestyle Elite - Modern',
      price: 32900,
      in_stock: true,
      stock_quantity: 6,
      attributes: { color: 'Modern', style: 'Contemporain' },
    },
    {
      name: 'Lifestyle Elite - Premium',
      price: 39900,
      in_stock: true,
      stock_quantity: 4,
      attributes: { color: 'Premium', style: 'Luxe' },
    },
  ],
  'urban-classic': [
    {
      name: 'Urban Classic - Noir',
      price: 14900,
      sale_price: 12000, // -20% de réduction
      in_stock: true,
      stock_quantity: 12,
      attributes: { color: 'Noir', style: 'Classique' },
    },
    {
      name: 'Urban Classic - Blanc',
      price: 14900,
      sale_price: 12000,
      in_stock: true,
      stock_quantity: 10,
      attributes: { color: 'Blanc', style: 'Classique' },
    },
    {
      name: 'Urban Classic - Métal',
      price: 17900,
      in_stock: true,
      stock_quantity: 7,
      attributes: { color: 'Métal', style: 'Moderne' },
    },
  ],
  'prismatic-vision': [
    {
      name: 'Prismatic Vision - Standard',
      price: 129900,
      in_stock: false,
      stock_quantity: 0,
      attributes: { color: 'Standard', tech: 'AR de base' },
    },
    {
      name: 'Prismatic Vision - Pro',
      price: 149900,
      in_stock: true,
      stock_quantity: 3,
      attributes: { color: 'Pro', tech: 'AR avancée' },
    },
  ],
  'prismatic-euphoria': [
    {
      name: 'Prismatic Euphoria - Monture Blanche, Verres Bleus',
      price: 38500,
      in_stock: true,
      stock_quantity: 5,
      attributes: { frame: 'Blanche', lenses: 'Bleus', edition: 'Limitée' },
    },
    {
      name: 'Prismatic Euphoria - Monture Gold, Verres Noir',
      price: 38500,
      in_stock: true,
      stock_quantity: 3,
      attributes: { frame: 'Gold', lenses: 'Noir', edition: 'Limitée' },
    },
    {
      name: 'Prismatic Euphoria - Monture Blanche, Verres Noir',
      price: 38500,
      in_stock: true,
      stock_quantity: 4,
      attributes: { frame: 'Blanche', lenses: 'Noir', edition: 'Limitée' },
    },
  ],
  // Ajoutons des variantes pour Music Shield comme dans l'image
  'music-shield': [
    {
      name: 'Music Shield - Monture Blanche, Verres Rouges avec audio',
      price: 24900,
      in_stock: true,
      stock_quantity: 8,
      attributes: { frame: 'Blanche', lenses: 'Rouges', audio: 'Intégré' },
    },
    {
      name: 'Music Shield - Monture Blanche, Verres Bleus avec audio',
      price: 24900,
      in_stock: true,
      stock_quantity: 6,
      attributes: { frame: 'Blanche', lenses: 'Bleus', audio: 'Intégré' },
    },
    {
      name: 'Music Shield - Monture Noire, Verres Gris avec audio',
      price: 24900,
      in_stock: true,
      stock_quantity: 10,
      attributes: { frame: 'Noire', lenses: 'Gris', audio: 'Intégré' },
    },
  ],
};

async function addProductVariants() {
  console.log('🎯 Ajout des variantes de produits...');

  try {
    // 1. Récupérer tous les produits existants
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, slug, name');

    if (productsError) {
      console.error('❌ Erreur lors de la récupération des produits:', productsError);
      return;
    }

    console.log(`📦 ${products.length} produits trouvés`);

    // 2. Ajouter les variantes pour chaque produit
    for (const product of products) {
      const variants = productVariants[product.slug];
      
      if (variants) {
        console.log(`🔄 Ajout des variantes pour ${product.name}...`);
        
        // Préparer les variantes avec l'ID du produit
        const variantsWithProductId = variants.map(variant => ({
          ...variant,
          product_id: product.id,
          sku: `${product.slug}-${variant.name.toLowerCase().replace(/\s+/g, '-')}`,
        }));

        // Insérer les variantes
        const { data: insertedVariants, error: variantsError } = await supabase
          .from('product_variants')
          .insert(variantsWithProductId)
          .select();

        if (variantsError) {
          console.error(`❌ Erreur lors de l'insertion des variantes pour ${product.name}:`, variantsError);
          continue;
        }

        console.log(`✅ ${insertedVariants.length} variantes ajoutées pour ${product.name}`);

        // 3. Ajouter des images pour chaque variante
        for (const variant of insertedVariants) {
          const imageUrl = getVariantImageUrl(product.slug, variant.attributes);
          
          const { error: imageError } = await supabase
            .from('variant_images')
            .insert({
              variant_id: variant.id,
              image_url: imageUrl,
              alt_text: `${product.name} - ${variant.name}`,
              type: 'main',
              sort_order: 1,
            });

          if (imageError) {
            console.error(`❌ Erreur lors de l'insertion de l'image pour ${variant.name}:`, imageError);
          }
        }
      } else {
        console.log(`⚠️ Aucune variante définie pour ${product.slug}`);
      }
    }

    console.log('🎉 Variantes ajoutées avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des variantes:', error);
  }
}

function getVariantImageUrl(productSlug, attributes) {
  // Images basées sur les attributs de la variante
  if (productSlug.includes('music-shield')) {
    if (attributes.lenses === 'Rouges') {
      return 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop&crop=center';
    } else if (attributes.lenses === 'Bleus') {
      return 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop&crop=center';
    } else {
      return 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop&crop=center';
    }
  }
  
  if (productSlug.includes('sport')) {
    return 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop&crop=center';
  }
  
  if (productSlug.includes('lifestyle') || productSlug.includes('urban')) {
    return 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop&crop=center';
  }
  
  if (productSlug.includes('prismatic')) {
    return 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop&crop=center';
  }
  
  // Image par défaut
  return 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop&crop=center';
}

// Exécuter le script
addProductVariants();
