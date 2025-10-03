#!/usr/bin/env node

/**
 * Script de correction d'urgence pour les erreurs d'exports
 * Restaure les exports corrects et corrige les imports
 */

const fs = require('fs');
const path = require('path');

console.log("🚨 Correction d'Urgence des Erreurs d'Exports");
console.log('============================================\n');

// Fonction pour restaurer les exports corrects
function restoreExports() {
  console.log('🔧 Restauration des exports corrects...\n');

  const filesToFix = [
    {
      file: 'src/hooks/useSupabaseProducts.ts',
      fixes: [
        { from: 'export const _useProducts = (', to: 'export const useProducts = (' },
        {
          from: "// import { productService, type ProductFilters } from '@/services/productService';",
          to: "import { productService, type ProductFilters } from '@/services/productService';",
        },
      ],
    },
    {
      file: 'src/services/productService.ts',
      fixes: [{ from: 'export const _productService = {', to: 'export const productService = {' }],
    },
    {
      file: 'src/hooks/useWordPressProducts.ts',
      fixes: [{ from: 'export const _useWordPressProducts = (', to: 'export const useWordPressProducts = (' }],
    },
    {
      file: 'src/hooks/useWordPressCart.ts',
      fixes: [{ from: 'export const _useWordPressCart = (', to: 'export const useWordPressCart = (' }],
    },
    {
      file: 'src/store/wordpress-cart.ts',
      fixes: [{ from: 'export const _useWordPressCartStore = (', to: 'export const useWordPressCartStore = (' }],
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
        console.log(`✅ Exports restaurés dans ${fileFix.file}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${fileFix.file}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec exports restaurés\n`);
  return fixedCount;
}

// Fonction pour corriger les erreurs de parsing restantes
function fixRemainingParsingErrors() {
  console.log('🔧 Correction des erreurs de parsing restantes...\n');

  const criticalFiles = [
    'src/components/ChameleoInteractiveLenses.tsx',
    'src/components/ChameleoLensTechnologies.tsx',
    'src/components/ChameleoManufacturing.tsx',
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

      // Corriger les erreurs de parsing spécifiques
      content = content.replace(/className="bg-muted\/50"/g, 'className="bg-muted/50"');
      content = content.replace(/&apos;/g, "'");
      content = content.replace(/&quot;/g, '"');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Erreurs de parsing corrigées dans ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec erreurs de parsing corrigées\n`);
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
  console.log("🚀 Démarrage de la correction d'urgence des exports...\n");

  let totalFixed = 0;

  // 1. Restaurer les exports corrects
  totalFixed += restoreExports();

  // 2. Corriger les erreurs de parsing restantes
  totalFixed += fixRemainingParsingErrors();

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
