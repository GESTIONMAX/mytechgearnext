#!/usr/bin/env node

/**
 * Script d'import spécialisé pour les variantes WooCommerce
 *
 * Ce script se concentre sur l'import des variantes de produits
 * avec mapping spécifique pour les attributs:
 * - Option Audio (Avec audio / Sans audio)
 * - Couleur monture (Blanc, Noir Mat, Bleu, Obsidian, Neon, Black Gold, Gold)
 * - Couleur verre (Rouge, Bleu, Fire, Alpha Purple, Alpha Blue, Smoke, Rose)
 *
 * Usage: node scripts/woocommerce-variants-import.js [options]
 */

const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

// Configuration
const CONFIG = {
  WORDPRESS_URL:
    process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com',
  WC_CONSUMER_KEY: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
  WC_CONSUMER_SECRET: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  OUTPUT_DIR: './data/import/variants',
  LOG_FILE: './logs/variants-import.log',
  BATCH_SIZE: 25,
  DELAY_BETWEEN_REQUESTS: 200,
};

// Mapping des attributs spécifiques
const ATTRIBUTE_MAPPING = {
  audio: {
    name: 'Option Audio',
    slug: 'option-audio',
    options: {
      'Avec audio': 'avec-audio',
      'Sans audio': 'sans-audio',
    },
  },
  frame_color: {
    name: 'Couleur monture',
    slug: 'couleur-monture',
    options: {
      Blanc: 'blanc',
      'Noir Mat': 'noir-mat',
      Bleu: 'bleu',
      Obsidian: 'obsidian',
      Neon: 'neon',
      'Black Gold': 'black-gold',
      Gold: 'gold',
    },
  },
  lens_color: {
    name: 'Couleur verre',
    slug: 'couleur-verre',
    options: {
      Rouge: 'rouge',
      Bleu: 'bleu',
      Fire: 'fire',
      'Alpha Purple': 'alpha-purple',
      'Alpha Blue': 'alpha-blue',
      Smoke: 'smoke',
      'Smoke Lenses': 'smoke-lenses',
      'Calm Lenses': 'calm-lenses',
      Rose: 'rose',
    },
  },
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

class WooCommerceVariantsImporter {
  constructor(options = {}) {
    this.options = {
      dryRun: false,
      verbose: false,
      createAttributes: true,
      importVariations: true,
      mapExistingData: true,
      ...options,
    };

    this.stats = {
      products: { processed: 0, errors: 0 },
      variations: { imported: 0, errors: 0, skipped: 0 },
      attributes: { created: 0, errors: 0 },
      mappings: { created: 0, errors: 0 },
    };

    this.auth = Buffer.from(`${CONFIG.WC_CONSUMER_KEY}:${CONFIG.WC_CONSUMER_SECRET}`).toString('base64');
    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = [CONFIG.OUTPUT_DIR, './logs', './data/import/variants'];
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
        'User-Agent': 'MyTechGear-Variants-Importer/1.0',
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

      return await response.json();
    } catch (error) {
      this.log(`Erreur API: ${error.message}`, 'RED', 'ERROR');
      throw error;
    }
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async createProductAttributes() {
    this.log('🔄 Création des attributs de produits...', 'CYAN');

    const attributes = [];

    for (const [key, config] of Object.entries(ATTRIBUTE_MAPPING)) {
      try {
        this.log(`📝 Création attribut: ${config.name}`, 'BLUE');

        const attributeData = {
          name: config.name,
          slug: config.slug,
          type: 'select',
          order_by: 'menu_order',
          has_archives: false,
        };

        if (!this.options.dryRun) {
          const result = await this.makeRequest('products/attributes', 'POST', attributeData);
          attributes.push(result);
          this.stats.attributes.created++;
          this.log(`✅ Attribut créé: ${config.name} (ID: ${result.id})`, 'GREEN', 'SUCCESS');
        } else {
          this.log(`🧪 [DRY-RUN] Attribut serait créé: ${config.name}`, 'YELLOW');
        }

        await this.delay(CONFIG.DELAY_BETWEEN_REQUESTS);
      } catch (error) {
        this.stats.attributes.errors++;
        this.log(`❌ Erreur création attribut ${config.name}: ${error.message}`, 'RED', 'ERROR');
      }
    }

    return attributes;
  }

  async getVariableProducts() {
    this.log('🔍 Récupération des produits variables...', 'CYAN');

    try {
      const products = await this.makeRequest('products?type=variable&per_page=100');
      this.log(`📦 ${products.length} produits variables trouvés`, 'GREEN');
      return products;
    } catch (error) {
      this.log(`❌ Erreur récupération produits: ${error.message}`, 'RED', 'ERROR');
      throw error;
    }
  }

  async importProductVariations(productId, productName) {
    this.log(`🔍 Import des variantes pour: ${productName}`, 'BLUE');

    try {
      const variations = await this.makeRequest(`products/${productId}/variations?per_page=100`);

      const processedVariations = variations.map((variation) => {
        // Mapping des attributs spécifiques
        const mappedAttributes = this.mapVariationAttributes(variation);

        return {
          id: variation.id,
          product_id: productId,
          product_name: productName,
          sku: variation.sku,
          price: variation.price,
          regular_price: variation.regular_price,
          sale_price: variation.sale_price,
          stock_quantity: variation.stock_quantity,
          stock_status: variation.stock_status,
          weight: variation.weight,
          dimensions: variation.dimensions,
          image: variation.image,
          attributes: mappedAttributes,
          status: variation.status,
          date_created: variation.date_created,
          date_modified: variation.date_modified,
          imported_at: new Date().toISOString(),
        };
      });

      if (!this.options.dryRun) {
        const outputFile = path.join(CONFIG.OUTPUT_DIR, `variations-${productId}.json`);
        fs.writeFileSync(outputFile, JSON.stringify(processedVariations, null, 2));
        this.log(`💾 Variantes sauvegardées: ${outputFile}`, 'GREEN');
      }

      this.stats.variations.imported += processedVariations.length;
      this.log(`✅ ${processedVariations.length} variantes importées pour ${productName}`, 'GREEN', 'SUCCESS');

      return processedVariations;
    } catch (error) {
      this.stats.variations.errors++;
      this.log(`❌ Erreur import variantes pour ${productName}: ${error.message}`, 'RED', 'ERROR');
      return [];
    }
  }

  mapVariationAttributes(variation) {
    const mappedAttributes = {};

    if (variation.attributes && Array.isArray(variation.attributes)) {
      variation.attributes.forEach((attr) => {
        const attrName = attr.name.toLowerCase();
        const attrValue = attr.option;

        // Mapping Audio
        if (attrName.includes('audio') || attrName.includes('option')) {
          mappedAttributes.audio = {
            name: 'Option Audio',
            value: attrValue,
            slug: attrValue === 'Avec audio' ? 'avec-audio' : 'sans-audio',
          };
        }

        // Mapping Couleur monture
        if (attrName.includes('monture') || attrName.includes('frame')) {
          mappedAttributes.frame_color = {
            name: 'Couleur monture',
            value: attrValue,
            slug: this.getSlugForValue('frame_color', attrValue),
          };
        }

        // Mapping Couleur verre
        if (attrName.includes('verre') || attrName.includes('lens')) {
          mappedAttributes.lens_color = {
            name: 'Couleur verre',
            value: attrValue,
            slug: this.getSlugForValue('lens_color', attrValue),
          };
        }
      });
    }

    return mappedAttributes;
  }

  getSlugForValue(attributeType, value) {
    const config = ATTRIBUTE_MAPPING[attributeType];
    if (config && config.options[value]) {
      return config.options[value];
    }
    return value.toLowerCase().replace(/\s+/g, '-');
  }

  async createVariationMapping() {
    this.log('🔄 Création du mapping des variantes...', 'CYAN');

    try {
      const products = await this.getVariableProducts();
      const allVariations = [];

      for (const product of products) {
        this.stats.products.processed++;
        this.log(`📦 Traitement: ${product.name}`, 'BLUE');

        const variations = await this.importProductVariations(product.id, product.name);
        allVariations.push(...variations);

        await this.delay(CONFIG.DELAY_BETWEEN_REQUESTS);
      }

      // Créer un mapping global
      const globalMapping = {
        metadata: {
          created_at: new Date().toISOString(),
          total_products: products.length,
          total_variations: allVariations.length,
          attributes_mapped: Object.keys(ATTRIBUTE_MAPPING),
        },
        products: products.map((product) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          type: product.type,
          status: product.status,
        })),
        variations: allVariations,
        attribute_mapping: ATTRIBUTE_MAPPING,
      };

      if (!this.options.dryRun) {
        const mappingFile = path.join(CONFIG.OUTPUT_DIR, 'variations-mapping.json');
        fs.writeFileSync(mappingFile, JSON.stringify(globalMapping, null, 2));
        this.log(`💾 Mapping global sauvegardé: ${mappingFile}`, 'GREEN');
      }

      this.stats.mappings.created = allVariations.length;
      this.log(`✅ Mapping créé pour ${allVariations.length} variantes`, 'GREEN', 'SUCCESS');

      return globalMapping;
    } catch (error) {
      this.stats.mappings.errors++;
      this.log(`❌ Erreur création mapping: ${error.message}`, 'RED', 'ERROR');
      throw error;
    }
  }

  generateVariantsReport() {
    const report = {
      timestamp: new Date().toISOString(),
      config: {
        wordpress_url: CONFIG.WORDPRESS_URL,
        dry_run: this.options.dryRun,
        attributes_mapped: Object.keys(ATTRIBUTE_MAPPING),
      },
      stats: this.stats,
      attribute_mapping: ATTRIBUTE_MAPPING,
      summary: {
        total_products_processed: this.stats.products.processed,
        total_variations_imported: this.stats.variations.imported,
        total_attributes_created: this.stats.attributes.created,
        total_mappings_created: this.stats.mappings.created,
        total_errors: Object.values(this.stats).reduce((sum, stat) => sum + stat.errors, 0),
      },
    };

    if (!this.options.dryRun) {
      const reportFile = path.join(CONFIG.OUTPUT_DIR, 'variants-import-report.json');
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
      this.log(`📊 Rapport sauvegardé: ${reportFile}`, 'GREEN');
    }

    // Affichage du résumé
    this.log("\n📊 RÉSUMÉ DE L'IMPORT DES VARIANTES", 'BRIGHT');
    this.log('═'.repeat(60), 'CYAN');
    this.log(`📦 Produits traités: ${this.stats.products.processed}`, 'GREEN');
    this.log(`🔀 Variantes importées: ${this.stats.variations.imported}`, 'GREEN');
    this.log(`🏷️ Attributs créés: ${this.stats.attributes.created}`, 'GREEN');
    this.log(`🗺️ Mappings créés: ${this.stats.mappings.created}`, 'GREEN');
    this.log('═'.repeat(60), 'CYAN');

    // Détail des attributs mappés
    this.log('\n🏷️ ATTRIBUTS MAPPÉS:', 'BRIGHT');
    Object.entries(ATTRIBUTE_MAPPING).forEach(([key, config]) => {
      this.log(`  • ${config.name} (${config.slug})`, 'BLUE');
      Object.entries(config.options).forEach(([value, slug]) => {
        this.log(`    - ${value} → ${slug}`, 'CYAN');
      });
    });
  }

  async run() {
    this.log("🚀 Démarrage de l'import des variantes WooCommerce", 'BRIGHT');
    this.log(`🌐 URL WordPress: ${CONFIG.WORDPRESS_URL}`, 'BLUE');
    this.log(
      `🔑 Clé API: ${CONFIG.WC_CONSUMER_KEY ? '✅ Configurée' : '❌ Manquante'}`,
      CONFIG.WC_CONSUMER_KEY ? 'GREEN' : 'RED',
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

      // Créer les attributs si nécessaire
      if (this.options.createAttributes) {
        await this.createProductAttributes();
      }

      // Créer le mapping des variantes
      if (this.options.mapExistingData) {
        await this.createVariationMapping();
      }

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      this.log(`⏱️ Import terminé en ${duration}s`, 'GREEN', 'SUCCESS');
      this.generateVariantsReport();
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
    createAttributes: !args.includes('--no-attributes'),
    mapExistingData: !args.includes('--no-mapping'),
  };

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node scripts/woocommerce-variants-import.js [options]

Options:
  --dry-run        Simulation sans sauvegarde
  --verbose        Affichage détaillé
  --no-attributes  Ne pas créer les attributs
  --no-mapping     Ne pas créer le mapping
  --help, -h       Afficher cette aide

Exemples:
  node scripts/woocommerce-variants-import.js --dry-run --verbose
  node scripts/woocommerce-variants-import.js --no-attributes
  node scripts/woocommerce-variants-import.js --verbose

Attributs mappés:
  • Option Audio (Avec audio / Sans audio)
  • Couleur monture (Blanc, Noir Mat, Bleu, Obsidian, Neon, Black Gold, Gold)
  • Couleur verre (Rouge, Bleu, Fire, Alpha Purple, Alpha Blue, Smoke, Rose)
    `);
    process.exit(0);
  }

  const importer = new WooCommerceVariantsImporter(options);
  await importer.run();
}

// Gestion des erreurs
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

module.exports = WooCommerceVariantsImporter;
