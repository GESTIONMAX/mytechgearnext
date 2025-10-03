#!/usr/bin/env node

/**
 * Script d'import WooCommerce pour MyTechGear
 *
 * Ce script permet d'importer des produits, catégories et variantes
 * depuis WooCommerce vers la base de données locale
 *
 * Usage: node scripts/woocommerce-import.js [options]
 * Options:
 *   --products     Importer les produits
 *   --categories   Importer les catégories
 *   --variations   Importer les variantes
 *   --all          Importer tout (défaut)
 *   --dry-run      Simulation sans sauvegarde
 *   --verbose      Affichage détaillé
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

// Configuration
const CONFIG = {
  WORDPRESS_URL:
    process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com',
  WC_CONSUMER_KEY: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  WC_CONSUMER_SECRET: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  OUTPUT_DIR: './data/import',
  LOG_FILE: './logs/woocommerce-import.log',
  BATCH_SIZE: 50,
  DELAY_BETWEEN_REQUESTS: 100, // ms
};

// Types de données
const IMPORT_TYPES = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  VARIATIONS: 'variations',
  ATTRIBUTES: 'attributes',
};

// Couleurs pour les logs
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

class WooCommerceImporter {
  constructor(options = {}) {
    this.options = {
      dryRun: false,
      verbose: false,
      importProducts: true,
      importCategories: true,
      importVariations: true,
      importAttributes: true,
      ...options,
    };

    this.stats = {
      products: { imported: 0, errors: 0, skipped: 0 },
      categories: { imported: 0, errors: 0, skipped: 0 },
      variations: { imported: 0, errors: 0, skipped: 0 },
      attributes: { imported: 0, errors: 0, skipped: 0 },
    };

    this.auth = Buffer.from(`${CONFIG.WC_CONSUMER_KEY}:${CONFIG.WC_CONSUMER_SECRET}`).toString('base64');

    // Créer les dossiers nécessaires
    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = [CONFIG.OUTPUT_DIR, './logs', './data'];
    dirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.log(`📁 Dossier créé: ${dir}`, 'BLUE');
      }
    });
  }

  log(message, color = 'RESET', type = 'INFO') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'ERROR' ? '❌' : type === 'SUCCESS' ? '✅' : type === 'WARNING' ? '⚠️' : 'ℹ️';
    const coloredMessage = `${COLORS[color]}${prefix} [${timestamp}] ${message}${COLORS.RESET}`;

    console.log(coloredMessage);

    // Écrire dans le fichier de log
    const logEntry = `[${timestamp}] ${type}: ${message}\n`;
    fs.appendFileSync(CONFIG.LOG_FILE, logEntry);
  }

  async makeRequest(endpoint, method = 'GET', data = null) {
    const url = `${CONFIG.WORDPRESS_URL}/wp-json/wc/v3/${endpoint}`;

    const options = {
      method,
      headers: {
        Authorization: `Basic ${this.auth}`,
        'Content-Type': 'application/json',
        'User-Agent': 'MyTechGear-Importer/1.0',
      },
    };

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      this.log(`Erreur API: ${error.message}`, 'RED', 'ERROR');
      throw error;
    }
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async importCategories() {
    this.log('🔄 Import des catégories...', 'CYAN');

    try {
      const categories = await this.makeRequest('products/categories?per_page=100');

      const processedCategories = categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        parent: cat.parent,
        count: cat.count,
        image: cat.image,
        menu_order: cat.menu_order,
        imported_at: new Date().toISOString(),
      }));

      if (!this.options.dryRun) {
        const outputFile = path.join(CONFIG.OUTPUT_DIR, 'categories.json');
        fs.writeFileSync(outputFile, JSON.stringify(processedCategories, null, 2));
        this.log(`💾 Catégories sauvegardées: ${outputFile}`, 'GREEN');
      }

      this.stats.categories.imported = processedCategories.length;
      this.log(`✅ ${processedCategories.length} catégories importées`, 'GREEN', 'SUCCESS');

      return processedCategories;
    } catch (error) {
      this.stats.categories.errors++;
      this.log(`❌ Erreur import catégories: ${error.message}`, 'RED', 'ERROR');
      throw error;
    }
  }

  async importProducts() {
    this.log('🔄 Import des produits...', 'CYAN');

    try {
      let allProducts = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        this.log(`📄 Récupération page ${page}...`, 'BLUE');

        const products = await this.makeRequest(`products?per_page=${CONFIG.BATCH_SIZE}&page=${page}`);

        if (products.length === 0) {
          hasMore = false;
          break;
        }

        allProducts = allProducts.concat(products);
        page++;

        // Délai entre les requêtes pour éviter la surcharge
        await this.delay(CONFIG.DELAY_BETWEEN_REQUESTS);
      }

      const processedProducts = allProducts.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        short_description: product.short_description,
        sku: product.sku,
        price: product.price,
        regular_price: product.regular_price,
        sale_price: product.sale_price,
        stock_quantity: product.stock_quantity,
        stock_status: product.stock_status,
        weight: product.weight,
        dimensions: product.dimensions,
        categories: product.categories,
        tags: product.tags,
        images: product.images,
        attributes: product.attributes,
        variations: product.variations,
        type: product.type,
        status: product.status,
        featured: product.featured,
        catalog_visibility: product.catalog_visibility,
        date_created: product.date_created,
        date_modified: product.date_modified,
        imported_at: new Date().toISOString(),
      }));

      if (!this.options.dryRun) {
        const outputFile = path.join(CONFIG.OUTPUT_DIR, 'products.json');
        fs.writeFileSync(outputFile, JSON.stringify(processedProducts, null, 2));
        this.log(`💾 Produits sauvegardés: ${outputFile}`, 'GREEN');
      }

      this.stats.products.imported = processedProducts.length;
      this.log(`✅ ${processedProducts.length} produits importés`, 'GREEN', 'SUCCESS');

      return processedProducts;
    } catch (error) {
      this.stats.products.errors++;
      this.log(`❌ Erreur import produits: ${error.message}`, 'RED', 'ERROR');
      throw error;
    }
  }

  async importProductVariations() {
    this.log('🔄 Import des variantes de produits...', 'CYAN');

    try {
      // D'abord récupérer tous les produits
      const products = await this.makeRequest('products?per_page=100');
      const variableProducts = products.filter((p) => p.type === 'variable');

      let allVariations = [];

      for (const product of variableProducts) {
        this.log(`🔍 Récupération des variantes pour: ${product.name}`, 'BLUE');

        try {
          const variations = await this.makeRequest(`products/${product.id}/variations?per_page=100`);

          const processedVariations = variations.map((variation) => ({
            id: variation.id,
            product_id: product.id,
            product_name: product.name,
            sku: variation.sku,
            price: variation.price,
            regular_price: variation.regular_price,
            sale_price: variation.sale_price,
            stock_quantity: variation.stock_quantity,
            stock_status: variation.stock_status,
            weight: variation.weight,
            dimensions: variation.dimensions,
            image: variation.image,
            attributes: variation.attributes,
            status: variation.status,
            date_created: variation.date_created,
            date_modified: variation.date_modified,
            imported_at: new Date().toISOString(),
          }));

          allVariations = allVariations.concat(processedVariations);

          // Délai entre les requêtes
          await this.delay(CONFIG.DELAY_BETWEEN_REQUESTS);
        } catch (error) {
          this.log(`⚠️ Erreur variantes pour ${product.name}: ${error.message}`, 'YELLOW', 'WARNING');
          this.stats.variations.errors++;
        }
      }

      if (!this.options.dryRun) {
        const outputFile = path.join(CONFIG.OUTPUT_DIR, 'variations.json');
        fs.writeFileSync(outputFile, JSON.stringify(allVariations, null, 2));
        this.log(`💾 Variantes sauvegardées: ${outputFile}`, 'GREEN');
      }

      this.stats.variations.imported = allVariations.length;
      this.log(`✅ ${allVariations.length} variantes importées`, 'GREEN', 'SUCCESS');

      return allVariations;
    } catch (error) {
      this.stats.variations.errors++;
      this.log(`❌ Erreur import variantes: ${error.message}`, 'RED', 'ERROR');
      throw error;
    }
  }

  async importAttributes() {
    this.log('🔄 Import des attributs de produits...', 'CYAN');

    try {
      const attributes = await this.makeRequest('products/attributes?per_page=100');

      const processedAttributes = attributes.map((attr) => ({
        id: attr.id,
        name: attr.name,
        slug: attr.slug,
        type: attr.type,
        order_by: attr.order_by,
        has_archives: attr.has_archives,
        imported_at: new Date().toISOString(),
      }));

      if (!this.options.dryRun) {
        const outputFile = path.join(CONFIG.OUTPUT_DIR, 'attributes.json');
        fs.writeFileSync(outputFile, JSON.stringify(processedAttributes, null, 2));
        this.log(`💾 Attributs sauvegardés: ${outputFile}`, 'GREEN');
      }

      this.stats.attributes.imported = processedAttributes.length;
      this.log(`✅ ${processedAttributes.length} attributs importés`, 'GREEN', 'SUCCESS');

      return processedAttributes;
    } catch (error) {
      this.stats.attributes.errors++;
      this.log(`❌ Erreur import attributs: ${error.message}`, 'RED', 'ERROR');
      throw error;
    }
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      config: {
        wordpress_url: CONFIG.WORDPRESS_URL,
        dry_run: this.options.dryRun,
        batch_size: CONFIG.BATCH_SIZE,
      },
      stats: this.stats,
      summary: {
        total_imported: Object.values(this.stats).reduce((sum, stat) => sum + stat.imported, 0),
        total_errors: Object.values(this.stats).reduce((sum, stat) => sum + stat.errors, 0),
        total_skipped: Object.values(this.stats).reduce((sum, stat) => sum + stat.skipped, 0),
      },
    };

    if (!this.options.dryRun) {
      const reportFile = path.join(CONFIG.OUTPUT_DIR, 'import-report.json');
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
      this.log(`📊 Rapport sauvegardé: ${reportFile}`, 'GREEN');
    }

    // Affichage du résumé
    this.log("\n📊 RÉSUMÉ DE L'IMPORT", 'BRIGHT');
    this.log('═'.repeat(50), 'CYAN');
    this.log(`📦 Produits: ${this.stats.products.imported} importés, ${this.stats.products.errors} erreurs`, 'GREEN');
    this.log(
      `📁 Catégories: ${this.stats.categories.imported} importées, ${this.stats.categories.errors} erreurs`,
      'GREEN',
    );
    this.log(
      `🔀 Variantes: ${this.stats.variations.imported} importées, ${this.stats.variations.errors} erreurs`,
      'GREEN',
    );
    this.log(
      `🏷️ Attributs: ${this.stats.attributes.imported} importés, ${this.stats.attributes.errors} erreurs`,
      'GREEN',
    );
    this.log('═'.repeat(50), 'CYAN');
    this.log(`✅ Total: ${report.summary.total_imported} éléments importés`, 'GREEN', 'SUCCESS');
    this.log(`❌ Total: ${report.summary.total_errors} erreurs`, report.summary.total_errors > 0 ? 'RED' : 'GREEN');
  }

  async run() {
    this.log("🚀 Démarrage de l'import WooCommerce", 'BRIGHT');
    this.log(`🌐 URL WordPress: ${CONFIG.WORDPRESS_URL}`, 'BLUE');
    this.log(
      `🔑 Clé API: ${CONFIG.WC_CONSUMER_KEY ? '✅ Configurée' : '❌ Manquante'}`,
      CONFIG.WC_CONSUMER_KEY ? 'GREEN' : 'RED',
    );
    this.log(
      `🔐 Secret API: ${CONFIG.WC_CONSUMER_SECRET ? '✅ Configuré' : '❌ Manquant'}`,
      CONFIG.WC_CONSUMER_SECRET ? 'GREEN' : 'RED',
    );
    this.log(
      `🧪 Mode simulation: ${this.options.dryRun ? '✅ Activé' : '❌ Désactivé'}`,
      this.options.dryRun ? 'YELLOW' : 'GREEN',
    );

    if (!CONFIG.WC_CONSUMER_KEY || !CONFIG.WC_CONSUMER_SECRET) {
      this.log("❌ Clés API WooCommerce manquantes. Vérifiez vos variables d'environnement.", 'RED', 'ERROR');
      process.exit(1);
    }

    try {
      const startTime = Date.now();

      // Import des catégories
      if (this.options.importCategories) {
        await this.importCategories();
      }

      // Import des attributs
      if (this.options.importAttributes) {
        await this.importAttributes();
      }

      // Import des produits
      if (this.options.importProducts) {
        await this.importProducts();
      }

      // Import des variantes
      if (this.options.importVariations) {
        await this.importProductVariations();
      }

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      this.log(`⏱️ Import terminé en ${duration}s`, 'GREEN', 'SUCCESS');
      this.generateReport();
    } catch (error) {
      this.log(`💥 Erreur fatale: ${error.message}`, 'RED', 'ERROR');
      process.exit(1);
    }
  }
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);

  const options = {
    dryRun: args.includes('--dry-run'),
    verbose: args.includes('--verbose'),
    importProducts: args.includes('--products') || args.includes('--all') || args.length === 0,
    importCategories: args.includes('--categories') || args.includes('--all') || args.length === 0,
    importVariations: args.includes('--variations') || args.includes('--all') || args.length === 0,
    importAttributes: args.includes('--attributes') || args.includes('--all') || args.length === 0,
  };

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node scripts/woocommerce-import.js [options]

Options:
  --products       Importer les produits
  --categories     Importer les catégories  
  --variations     Importer les variantes
  --attributes     Importer les attributs
  --all            Importer tout (défaut)
  --dry-run        Simulation sans sauvegarde
  --verbose        Affichage détaillé
  --help, -h       Afficher cette aide

Exemples:
  node scripts/woocommerce-import.js --all --dry-run
  node scripts/woocommerce-import.js --products --variations
  node scripts/woocommerce-import.js --categories --verbose
    `);
    process.exit(0);
  }

  const importer = new WooCommerceImporter(options);
  await importer.run();
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Erreur non gérée:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Exception non capturée:', error);
  process.exit(1);
});

// Exécution
if (require.main === module) {
  main().catch((error) => {
    console.error('💥 Erreur fatale:', error);
    process.exit(1);
  });
}

module.exports = WooCommerceImporter;
