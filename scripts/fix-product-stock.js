/**
 * Script pour corriger le statut de stock d'un produit WordPress
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

async function fixProductStock() {
  console.log('🔧 Correction du statut de stock WordPress');
  console.log('==========================================');

  if (!WORDPRESS_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.log('❌ Configuration manquante');
    return;
  }

  try {
    const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

    // 1. Récupérer le produit spécifique
    console.log('\n📦 1. Récupération du produit Music Shield...');
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
    console.log(`✅ Produit trouvé: ${product.name}`);
    console.log(`📊 Stock actuel: ${product.stock_quantity}`);
    console.log(`📊 In stock: ${product.in_stock}`);
    console.log(`📊 Manage stock: ${product.manage_stock}`);

    // 2. Forcer la mise à jour complète du stock
    console.log('\n🔄 2. Correction complète du stock...');
    const updateData = {
      manage_stock: true,
      stock_quantity: 10,
      in_stock: true,
      stock_status: 'instock', // Forcer le statut
    };

    const updateResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products/64`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (updateResponse.ok) {
      const updatedProduct = await updateResponse.json();
      console.log(`✅ Produit mis à jour:`);
      console.log(`   - Stock quantity: ${updatedProduct.stock_quantity}`);
      console.log(`   - In stock: ${updatedProduct.in_stock}`);
      console.log(`   - Stock status: ${updatedProduct.stock_status}`);
      console.log(`   - Manage stock: ${updatedProduct.manage_stock}`);
    } else {
      const error = await updateResponse.text();
      console.log(`❌ Erreur mise à jour: ${error}`);
    }

    // 3. Vérification finale
    console.log('\n🔍 3. Vérification finale...');
    const finalResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products/64`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (finalResponse.ok) {
      const finalProduct = await finalResponse.json();
      console.log(`📦 ${finalProduct.name}:`);
      console.log(`   - Stock: ${finalProduct.stock_quantity}`);
      console.log(`   - Disponible: ${finalProduct.in_stock ? 'OUI' : 'NON'}`);
      console.log(`   - Statut: ${finalProduct.stock_status}`);
    }

    console.log('\n🎉 Correction terminée !');
  } catch (error) {
    console.log(`\n❌ Erreur: ${error.message}`);
  }
}

// Exécution du script
fixProductStock();
