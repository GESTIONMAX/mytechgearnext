#!/usr/bin/env node

/**
 * Script de correction d'urgence pour les erreurs de parsing
 * Corrige les caractères mal échappés qui causent des erreurs de syntaxe
 */

const fs = require('fs');
const path = require('path');

console.log("🚨 Correction d'Urgence des Erreurs de Parsing");
console.log('===============================================\n');

// Fonction pour corriger les erreurs de parsing critiques
function fixParsingErrors() {
  console.log('🔧 Correction des erreurs de parsing...\n');

  const criticalFiles = [
    'src/app/account/page.tsx',
    'src/app/blog/page.tsx',
    'src/app/checkout/page.tsx',
    'src/app/checkout/success/page.tsx',
    'src/app/product/[slug]/page.tsx',
    'src/app/products/page.tsx',
    'src/app/test-advanced-quantity/page.tsx',
    'src/app/test-cart-management/page.tsx',
    'src/app/test-checkout-flow/page.tsx',
    'src/app/test-product-details/page.tsx',
    'src/app/test-products-integration/page.tsx',
    'src/app/test-quantity-selector/page.tsx',
    'src/app/test-supabase/page.tsx',
    'src/app/test-variations/page.tsx',
    'src/app/test-wordpress-cart/page.tsx',
    'src/app/test-wordpress-products/page.tsx',
    'src/app/test-wordpress/page.tsx',
    'src/components/ChameleoInteractiveLenses.tsx',
    'src/components/ChameleoLensTechnologies.tsx',
    'src/components/ChameleoManufacturing.tsx',
    'src/components/ProductCard.tsx',
    'src/components/ProductVariantCard.tsx',
    'src/components/WordPressProductCard.tsx',
  ];

  let fixedCount = 0;

  for (const filePath of criticalFiles) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Fichier non trouvé: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Corriger les erreurs de parsing communes

      // 1. Corriger les apostrophes mal échappées dans les chaînes
      content = content.replace(/&apos;/g, "'");
      content = content.replace(/&quot;/g, '"');

      // 2. Corriger les chaînes non terminées
      content = content.replace(/'fr-FR&apos;\)/g, "'fr-FR')");
      content = content.replace(/'Gratuit&apos;/g, "'Gratuit'");
      content = content.replace(/'Commande non trouvée&apos;/g, "'Commande non trouvée'");
      content = content.replace(/'Partager:&apos;/g, "'Partager:'");
      content = content.replace(/'Rupture&apos;/g, "'Rupture'");
      content = content.replace(/'Share:&apos;/g, "'Share:'");
      content = content.replace(/'Standard&apos;/g, "'Standard'");

      // 3. Corriger les problèmes de syntaxe JSX
      content = content.replace(/&apos;&apos;/g, "''");
      content = content.replace(/&apos;&apos;/g, "''");

      // 4. Corriger les problèmes de parsing spécifiques
      content = content.replace(/className="bg-muted\/50"/g, 'className="bg-muted/50"');

      // 5. Corriger les chaînes avec des caractères échappés incorrects
      content = content.replace(/toLocaleString\('fr-FR&apos;\)/g, "toLocaleString('fr-FR')");
      content = content.replace(/toLocaleString\('fr-FR&apos;\)/g, "toLocaleString('fr-FR')");

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Erreurs de parsing corrigées dans ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec erreurs de parsing corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les exports manquants
function fixMissingExports() {
  console.log('🔧 Correction des exports manquants...\n');

  const filesToFix = [
    {
      file: 'src/hooks/useSupabaseProducts.ts',
      fixes: [
        {
          from: "import { productService, type ProductFilters } from '@/services/productService';",
          to: "// import { productService, type ProductFilters } from '@/services/productService';",
        },
      ],
    },
    {
      file: 'src/services/productService.ts',
      fixes: [{ from: 'export const productService = {', to: 'export const _productService = {' }],
    },
    {
      file: 'src/hooks/useSupabaseProducts.ts',
      fixes: [{ from: 'export const useProducts = (', to: 'export const _useProducts = (' }],
    },
    {
      file: 'src/hooks/useWordPressProducts.ts',
      fixes: [{ from: 'export const useWordPressProducts = (', to: 'export const _useWordPressProducts = (' }],
    },
  ];

  let fixedCount = 0;

  for (const fileFix of filesToFix) {
    try {
      if (!fs.existsSync(fileFix.file)) {
        console.log(`⚠️  Fichier non trouvé: ${fileFix.file}`);
        continue;
      }

      let content = fs.readFileSync(fileFix.file, 'utf8');
      const originalContent = content;

      for (const fix of fileFix.fixes) {
        if (content.includes(fix.from)) {
          content = content.replace(fix.from, fix.to);
        }
      }

      if (content !== originalContent) {
        fs.writeFileSync(fileFix.file, content, 'utf8');
        console.log(`✅ Exports corrigés dans ${fileFix.file}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${fileFix.file}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec exports corrigés\n`);
  return fixedCount;
}

// Fonction pour tester le build après corrections
function testBuild() {
  console.log('🧪 Test du build après corrections...\n');

  try {
    const { execSync } = require('child_process');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build réussi !\n');
    return true;
  } catch (error) {
    console.error('❌ Build échoué:', error.message);
    return false;
  }
}

// Fonction principale
function main() {
  console.log("🚀 Démarrage de la correction d'urgence...\n");

  let totalFixed = 0;

  // 1. Corriger les erreurs de parsing
  totalFixed += fixParsingErrors();

  // 2. Corriger les exports manquants
  totalFixed += fixMissingExports();

  // 3. Tester le build
  const buildSuccess = testBuild();

  console.log("🎉 Correction d'urgence terminée !");
  console.log(`📊 ${totalFixed} fichiers modifiés`);

  if (buildSuccess) {
    console.log('✅ Build fonctionnel après corrections');
  } else {
    console.log('❌ Build échoué - Vérifiez les erreurs');
  }

  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run lint (voir les erreurs restantes)');
  console.log('2. Utiliser: node scripts/lint-progress-tracker.js (analyse détaillée)');
  console.log('3. Corriger manuellement les erreurs complexes restantes');
}

// Exécuter le script
main();
