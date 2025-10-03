#!/usr/bin/env node

/**
 * Script de mapping des données WooCommerce
 *
 * Ce script transforme les données WooCommerce importées
 * pour correspondre exactement à la structure de votre interface:
 * - Mapping des attributs spécifiques (Audio, Couleur monture, Couleur verre)
 * - Génération des SKUs selon votre format
 * - Création des relations parent-enfant
 * - Formatage des données pour l'affichage
 *
 * Usage: node scripts/woocommerce-data-mapper.js [options]
 */

const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

// Configuration
const CONFIG = {
  INPUT_DIR: './data/import',
  OUTPUT_DIR: './data/mapped',
  LOG_FILE: './logs/data-mapper.log',
};

// Mapping des attributs vers votre structure
const ATTRIBUTE_MAPPING = {
  // Option Audio
  audio: {
    'avec-audio': { label: 'Avec audio', color: '#e3f2fd', value: 'avec-audio' },
    'sans-audio': { label: 'Sans audio', color: '#fce4ec', value: 'sans-audio' },
  },

  // Couleur monture
  frame_color: {
    blanc: { label: 'Blanc', color: '#ffffff', value: 'blanc' },
    'noir-mat': { label: 'Noir Mat', color: '#424242', value: 'noir-mat' },
    bleu: { label: 'Bleu', color: '#2196f3', value: 'bleu' },
    obsidian: { label: 'Obsidian', color: '#212121', value: 'obsidian' },
    neon: { label: 'Neon', color: '#00e676', value: 'neon' },
    'black-gold': { label: 'Black Gold', color: '#ffd700', value: 'black-gold' },
    gold: { label: 'Gold', color: '#ffc107', value: 'gold' },
  },

  // Couleur verre
  lens_color: {
    rouge: { label: 'Rouge', color: '#f44336', value: 'rouge' },
    bleu: { label: 'Bleu', color: '#2196f3', value: 'bleu' },
    fire: { label: 'Fire', color: '#ff5722', value: 'fire' },
    'alpha-purple': { label: 'Alpha Purple', color: '#9c27b0', value: 'alpha-purple' },
    'alpha-blue': { label: 'Alpha Blue', color: '#3f51b5', value: 'alpha-blue' },
    smoke: { label: 'Smoke', color: '#607d8b', value: 'smoke' },
    'smoke-lenses': { label: 'Smoke Lenses', color: '#78909c', value: 'smoke-lenses' },
    'calm-lenses': { label: 'Calm Lenses', color: '#b0bec5', value: 'calm-lenses' },
    rose: { label: 'Rose', color: '#e91e63', value: 'rose' },
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

class WooCommerceDataMapper {
  constructor(options = {}) {
    this.options = {
      dryRun: false,
      verbose: false,
      generateSKUs: true,
      createRelations: true,
      formatForUI: true,
      ...options,
    };

    this.stats = {
      products: { mapped: 0, errors: 0 },
      variations: { mapped: 0, errors: 0 },
      skus: { generated: 0, errors: 0 },
      relations: { created: 0, errors: 0 },
    };

    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = [CONFIG.OUTPUT_DIR, './logs', './data/mapped'];
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

  generateSKU(variation, product) {
    try {
      // Format: SPR-{PRODUCT}-{FRAME}-{LENS}-{AUDIO}
      const productCode = this.getProductCode(product.name);
      const frameCode = this.getFrameCode(variation.attributes?.frame_color?.value);
      const lensCode = this.getLensCode(variation.attributes?.lens_color?.value);
      const audioCode = this.getAudioCode(variation.attributes?.audio?.value);

      const sku = `${productCode}-${frameCode}-${lensCode}-${audioCode}`;
      this.stats.skus.generated++;
      return sku;
    } catch (error) {
      this.stats.skus.errors++;
      this.log(`❌ Erreur génération SKU: ${error.message}`, 'RED', 'ERROR');
      return variation.sku || `SKU-${variation.id}`;
    }
  }

  getProductCode(productName) {
    const codes = {
      'Music Shield': 'MSH',
      Shield: 'SHL',
      Falcon: 'FAL',
      Prime: 'PRI',
      Dragon: 'DRG',
      Aura: 'AUR',
      Euphoria: 'EUP',
    };

    for (const [name, code] of Object.entries(codes)) {
      if (productName.toLowerCase().includes(name.toLowerCase())) {
        return code;
      }
    }

    return 'SPR'; // Code par défaut
  }

  getFrameCode(frameColor) {
    const codes = {
      blanc: 'BLC',
      'noir-mat': 'NBM',
      bleu: 'BLU',
      obsidian: 'OBS',
      neon: 'NEO',
      'black-gold': 'BGD',
      gold: 'GLD',
    };

    return codes[frameColor] || 'UNK';
  }

  getLensCode(lensColor) {
    const codes = {
      rouge: 'FIR',
      bleu: 'BLU',
      fire: 'FIR',
      'alpha-purple': 'PRL',
      'alpha-blue': 'ABL',
      smoke: 'SMK',
      'smoke-lenses': 'SML',
      'calm-lenses': 'CLM',
      rose: 'ROS',
    };

    return codes[lensColor] || 'UNK';
  }

  getAudioCode(audioOption) {
    return audioOption === 'avec-audio' ? 'AUDIO' : 'SANS';
  }

  mapVariationForUI(variation, product) {
    const mappedVariation = {
      id: variation.id,
      name: this.generateVariantName(variation, product),
      parent_product: product.name,
      sku: this.generateSKU(variation, product),
      price: variation.price,
      regular_price: variation.regular_price,
      sale_price: variation.sale_price,
      stock_quantity: variation.stock_quantity,
      stock_status: variation.stock_status,
      image: variation.image,
      attributes: this.mapAttributesForUI(variation.attributes),
      status: variation.status,
      date_created: variation.date_created,
      date_modified: variation.date_modified,
      imported_at: variation.imported_at,
    };

    return mappedVariation;
  }

  generateVariantName(variation, product) {
    const frameColor = variation.attributes?.frame_color?.value || 'Inconnue';
    const lensColor = variation.attributes?.lens_color?.value || 'Inconnue';
    const audioOption = variation.attributes?.audio?.value || 'Sans audio';

    const frameLabel = ATTRIBUTE_MAPPING.frame_color[frameColor]?.label || frameColor;
    const lensLabel = ATTRIBUTE_MAPPING.lens_color[lensColor]?.label || lensColor;
    const audioLabel = ATTRIBUTE_MAPPING.audio[audioOption]?.label || audioOption;

    return `${product.name} - Monture ${frameLabel}, Verres ${lensLabel} ${audioLabel}`;
  }

  mapAttributesForUI(attributes) {
    const mappedAttributes = {};

    if (attributes?.audio) {
      const audioConfig = ATTRIBUTE_MAPPING.audio[attributes.audio.value];
      mappedAttributes.audio = {
        ...attributes.audio,
        ...audioConfig,
      };
    }

    if (attributes?.frame_color) {
      const frameConfig = ATTRIBUTE_MAPPING.frame_color[attributes.frame_color.value];
      mappedAttributes.frame_color = {
        ...attributes.frame_color,
        ...frameConfig,
      };
    }

    if (attributes?.lens_color) {
      const lensConfig = ATTRIBUTE_MAPPING.lens_color[attributes.lens_color.value];
      mappedAttributes.lens_color = {
        ...attributes.lens_color,
        ...lensConfig,
      };
    }

    return mappedAttributes;
  }

  async loadImportedData() {
    this.log('📂 Chargement des données importées...', 'CYAN');

    const dataFiles = {
      products: path.join(CONFIG.INPUT_DIR, 'products.json'),
      variations: path.join(CONFIG.INPUT_DIR, 'variations.json'),
      categories: path.join(CONFIG.INPUT_DIR, 'categories.json'),
      attributes: path.join(CONFIG.INPUT_DIR, 'attributes.json'),
    };

    const data = {};

    for (const [type, filePath] of Object.entries(dataFiles)) {
      try {
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          data[type] = JSON.parse(content);
          this.log(`✅ ${type} chargés: ${data[type].length} éléments`, 'GREEN');
        } else {
          this.log(`⚠️ Fichier non trouvé: ${filePath}`, 'YELLOW', 'WARNING');
          data[type] = [];
        }
      } catch (error) {
        this.log(`❌ Erreur chargement ${type}: ${error.message}`, 'RED', 'ERROR');
        data[type] = [];
      }
    }

    return data;
  }

  async mapProducts(products) {
    this.log('🔄 Mapping des produits...', 'CYAN');

    const mappedProducts = products.map((product) => {
      this.stats.products.mapped++;

      return {
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
        type: product.type,
        status: product.status,
        featured: product.featured,
        catalog_visibility: product.catalog_visibility,
        date_created: product.date_created,
        date_modified: product.date_modified,
        imported_at: product.imported_at,
        mapped_at: new Date().toISOString(),
      };
    });

    this.log(`✅ ${mappedProducts.length} produits mappés`, 'GREEN', 'SUCCESS');
    return mappedProducts;
  }

  async mapVariations(variations, products) {
    this.log('🔄 Mapping des variantes...', 'CYAN');

    const productMap = new Map(products.map((p) => [p.id, p]));
    const mappedVariations = [];

    for (const variation of variations) {
      try {
        const product = productMap.get(variation.product_id);
        if (!product) {
          this.log(`⚠️ Produit parent non trouvé pour variante ${variation.id}`, 'YELLOW', 'WARNING');
          continue;
        }

        const mappedVariation = this.mapVariationForUI(variation, product);
        mappedVariations.push(mappedVariation);
        this.stats.variations.mapped++;

        if (this.options.verbose) {
          this.log(`✅ Variante mappée: ${mappedVariation.name}`, 'GREEN');
        }
      } catch (error) {
        this.stats.variations.errors++;
        this.log(`❌ Erreur mapping variante ${variation.id}: ${error.message}`, 'RED', 'ERROR');
      }
    }

    this.log(`✅ ${mappedVariations.length} variantes mappées`, 'GREEN', 'SUCCESS');
    return mappedVariations;
  }

  async createProductRelations(products, variations) {
    this.log('🔄 Création des relations produit-variantes...', 'CYAN');

    const relations = {};

    // Grouper les variantes par produit parent
    for (const variation of variations) {
      const productId = variation.product_id;
      if (!relations[productId]) {
        relations[productId] = {
          product: products.find((p) => p.id === productId),
          variations: [],
        };
      }
      relations[productId].variations.push(variation);
    }

    // Créer les relations
    const productRelations = Object.values(relations).map((relation) => {
      this.stats.relations.created++;

      return {
        product: relation.product,
        variations: relation.variations,
        total_variations: relation.variations.length,
        price_range: this.calculatePriceRange(relation.variations),
        attributes_summary: this.summarizeAttributes(relation.variations),
        created_at: new Date().toISOString(),
      };
    });

    this.log(`✅ ${productRelations.length} relations créées`, 'GREEN', 'SUCCESS');
    return productRelations;
  }

  calculatePriceRange(variations) {
    const prices = variations.map((v) => parseFloat(v.price) || 0).filter((p) => p > 0);
    if (prices.length === 0) return { min: 0, max: 0 };

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }

  summarizeAttributes(variations) {
    const summary = {
      audio_options: new Set(),
      frame_colors: new Set(),
      lens_colors: new Set(),
    };

    variations.forEach((variation) => {
      if (variation.attributes?.audio?.value) {
        summary.audio_options.add(variation.attributes.audio.value);
      }
      if (variation.attributes?.frame_color?.value) {
        summary.frame_colors.add(variation.attributes.frame_color.value);
      }
      if (variation.attributes?.lens_color?.value) {
        summary.lens_colors.add(variation.attributes.lens_color.value);
      }
    });

    return {
      audio_options: Array.from(summary.audio_options),
      frame_colors: Array.from(summary.frame_colors),
      lens_colors: Array.from(summary.lens_colors),
    };
  }

  async saveMappedData(mappedData) {
    this.log('💾 Sauvegarde des données mappées...', 'CYAN');

    if (this.options.dryRun) {
      this.log('🧪 [DRY-RUN] Données seraient sauvegardées', 'YELLOW');
      return;
    }

    const outputFiles = {
      'mapped-products.json': mappedData.products,
      'mapped-variations.json': mappedData.variations,
      'product-relations.json': mappedData.relations,
      'attribute-mapping.json': ATTRIBUTE_MAPPING,
    };

    for (const [filename, data] of Object.entries(outputFiles)) {
      const filePath = path.join(CONFIG.OUTPUT_DIR, filename);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      this.log(`💾 ${filename} sauvegardé`, 'GREEN');
    }
  }

  generateMappingReport(mappedData) {
    const report = {
      timestamp: new Date().toISOString(),
      config: {
        dry_run: this.options.dryRun,
        generate_skus: this.options.generateSKUs,
        create_relations: this.options.createRelations,
        format_for_ui: this.options.formatForUI,
      },
      stats: this.stats,
      summary: {
        total_products_mapped: this.stats.products.mapped,
        total_variations_mapped: this.stats.variations.mapped,
        total_skus_generated: this.stats.skus.generated,
        total_relations_created: this.stats.relations.created,
        total_errors: Object.values(this.stats).reduce((sum, stat) => sum + stat.errors, 0),
      },
      attribute_mapping: ATTRIBUTE_MAPPING,
    };

    if (!this.options.dryRun) {
      const reportFile = path.join(CONFIG.OUTPUT_DIR, 'mapping-report.json');
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
      this.log(`📊 Rapport sauvegardé: ${reportFile}`, 'GREEN');
    }

    // Affichage du résumé
    this.log('\n📊 RÉSUMÉ DU MAPPING', 'BRIGHT');
    this.log('═'.repeat(50), 'CYAN');
    this.log(`📦 Produits mappés: ${this.stats.products.mapped}`, 'GREEN');
    this.log(`🔀 Variantes mappées: ${this.stats.variations.mapped}`, 'GREEN');
    this.log(`🏷️ SKUs générés: ${this.stats.skus.generated}`, 'GREEN');
    this.log(`🔗 Relations créées: ${this.stats.relations.created}`, 'GREEN');
    this.log('═'.repeat(50), 'CYAN');
    this.log(
      `✅ Total: ${report.summary.total_products_mapped + report.summary.total_variations_mapped} éléments mappés`,
      'GREEN',
      'SUCCESS',
    );
    this.log(`❌ Total: ${report.summary.total_errors} erreurs`, report.summary.total_errors > 0 ? 'RED' : 'GREEN');
  }

  async run() {
    this.log('🚀 Démarrage du mapping des données WooCommerce', 'BRIGHT');
    this.log(`📂 Dossier d'entrée: ${CONFIG.INPUT_DIR}`, 'BLUE');
    this.log(`📁 Dossier de sortie: ${CONFIG.OUTPUT_DIR}`, 'BLUE');
    this.log(
      `🧪 Mode simulation: ${this.options.dryRun ? '✅ Activé' : '❌ Désactivé'}`,
      this.options.dryRun ? 'YELLOW' : 'GREEN',
    );

    try {
      const startTime = Date.now();

      // Charger les données importées
      const importedData = await this.loadImportedData();

      // Mapper les produits
      const mappedProducts = await this.mapProducts(importedData.products);

      // Mapper les variantes
      const mappedVariations = await this.mapVariations(importedData.variations, mappedProducts);

      // Créer les relations
      const relations = await this.createProductRelations(mappedProducts, mappedVariations);

      // Sauvegarder les données mappées
      const mappedData = {
        products: mappedProducts,
        variations: mappedVariations,
        relations: relations,
        categories: importedData.categories,
        attributes: importedData.attributes,
      };

      await this.saveMappedData(mappedData);

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      this.log(`⏱️ Mapping terminé en ${duration}s`, 'GREEN', 'SUCCESS');
      this.generateMappingReport(mappedData);
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
    generateSKUs: !args.includes('--no-skus'),
    createRelations: !args.includes('--no-relations'),
    formatForUI: !args.includes('--no-ui-format'),
  };

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node scripts/woocommerce-data-mapper.js [options]

Options:
  --dry-run        Simulation sans sauvegarde
  --verbose        Affichage détaillé
  --no-skus        Ne pas générer les SKUs
  --no-relations   Ne pas créer les relations
  --no-ui-format   Ne pas formater pour l'UI
  --help, -h      Afficher cette aide

Exemples:
  node scripts/woocommerce-data-mapper.js --dry-run --verbose
  node scripts/woocommerce-data-mapper.js --no-skus
  node scripts/woocommerce-data-mapper.js --verbose

Fonctionnalités:
  • Mapping des attributs spécifiques (Audio, Couleur monture, Couleur verre)
  • Génération des SKUs selon votre format
  • Création des relations parent-enfant
  • Formatage pour l'interface utilisateur
    `);
    process.exit(0);
  }

  const mapper = new WooCommerceDataMapper(options);
  await mapper.run();
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

module.exports = WooCommerceDataMapper;
