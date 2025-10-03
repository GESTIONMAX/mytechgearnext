#!/usr/bin/env node

/**
 * Script pour restaurer les produits de la corbeille
 */

const https = require('https');
require('dotenv').config({ path: '.env.local' });

const CONFIG = {
  WORDPRESS_URL:
    process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com',
  WC_CONSUMER_KEY: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  WC_CONSUMER_SECRET: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
};

class ProductRestorer {
  constructor() {
    this.auth = Buffer.from(`${CONFIG.WC_CONSUMER_KEY}:${CONFIG.WC_CONSUMER_SECRET}`).toString('base64');
  }

  log(message, color = 'RESET') {
    const colors = {
      RESET: '\x1b[0m',
      GREEN: '\x1b[32m',
      RED: '\x1b[31m',
      BLUE: '\x1b[34m',
      YELLOW: '\x1b[33m',
      BRIGHT: '\x1b[1m',
    };
    console.log(`${colors[color]}${message}${colors.RESET}`);
  }

  async makeRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: CONFIG.WORDPRESS_URL.replace('https://', ''),
        port: 443,
        path: `/wp-json/wc/v3/${endpoint}`,
        method,
        headers: {
          Authorization: `Basic ${this.auth}`,
          'Content-Type': 'application/json',
          'User-Agent': 'MyTechGear-Restorer/1.0',
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

      if (data) {
        req.write(JSON.stringify(data));
      }
      req.end();
    });
  }

  async getTrashProducts() {
    this.log('🗑️ Récupération des produits en corbeille...', 'BLUE');

    try {
      const products = await this.makeRequest('products?per_page=100&status=trash');
      this.log(`📊 ${products.length} produits trouvés en corbeille`, 'BLUE');

      products.forEach((product, index) => {
        this.log(`\n${index + 1}. PRODUIT EN CORBEILLE:`, 'YELLOW');
        this.log(`   ID: ${product.id}`, 'BLUE');
        this.log(`   Nom: ${product.name}`, 'BLUE');
        this.log(`   Type: ${product.type}`, 'BLUE');
        this.log(`   Date suppression: ${product.date_modified}`, 'BLUE');
      });

      return products;
    } catch (error) {
      this.log(`❌ Erreur: ${error.message}`, 'RED');
      return [];
    }
  }

  async restoreProduct(productId, productName) {
    this.log(`🔄 Restauration du produit: ${productName} (ID: ${productId})`, 'BLUE');

    try {
      // Restaurer le produit en changeant son statut
      const updatedProduct = await this.makeRequest(`products/${productId}`, 'PUT', {
        status: 'publish',
      });

      this.log(`✅ Produit restauré: ${productName}`, 'GREEN');
      return updatedProduct;
    } catch (error) {
      this.log(`❌ Erreur restauration ${productName}: ${error.message}`, 'RED');
      return null;
    }
  }

  async restoreAllProducts() {
    this.log('🚀 RESTAURATION DES PRODUITS DE LA CORBEILLE', 'BRIGHT');
    this.log('═'.repeat(50), 'BLUE');

    // Récupérer les produits en corbeille
    const trashProducts = await this.getTrashProducts();

    if (trashProducts.length === 0) {
      this.log('✅ Aucun produit en corbeille à restaurer', 'GREEN');
      return;
    }

    this.log(`\n🔄 Restauration de ${trashProducts.length} produits...`, 'BLUE');

    let restored = 0;
    let errors = 0;

    for (const product of trashProducts) {
      const result = await this.restoreProduct(product.id, product.name);
      if (result) {
        restored++;
      } else {
        errors++;
      }

      // Délai entre les restaurations
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    this.log('\n📊 RÉSULTATS:', 'BRIGHT');
    this.log(`✅ Produits restaurés: ${restored}`, 'GREEN');
    this.log(`❌ Erreurs: ${errors}`, errors > 0 ? 'RED' : 'GREEN');

    if (restored > 0) {
      this.log('\n🎉 RESTAURATION TERMINÉE !', 'GREEN');
      this.log('Vos produits sont maintenant visibles dans votre back office', 'GREEN');
    }
  }
}

// Exécution
const restorer = new ProductRestorer();
restorer.restoreAllProducts().catch((error) => {
  console.error('💥 Erreur fatale:', error.message);
  process.exit(1);
});
