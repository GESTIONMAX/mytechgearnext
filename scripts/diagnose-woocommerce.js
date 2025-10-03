#!/usr/bin/env node

/**
 * Script de diagnostic WooCommerce
 *
 * Ce script vérifie en détail ce qui se trouve dans votre back office
 * et affiche toutes les informations de manière claire
 */

const https = require('https');
require('dotenv').config({ path: '.env.local' });

// Configuration
const CONFIG = {
  WORDPRESS_URL:
    process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com',
  WC_CONSUMER_KEY: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  WC_CONSUMER_SECRET: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
};

// Couleurs pour l'affichage
const COLORS = {
  RESET: '\x1b[0m',
  BRIGHT: '\x1b[1m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m',
};

class WooCommerceDiagnostic {
  constructor() {
    this.auth = Buffer.from(`${CONFIG.WC_CONSUMER_KEY}:${CONFIG.WC_CONSUMER_SECRET}`).toString('base64');
  }

  log(message, color = 'RESET') {
    console.log(`${COLORS[color]}${message}${COLORS.RESET}`);
  }

  makeRequest(endpoint) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: CONFIG.WORDPRESS_URL.replace('https://', ''),
        port: 443,
        path: `/wp-json/wc/v3/${endpoint}`,
        method: 'GET',
        headers: {
          Authorization: `Basic ${this.auth}`,
          'Content-Type': 'application/json',
          'User-Agent': 'MyTechGear-Diagnostic/1.0',
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (error) {
            reject(new Error(`Erreur parsing JSON: ${error.message}\nRéponse: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }

  async checkConnection() {
    this.log('\n🔍 VÉRIFICATION DE LA CONNEXION', 'BRIGHT');
    this.log('═'.repeat(50), 'CYAN');

    try {
      this.log(`🌐 URL WordPress: ${CONFIG.WORDPRESS_URL}`, 'BLUE');
      this.log(
        `🔑 Clé API: ${CONFIG.WC_CONSUMER_KEY ? '✅ Configurée' : '❌ Manquante'}`,
        CONFIG.WC_CONSUMER_KEY ? 'GREEN' : 'RED',
      );
      this.log(
        `🔐 Secret API: ${CONFIG.WC_CONSUMER_SECRET ? '✅ Configuré' : '❌ Manquant'}`,
        CONFIG.WC_CONSUMER_SECRET ? 'GREEN' : 'RED',
      );

      if (!CONFIG.WC_CONSUMER_KEY || !CONFIG.WC_CONSUMER_SECRET) {
        this.log('❌ Clés API manquantes !', 'RED');
        return false;
      }

      this.log('✅ Connexion configurée', 'GREEN');
      return true;
    } catch (error) {
      this.log(`❌ Erreur de connexion: ${error.message}`, 'RED');
      return false;
    }
  }

  async checkProducts() {
    this.log('\n📦 VÉRIFICATION DES PRODUITS', 'BRIGHT');
    this.log('═'.repeat(50), 'CYAN');

    try {
      const products = await this.makeRequest('products');

      this.log(`📊 Nombre total de produits: ${products.length}`, 'BLUE');

      if (products.length === 0) {
        this.log('⚠️ AUCUN PRODUIT TROUVÉ !', 'YELLOW');
        this.log('Vérifiez que vous avez des produits dans votre back office WordPress', 'YELLOW');
        return [];
      }

      products.forEach((product, index) => {
        this.log(`\n${index + 1}. PRODUIT:`, 'GREEN');
        this.log(`   ID: ${product.id}`, 'BLUE');
        this.log(`   Nom: ${product.name}`, 'BLUE');
        this.log(`   Type: ${product.type}`, 'BLUE');
        this.log(`   Statut: ${product.status}`, 'BLUE');
        this.log(`   Prix: ${product.price}€`, 'BLUE');
        this.log(`   Stock: ${product.stock_quantity || 'N/A'}`, 'BLUE');
        this.log(`   SKU: ${product.sku || 'N/A'}`, 'BLUE');
        this.log(`   Date création: ${product.date_created}`, 'BLUE');

        if (product.images && product.images.length > 0) {
          this.log(`   Images: ${product.images.length} image(s)`, 'BLUE');
          product.images.forEach((img, i) => {
            this.log(`     ${i + 1}. ${img.src}`, 'CYAN');
          });
        }

        if (product.categories && product.categories.length > 0) {
          this.log(`   Catégories:`, 'BLUE');
          product.categories.forEach((cat) => {
            this.log(`     - ${cat.name} (ID: ${cat.id})`, 'CYAN');
          });
        }
      });

      return products;
    } catch (error) {
      this.log(`❌ Erreur lors de la récupération des produits: ${error.message}`, 'RED');
      return [];
    }
  }

  async checkVariations(productId) {
    this.log(`\n🔀 VÉRIFICATION DES VARIANTES (Produit ID: ${productId})`, 'BRIGHT');
    this.log('═'.repeat(50), 'CYAN');

    try {
      const variations = await this.makeRequest(`products/${productId}/variations`);

      this.log(`📊 Nombre de variantes: ${variations.length}`, 'BLUE');

      if (variations.length === 0) {
        this.log('⚠️ AUCUNE VARIANTE TROUVÉE !', 'YELLOW');
        return [];
      }

      variations.forEach((variation, index) => {
        this.log(`\n${index + 1}. VARIANTE:`, 'GREEN');
        this.log(`   ID: ${variation.id}`, 'BLUE');
        this.log(`   SKU: ${variation.sku || 'N/A'}`, 'BLUE');
        this.log(`   Prix: ${variation.price}€`, 'BLUE');
        this.log(`   Stock: ${variation.stock_quantity || 'N/A'}`, 'BLUE');
        this.log(`   Statut: ${variation.status}`, 'BLUE');

        if (variation.attributes && variation.attributes.length > 0) {
          this.log(`   Attributs:`, 'BLUE');
          variation.attributes.forEach((attr) => {
            this.log(`     - ${attr.name}: ${attr.option}`, 'CYAN');
          });
        }

        if (variation.image && variation.image.src) {
          this.log(`   Image: ${variation.image.src}`, 'CYAN');
        }
      });

      return variations;
    } catch (error) {
      this.log(`❌ Erreur lors de la récupération des variantes: ${error.message}`, 'RED');
      return [];
    }
  }

  async checkCategories() {
    this.log('\n📁 VÉRIFICATION DES CATÉGORIES', 'BRIGHT');
    this.log('═'.repeat(50), 'CYAN');

    try {
      const categories = await this.makeRequest('products/categories');

      this.log(`📊 Nombre de catégories: ${categories.length}`, 'BLUE');

      if (categories.length === 0) {
        this.log('⚠️ AUCUNE CATÉGORIE TROUVÉE !', 'YELLOW');
        return [];
      }

      categories.forEach((category, index) => {
        this.log(`\n${index + 1}. CATÉGORIE:`, 'GREEN');
        this.log(`   ID: ${category.id}`, 'BLUE');
        this.log(`   Nom: ${category.name}`, 'BLUE');
        this.log(`   Slug: ${category.slug}`, 'BLUE');
        this.log(`   Nombre de produits: ${category.count}`, 'BLUE');
        this.log(`   Parent: ${category.parent || 'Aucun'}`, 'BLUE');
      });

      return categories;
    } catch (error) {
      this.log(`❌ Erreur lors de la récupération des catégories: ${error.message}`, 'RED');
      return [];
    }
  }

  async checkAttributes() {
    this.log('\n🏷️ VÉRIFICATION DES ATTRIBUTS', 'BRIGHT');
    this.log('═'.repeat(50), 'CYAN');

    try {
      const attributes = await this.makeRequest('products/attributes');

      this.log(`📊 Nombre d'attributs: ${attributes.length}`, 'BLUE');

      if (attributes.length === 0) {
        this.log('⚠️ AUCUN ATTRIBUT TROUVÉ !', 'YELLOW');
        return [];
      }

      attributes.forEach((attribute, index) => {
        this.log(`\n${index + 1}. ATTRIBUT:`, 'GREEN');
        this.log(`   ID: ${attribute.id}`, 'BLUE');
        this.log(`   Nom: ${attribute.name}`, 'BLUE');
        this.log(`   Slug: ${attribute.slug}`, 'BLUE');
        this.log(`   Type: ${attribute.type}`, 'BLUE');
        this.log(`   Ordre: ${attribute.order_by}`, 'BLUE');
      });

      return attributes;
    } catch (error) {
      this.log(`❌ Erreur lors de la récupération des attributs: ${error.message}`, 'RED');
      return [];
    }
  }

  async generateReport(products, categories, attributes) {
    this.log('\n📊 RAPPORT COMPLET', 'BRIGHT');
    this.log('═'.repeat(50), 'CYAN');

    this.log(`📦 Produits: ${products.length}`, 'GREEN');
    this.log(`📁 Catégories: ${categories.length}`, 'GREEN');
    this.log(`🏷️ Attributs: ${attributes.length}`, 'GREEN');

    // Compter les variantes
    let totalVariations = 0;
    for (const product of products) {
      if (product.type === 'variable') {
        try {
          const variations = await this.makeRequest(`products/${product.id}/variations`);
          totalVariations += variations.length;
        } catch (error) {
          // Ignorer les erreurs pour le comptage
        }
      }
    }

    this.log(`🔀 Variantes totales: ${totalVariations}`, 'GREEN');

    this.log('\n🎯 RÉSUMÉ:', 'BRIGHT');
    if (products.length === 0) {
      this.log('❌ PROBLÈME: Aucun produit trouvé dans votre back office', 'RED');
      this.log('💡 SOLUTIONS POSSIBLES:', 'YELLOW');
      this.log('   1. Vérifiez que vous êtes connecté à la bonne instance WordPress', 'YELLOW');
      this.log('   2. Vérifiez les permissions de votre compte utilisateur', 'YELLOW');
      this.log('   3. Vérifiez que WooCommerce est activé', 'YELLOW');
      this.log('   4. Vérifiez que vous avez des produits dans /wp-admin/products.php', 'YELLOW');
    } else {
      this.log('✅ Votre back office contient des données !', 'GREEN');
      this.log("💡 Si vous ne les voyez pas dans l'interface:", 'YELLOW');
      this.log('   1. Videz le cache de votre navigateur', 'YELLOW');
      this.log('   2. Vérifiez les permissions utilisateur', 'YELLOW');
      this.log('   3. Accédez à /wp-admin/products.php', 'YELLOW');
    }
  }

  async run() {
    this.log('🚀 DIAGNOSTIC WOOCOMMERCE - MyTechGear', 'BRIGHT');
    this.log('═'.repeat(60), 'CYAN');

    // Vérifier la connexion
    const connectionOk = await this.checkConnection();
    if (!connectionOk) {
      this.log('\n❌ DIAGNOSTIC ARRÊTÉ - Problème de connexion', 'RED');
      return;
    }

    // Vérifier les produits
    const products = await this.checkProducts();

    // Vérifier les catégories
    const categories = await this.checkCategories();

    // Vérifier les attributs
    const attributes = await this.checkAttributes();

    // Vérifier les variantes pour chaque produit variable
    for (const product of products) {
      if (product.type === 'variable') {
        await this.checkVariations(product.id);
      }
    }

    // Générer le rapport final
    await this.generateReport(products, categories, attributes);

    this.log('\n🏁 DIAGNOSTIC TERMINÉ', 'BRIGHT');
  }
}

// Exécution
const diagnostic = new WooCommerceDiagnostic();
diagnostic.run().catch((error) => {
  console.error('💥 Erreur fatale:', error.message);
  process.exit(1);
});
