#!/usr/bin/env node

/**
 * Script pour créer les produits manquants dans WooCommerce
 * 
 * Ce script crée les 5 produits manquants basés sur votre interface
 */

const https = require('https');
require('dotenv').config({ path: '.env.local' });

const CONFIG = {
  WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com',
  WC_CONSUMER_KEY: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  WC_CONSUMER_SECRET: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
};

// Les 5 produits manquants basés sur votre interface
const MISSING_PRODUCTS = [
  {
    name: "Shield",
    description: "Lunettes de soleil de sport nouvelle génération avec réglage à double teinte",
    type: "variable",
    categories: [{ id: 16, name: "Sport" }],
    price: "199",
    regular_price: "199"
  },
  {
    name: "Prime", 
    description: "Lunettes de soleil classiques avec réglage manuel et automatique de la teinte",
    type: "variable",
    categories: [{ id: 16, name: "Sport" }],
    price: "249",
    regular_price: "249"
  },
  {
    name: "Duck Classic",
    description: "Lunettes de soleil intelligentes à teinte réglable et compatibles avec une application avec audio intégré",
    type: "variable", 
    categories: [{ id: 16, name: "Sport" }],
    price: "299",
    regular_price: "299"
  },
  {
    name: "Dragon",
    description: "Lunettes adaptatives avec verres à cristaux liquides intelligents",
    type: "variable",
    categories: [{ id: 16, name: "Sport" }],
    price: "349",
    regular_price: "349"
  },
  {
    name: "Aura",
    description: "Lunettes de soleil rétro avec verres Prismatic™ à changement de couleur",
    type: "variable",
    categories: [{ id: 18, name: "Prismatic" }],
    price: "385",
    regular_price: "385"
  },
  {
    name: "Euphoria",
    description: "Sublimez votre look avec Euphoria, les lunettes de soleil avec verres à couleur réglable. Dotées de verres Prismatic™ à changement de couleur",
    type: "variable",
    categories: [{ id: 18, name: "Prismatic" }],
    price: "425",
    regular_price: "425"
  }
];

class MissingProductsCreator {
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
      CYAN: '\x1b[36m'
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
          'Authorization': `Basic ${this.auth}`,
          'Content-Type': 'application/json',
          'User-Agent': 'MyTechGear-Creator/1.0'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
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

  async createProduct(productData) {
    this.log(`🔄 Création du produit: ${productData.name}`, 'BLUE');
    
    try {
      const product = await this.makeRequest('products', 'POST', {
        name: productData.name,
        description: productData.description,
        type: productData.type,
        status: 'publish',
        categories: productData.categories,
        price: productData.price,
        regular_price: productData.regular_price,
        stock_quantity: 10,
        stock_status: 'instock',
        manage_stock: true,
        attributes: [
          {
            name: "Couleur Monture",
            slug: "pa_couleur-monture",
            type: "select",
            options: ["Blanc", "Noir Mat", "Bleu", "Obsidian", "Neon", "Black Gold", "Gold"]
          },
          {
            name: "Couleur Verre", 
            slug: "pa_couleur-verre",
            type: "select",
            options: ["Rouge", "Bleu", "Fire", "Alpha Purple", "Alpha Blue", "Smoke", "Rose"]
          },
          {
            name: "Option Audio",
            slug: "pa_option-audio", 
            type: "select",
            options: ["Avec audio", "Sans audio"]
          }
        ]
      });
      
      this.log(`✅ Produit créé: ${productData.name} (ID: ${product.id})`, 'GREEN');
      return product;
    } catch (error) {
      this.log(`❌ Erreur création ${productData.name}: ${error.message}`, 'RED');
      return null;
    }
  }

  async createVariations(productId, productName) {
    this.log(`🔀 Création des variantes pour: ${productName}`, 'BLUE');
    
    const variations = [
      {
        attributes: [
          { name: "Couleur Monture", option: "Blanc" },
          { name: "Couleur Verre", option: "Rouge" },
          { name: "Option Audio", option: "Avec audio" }
        ],
        price: "249",
        stock_quantity: 10
      },
      {
        attributes: [
          { name: "Couleur Monture", option: "Noir Mat" },
          { name: "Couleur Verre", option: "Bleu" },
          { name: "Option Audio", option: "Sans audio" }
        ],
        price: "199",
        stock_quantity: 10
      }
    ];
    
    let created = 0;
    for (const variation of variations) {
      try {
        await this.makeRequest(`products/${productId}/variations`, 'POST', {
          ...variation,
          status: 'publish',
          stock_status: 'instock'
        });
        created++;
        this.log(`✅ Variante créée pour ${productName}`, 'GREEN');
      } catch (error) {
        this.log(`❌ Erreur variante ${productName}: ${error.message}`, 'RED');
      }
      
      // Délai entre les créations
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return created;
  }

  async createAllMissingProducts() {
    this.log('🚀 CRÉATION DES PRODUITS MANQUANTS', 'BRIGHT');
    this.log('═'.repeat(50), 'CYAN');
    
    let created = 0;
    let errors = 0;
    
    for (const productData of MISSING_PRODUCTS) {
      const product = await this.createProduct(productData);
      
      if (product) {
        // Créer des variantes pour le produit
        const variationsCreated = await this.createVariations(product.id, product.name);
        this.log(`✅ ${variationsCreated} variantes créées pour ${product.name}`, 'GREEN');
        created++;
      } else {
        errors++;
      }
      
      // Délai entre les créations
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    this.log('\n📊 RÉSULTATS:', 'BRIGHT');
    this.log(`✅ Produits créés: ${created}`, 'GREEN');
    this.log(`❌ Erreurs: ${errors}`, errors > 0 ? 'RED' : 'GREEN');
    
    if (created > 0) {
      this.log('\n🎉 CRÉATION TERMINÉE !', 'GREEN');
      this.log('Tous vos produits sont maintenant dans WooCommerce', 'GREEN');
    }
  }
}

// Exécution
const creator = new MissingProductsCreator();
creator.createAllMissingProducts().catch(error => {
  console.error('💥 Erreur fatale:', error.message);
  process.exit(1);
});
