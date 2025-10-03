/**
 * Script pour mettre à jour le stock d'un produit WordPress
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

async function updateProductStock() {
  console.log('🔄 Mise à jour du stock des produits WordPress');
  console.log('===============================================');

  if (!WORDPRESS_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.log('❌ Configuration manquante');
    return;
  }

  try {
    const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

    // 1. Récupérer tous les produits
    console.log('\n📦 1. Récupération des produits...');
    const productsResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!productsResponse.ok) {
      throw new Error(`Erreur récupération produits: ${productsResponse.status}`);
    }

    const products = await productsResponse.json();
    console.log(`✅ ${products.length} produits trouvés`);

    // 2. Mettre à jour le stock de chaque produit
    for (const product of products) {
      console.log(`\n🔄 Mise à jour du produit: ${product.name} (ID: ${product.id})`);

      const updateData = {
        manage_stock: true,
        stock_quantity: 10, // Mettre 10 en stock
        in_stock: true,
      };

      const updateResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products/${product.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (updateResponse.ok) {
        const updatedProduct = await updateResponse.json();
        console.log(`✅ Stock mis à jour: ${updatedProduct.stock_quantity} en stock`);
      } else {
        const error = await updateResponse.text();
        console.log(`❌ Erreur mise à jour: ${error}`);
      }
    }

    // 3. Vérifier les produits mis à jour
    console.log('\n🔍 3. Vérification des stocks mis à jour...');
    const verifyResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (verifyResponse.ok) {
      const updatedProducts = await verifyResponse.json();
      updatedProducts.forEach((product) => {
        console.log(
          `📦 ${product.name}: ${product.stock_quantity} en stock (${product.in_stock ? 'Disponible' : 'Rupture'})`,
        );
      });
    }

    console.log('\n🎉 Mise à jour terminée !');
  } catch (error) {
    console.log(`\n❌ Erreur: ${error.message}`);
  }
}

// Exécution du script
updateProductStock();
