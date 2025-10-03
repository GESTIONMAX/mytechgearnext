#!/usr/bin/env node

/**
 * Script de correction finale pour les erreurs critiques
 * Corrige les erreurs de parsing et les exports manquants
 */

const fs = require('fs');
const path = require('path');

console.log('🚨 Correction Finale des Erreurs Critiques');
console.log('==========================================\n');

// Fonction pour corriger les erreurs de parsing critiques
function fixCriticalParsingErrors() {
  console.log('🔧 Correction des erreurs de parsing critiques...\n');

  const criticalFiles = [
    'src/components/WordPressCartDrawer.tsx',
    'src/components/WordPressProductCardDetails.tsx',
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
      content = content.replace(/&apos;/g, "'");
      content = content.replace(/&quot;/g, '"');
      content = content.replace(/className="bg-muted\/50"/g, 'className="bg-muted/50"');

      // Corriger les chaînes mal échappées
      content = content.replace(/'Produit&apos;}/g, "'Produit'");
      content = content.replace(/join\(' - &apos;\)/g, "join(' - ')");
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

  console.log(`\n📊 ${fixedCount} fichiers avec erreurs de parsing corrigées\n`);
  return fixedCount;
}

// Fonction pour corriger les exports manquants
function fixMissingExports() {
  console.log('🔧 Correction des exports manquants...\n');

  const filesToFix = [
    {
      file: 'src/lib/supabase/client.ts',
      fixes: [{ from: 'export const _createClient = (', to: 'export const createClient = (' }],
    },
    {
      file: 'src/services/categoryService.ts',
      fixes: [{ from: 'export const _categoryService = {', to: 'export const categoryService = {' }],
    },
    {
      file: 'src/lib/logger.ts',
      fixes: [{ from: 'export const _logger = {', to: 'export const logger = {' }],
    },
    {
      file: 'src/hooks/useWordPressProductVariations.ts',
      fixes: [
        {
          from: 'export const _useWordPressProductVariations = (',
          to: 'export const useWordPressProductVariations = (',
        },
      ],
    },
    {
      file: 'src/hooks/useWordPressCheckout.ts',
      fixes: [{ from: 'export const _useWordPressCheckout = (', to: 'export const useWordPressCheckout = (' }],
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
  console.log('🚀 Démarrage de la correction finale...\n');

  let totalFixed = 0;

  // 1. Corriger les erreurs de parsing critiques
  totalFixed += fixCriticalParsingErrors();

  // 2. Corriger les exports manquants
  totalFixed += fixMissingExports();

  // 3. Tester le build
  const buildSuccess = testBuild();

  console.log('🎉 Correction finale terminée !');
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
