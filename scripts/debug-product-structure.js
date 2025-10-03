/**
 * Script pour analyser la structure complète d'un produit WordPress
 */

require('dotenv').config({ path: '.env.local' });

// Utiliser fetch natif de Node.js 18+
let fetch;
try {
  fetch = globalThis.fetch;
} catch (error) {
  fetch = require('node-fetch');
}

const WORDPRESS_URL = process.env.WORDPRESS_URL;
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

async function debugProductStructure() {
  console.log('🔍 Analyse de la structure du produit WordPress');
  console.log('==============================================');

  if (!WORDPRESS_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.log('❌ Configuration manquante');
    return;
  }

  try {
    const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

    // Récupérer le produit avec tous les détails
    console.log('\n📦 Récupération du produit Music Shield...');
    const productResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products/64`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!productResponse.ok) {
      throw new Error(`Erreur récupération produit: ${productResponse.status}`);
    }

    const product = await productResponse.json();

    console.log('\n📊 Structure complète du produit:');
    console.log('================================');
    console.log(JSON.stringify(product, null, 2));

    // Analyser les champs de stock spécifiquement
    console.log('\n🔍 Analyse des champs de stock:');
    console.log('==============================');
    console.log(`- id: ${product.id}`);
    console.log(`- name: ${product.name}`);
    console.log(`- stock_quantity: ${product.stock_quantity}`);
    console.log(`- stock_status: ${product.stock_status}`);
    console.log(`- in_stock: ${product.in_stock}`);
    console.log(`- manage_stock: ${product.manage_stock}`);
    console.log(`- backorders: ${product.backorders}`);
    console.log(`- sold_individually: ${product.sold_individually}`);
    console.log(`- weight: ${product.weight}`);
    console.log(`- dimensions: ${JSON.stringify(product.dimensions)}`);
  } catch (error) {
    console.log(`\n❌ Erreur: ${error.message}`);
  }
}

// Exécution du script
debugProductStructure();
