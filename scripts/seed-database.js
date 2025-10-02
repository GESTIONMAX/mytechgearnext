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

// Données de test
const categories = [
  {
    name: 'Sport',
    slug: 'sport',
    description: 'Lunettes connectées pour les sportifs et athlètes',
    image_url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop&crop=center',
    is_active: true,
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Lunettes élégantes pour le quotidien urbain',
    image_url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop&crop=center',
    is_active: true,
  },
  {
    name: 'Prismatic',
    slug: 'prismatic',
    description: 'Technologie prismatique révolutionnaire',
    image_url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop&crop=center',
    is_active: true,
  },
];

const products = [
  {
    name: 'Sport Pro Max',
    slug: 'sport-pro-max',
    description:
      'Lunettes connectées pour sportifs, avec GPS et cardiofréquencemètre intégrés. Parfaites pour les athlètes exigeants.',
    short_description: 'GPS et cardiofréquencemètre intégrés',
    price: 39900, // en centimes
    sale_price: 29900,
    in_stock: true,
    stock_quantity: 15,
    is_active: true,
    features: ['GPS intégré', 'Monitoring cardiaque', "Résistant à l'eau", 'Autonomie 8h'],
    tags: ['sport', 'gps', 'cardio', 'athlète'],
    specifications: {
      autonomie: '8 heures',
      gps: 'Intégré',
      résistance: 'IPX7',
      poids: '45g',
    },
  },
  {
    name: 'Lifestyle Elite',
    slug: 'lifestyle-elite',
    description: 'Design élégant et assistant vocal intégré pour le quotidien. Style et technologie réunis.',
    short_description: 'Assistant vocal et design élégant',
    price: 29900,
    in_stock: true,
    stock_quantity: 8,
    is_active: true,
    features: ['Assistant vocal', 'Design élégant', 'Notifications intelligentes', 'Autonomie 12h'],
    tags: ['lifestyle', 'assistant', 'élégant', 'urbain'],
    specifications: {
      assistant: 'Vocal intégré',
      design: 'Élégant',
      notifications: 'Intelligentes',
      autonomie: '12h',
    },
  },
  {
    name: 'Prismatic Vision',
    slug: 'prismatic-vision',
    description: 'Réalité augmentée immersive pour le travail et le divertissement.',
    short_description: 'Réalité augmentée immersive',
    price: 129900,
    in_stock: false,
    stock_quantity: 0,
    is_active: true,
    features: ['Réalité augmentée', 'Hologrammes', 'Navigation 3D', 'IA intégrée'],
    tags: ['ar', 'immersif', 'travail', 'innovation'],
    specifications: {
      ar: 'Réalité augmentée',
      hologrammes: 'Supportés',
      navigation: '3D',
      ia: 'Intégrée',
    },
  },
  {
    name: 'Sport Lite',
    slug: 'sport-lite',
    description: 'Version légère pour les activités sportives occasionnelles. Parfait pour débuter.',
    short_description: 'Version légère pour le sport',
    price: 19900,
    in_stock: true,
    stock_quantity: 25,
    is_active: true,
    features: ['Léger', 'Sport occasionnel', 'Prix abordable', 'Facile à utiliser'],
    tags: ['sport', 'léger', 'occasionnel', 'débutant'],
    specifications: {
      poids: 'Léger',
      usage: 'Occasionnel',
      prix: 'Abordable',
      difficulté: 'Facile',
    },
  },
  {
    name: 'Urban Classic',
    slug: 'urban-classic',
    description: 'Style intemporel avec notifications intelligentes. Pour les citadins modernes.',
    short_description: 'Style intemporel et notifications',
    price: 14900,
    sale_price: 12000,
    in_stock: true,
    stock_quantity: 12,
    is_active: true,
    features: ['Style intemporel', 'Notifications', 'Classique', 'Urbain'],
    tags: ['urban', 'classic', 'notifications', 'moderne'],
    specifications: {
      style: 'Intemporel',
      notifications: 'Intelligentes',
      type: 'Classique',
      usage: 'Urbain',
    },
  },
  {
    name: 'Prismatic Euphoria',
    slug: 'prismatic-euphoria',
    description: 'Monture blanche avec verres bleus. Édition limitée de la collection Prismatic.',
    short_description: 'Monture blanche, verres bleus',
    price: 38500,
    in_stock: true,
    stock_quantity: 5,
    is_active: true,
    features: ['Édition limitée', 'Verres prismatiques', 'Design exclusif', 'Monture premium'],
    tags: ['prismatic', 'édition limitée', 'premium', 'exclusif'],
    specifications: {
      édition: 'Limitée',
      verres: 'Prismatiques',
      design: 'Exclusif',
      monture: 'Premium',
    },
  },
];

async function seedDatabase() {
  console.log('🌱 Début du seeding de la base de données...');

  try {
    // 1. Vérifier et insérer les catégories si elles n'existent pas
    console.log('📁 Vérification des catégories...');
    const { data: existingCategories } = await supabase.from('categories').select('id, slug');

    const existingSlugs = existingCategories?.map((cat) => cat.slug) || [];
    const newCategories = categories.filter((cat) => !existingSlugs.includes(cat.slug));

    if (newCategories.length > 0) {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .insert(newCategories)
        .select();

      if (categoriesError) {
        console.error("❌ Erreur lors de l'insertion des catégories:", categoriesError);
        return;
      }

      console.log(`✅ ${categoriesData.length} nouvelles catégories insérées`);
    } else {
      console.log('✅ Toutes les catégories existent déjà');
    }

    // 2. Récupérer les IDs des catégories
    const { data: allCategories } = await supabase.from('categories').select('id, slug');

    const categoryMap = {};
    allCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat.id;
    });

    // 3. Vérifier et insérer les produits
    console.log('🛍️ Vérification des produits...');
    const { data: existingProducts } = await supabase.from('products').select('slug');

    const existingProductSlugs = existingProducts?.map((p) => p.slug) || [];
    const newProducts = products.filter((product) => !existingProductSlugs.includes(product.slug));

    if (newProducts.length > 0) {
      const productsWithCategories = newProducts.map((product) => {
        let categoryId = null;
        if (product.name.includes('Sport')) {
          categoryId = categoryMap['sport'];
        } else if (product.name.includes('Lifestyle') || product.name.includes('Urban')) {
          categoryId = categoryMap['lifestyle'];
        } else if (product.name.includes('Prismatic')) {
          categoryId = categoryMap['prismatic'];
        }

        return {
          ...product,
          category_id: categoryId,
        };
      });

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .insert(productsWithCategories)
        .select();

      if (productsError) {
        console.error("❌ Erreur lors de l'insertion des produits:", productsError);
        return;
      }

      console.log(`✅ ${productsData.length} nouveaux produits insérés`);
    } else {
      console.log('✅ Tous les produits existent déjà');
      const { data: allProducts } = await supabase.from('products').select('id, name');
      console.log(`📊 ${allProducts?.length || 0} produits existants dans la base`);
    }

    // 4. Récupérer tous les produits pour les images
    const { data: allProducts } = await supabase.from('products').select('id, name');

    if (allProducts && allProducts.length > 0) {
      console.log('🖼️ Insertion des images...');
      const imageInserts = [];

      allProducts.forEach((product) => {
        const imageUrl = product.name.includes('Sport')
          ? 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=600&fit=crop&crop=center'
          : product.name.includes('Lifestyle') || product.name.includes('Urban')
            ? 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop&crop=center'
            : 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop&crop=center';

        imageInserts.push({
          product_id: product.id,
          image_url: imageUrl,
          alt_text: product.name,
          sort_order: 1,
        });
      });

      const { error: imagesError } = await supabase.from('product_images').insert(imageInserts);

      if (imagesError) {
        console.error("❌ Erreur lors de l'insertion des images:", imagesError);
        return;
      }

      console.log(`✅ ${imageInserts.length} images insérées`);
    }

    console.log('🎉 Seeding terminé avec succès !');
    console.log(`📊 Résumé:`);
    console.log(`   - Catégories: ${allCategories?.length || 0}`);
    console.log(`   - Produits: ${allProducts?.length || 0}`);
    console.log(`   - Images: ${allProducts?.length || 0}`);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
  }
}

// Exécuter le seeding
seedDatabase();
