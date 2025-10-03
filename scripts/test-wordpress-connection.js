/**
 * Script de test de connexion WordPress
 * À exécuter pour vérifier la configuration
 */

require('dotenv').config({ path: '.env.local' });

// Utiliser fetch natif de Node.js 18+ ou installer node-fetch
let fetch;
try {
  fetch = globalThis.fetch;
} catch (error) {
  fetch = require('node-fetch');
}

// Configuration depuis les variables d'environnement
const WORDPRESS_URL =
  process.env.WORDPRESS_URL || 'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com';
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

async function testWordPressConnection() {
  console.log('🧪 Test de connexion WordPress');
  console.log('================================');

  // Vérification de la configuration
  console.log('\n🔍 1. Vérification de la configuration...');
  console.log(`URL WordPress: ${WORDPRESS_URL}`);
  console.log(`Consumer Key: ${WC_CONSUMER_KEY ? '✅ Fourni' : '❌ Manquant'}`);
  console.log(`Consumer Secret: ${WC_CONSUMER_SECRET ? '✅ Fourni' : '❌ Manquant'}`);

  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.log("\n❌ Configuration incomplète. Veuillez vérifier vos variables d'environnement.");
    return;
  }

  try {
    // Test 1: Connexion WooCommerce REST API
    console.log('\n📦 2. Test de connexion WooCommerce REST API...');
    const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

    const wcResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!wcResponse.ok) {
      console.log(`❌ Erreur WooCommerce REST API: ${wcResponse.status} - ${wcResponse.statusText}`);
      const errorText = await wcResponse.text();
      console.log(`Détails: ${errorText}`);
    } else {
      const wcData = await wcResponse.json();
      console.log(`✅ WooCommerce REST API connecté - ${wcData.length} produits trouvés`);
      console.log(`Premier produit: ${wcData[0]?.name || 'Aucun produit'}`);
    }

    // Test 2: Connexion GraphQL
    console.log('\n🔗 3. Test de connexion GraphQL...');
    const graphqlQuery = {
      query: `
        query GetProducts {
          products(first: 5) {
            nodes {
              id
              name
              slug
              description
              price
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      `,
    };

    const graphqlResponse = await fetch(`${WORDPRESS_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
    });

    if (!graphqlResponse.ok) {
      console.log(`❌ Erreur GraphQL: ${graphqlResponse.status} - ${graphqlResponse.statusText}`);
    } else {
      const graphqlData = await graphqlResponse.json();
      if (graphqlData.errors) {
        console.log(`❌ Erreur GraphQL: ${graphqlData.errors[0].message}`);
      } else {
        console.log(`✅ GraphQL connecté - ${graphqlData.data.products.nodes.length} produits trouvés`);
        console.log(`Premier produit GraphQL: ${graphqlData.data.products.nodes[0]?.name || 'Aucun produit'}`);
      }
    }

    // Test 3: Test de création de produit
    console.log('\n✍️ 4. Test de création de produit...');
    const testProduct = {
      name: 'Test Product Script',
      type: 'simple',
      regular_price: '99.99',
      description: 'Produit de test créé depuis le script',
      short_description: 'Test de création',
      manage_stock: true,
      stock_quantity: 10,
    };

    const createResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testProduct),
    });

    if (!createResponse.ok) {
      console.log(`❌ Erreur création produit: ${createResponse.status} - ${createResponse.statusText}`);
      const errorText = await createResponse.text();
      console.log(`Détails: ${errorText}`);
    } else {
      const createdProduct = await createResponse.json();
      console.log(`✅ Produit test créé avec succès - ID: ${createdProduct.id}`);

      // Nettoyer le produit test
      const deleteResponse = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products/${createdProduct.id}?force=true`, {
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      if (deleteResponse.ok) {
        console.log('🧹 Produit test supprimé');
      } else {
        console.log('⚠️ Impossible de supprimer le produit test');
      }
    }

    console.log('\n🎉 Tests terminés !');
  } catch (error) {
    console.log(`\n❌ Erreur générale: ${error.message}`);
  }
}

// Exécution du test
testWordPressConnection();
