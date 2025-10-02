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

async function addMusicShieldProduct() {
  console.log('🎵 Ajout du produit Music Shield...');

  try {
    // 1. Récupérer la catégorie Sport
    const { data: sportCategory, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'sport')
      .single();

    if (categoryError) {
      console.error('❌ Erreur lors de la récupération de la catégorie Sport:', categoryError);
      return;
    }

    // 2. Créer le produit Music Shield
    const musicShieldProduct = {
      name: 'Music Shield',
      slug: 'music-shield',
      description: 'Lunettes connectées avec audio intégré pour une expérience musicale immersive pendant le sport.',
      short_description: 'Lunettes connectées avec audio intégré',
      price: 24900, // Prix de base
      in_stock: true,
      stock_quantity: 20,
      is_active: true,
      category_id: sportCategory.id,
      features: ['Audio intégré', 'Résistant à l\'eau', 'Autonomie 6h', 'Bluetooth 5.0'],
      tags: ['sport', 'audio', 'musique', 'connecté'],
      specifications: {
        audio: 'Haut-parleurs intégrés',
        autonomie: '6 heures',
        bluetooth: '5.0',
        résistance: 'IPX5',
        poids: '35g',
      },
    };

    const { data: product, error: productError } = await supabase
      .from('products')
      .insert(musicShieldProduct)
      .select()
      .single();

    if (productError) {
      console.error('❌ Erreur lors de la création du produit Music Shield:', productError);
      return;
    }

    console.log(`✅ Produit Music Shield créé avec l'ID: ${product.id}`);

    // 3. Ajouter une image principale
    const { error: imageError } = await supabase
      .from('product_images')
      .insert({
        product_id: product.id,
        image_url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop&crop=center',
        alt_text: 'Music Shield - Lunettes connectées avec audio',
        sort_order: 1,
      });

    if (imageError) {
      console.error('❌ Erreur lors de l\'ajout de l\'image:', imageError);
    } else {
      console.log('✅ Image principale ajoutée');
    }

    console.log('🎉 Produit Music Shield ajouté avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout du produit Music Shield:', error);
  }
}

// Exécuter le script
addMusicShieldProduct();
