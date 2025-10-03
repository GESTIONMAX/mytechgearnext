#!/usr/bin/env node

/**
 * Script pour corriger les derniers exports manquants
 * Corrige les 2 derniers exports avec des underscores
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Correction des Derniers Exports Manquants');
console.log('===========================================\n');

// Fonction pour corriger les derniers exports
function fixLastExports() {
  console.log('🔧 Correction des derniers exports...\n');

  const filesToFix = [
    {
      file: 'src/services/productService.ts',
      fixes: [
        {
          from: 'export const _productService = new ProductService();',
          to: 'export const productService = new ProductService();',
        },
      ],
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
          console.log(`✅ Export corrigé dans ${fileFix.file}: ${fix.from} -> ${fix.to}`);
        }
      }

      if (content !== originalContent) {
        fs.writeFileSync(fileFix.file, content, 'utf8');
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
  console.log('🚀 Démarrage de la correction des derniers exports...\n');

  let totalFixed = 0;

  // 1. Corriger les derniers exports
  totalFixed += fixLastExports();

  // 2. Tester le build
  const buildSuccess = testBuild();

  console.log('🎉 Correction des derniers exports terminée !');
  console.log(`📊 ${totalFixed} fichiers modifiés`);

  if (buildSuccess) {
    console.log('✅ Build fonctionnel après corrections');
    console.log('\n🎯 Prochaines étapes:');
    console.log('1. Exécuter: npm run lint (voir les erreurs restantes)');
    console.log('2. Utiliser: node scripts/lint-progress-tracker.js (analyse détaillée)');
    console.log('3. Corriger manuellement les erreurs complexes restantes');
  } else {
    console.log('❌ Build échoué - Vérifiez les erreurs');
    console.log('\n🔍 Analyse des erreurs restantes:');
    console.log('1. Vérifiez les exports manquants dans les fichiers');
    console.log('2. Assurez-vous que tous les imports sont corrects');
    console.log('3. Vérifiez la syntaxe des fichiers modifiés');
  }
}

// Exécuter le script
main();
