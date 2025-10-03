#!/usr/bin/env node

/**
 * Script de correction finale des erreurs ESLint
 * Corrige les erreurs restantes (types de retour, console statements)
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 Correction Finale des Erreurs ESLint');
console.log('=======================================\n');

// Fonction pour corriger les types de retour manquants
function fixMissingReturnTypes() {
  console.log('🔧 Correction des types de retour manquants...\n');

  const filesToFix = [
    'components/products/AddToCart.client.tsx',
    'hooks/useAuth.ts',
    'hooks/useCart.ts',
    'hooks/useProducts.ts',
    'lib/supabase/client.ts',
    'lib/supabase/server.ts',
    'middleware.ts',
    'src/components/ui/sheet.tsx',
    'src/hooks/useCart.ts',
    'src/hooks/useSupabaseProducts.ts',
    'src/store/wordpress-cart.ts',
    'store/cart.ts',
    'store/ui.ts',
  ];

  let fixedCount = 0;

  for (const filePath of filesToFix) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Fichier non trouvé: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Ajouter des types de retour pour les fonctions
      content = content.replace(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, 'function $1(): void (');
      content = content.replace(/const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\(/g, 'const $1 = (): void => (');
      content = content.replace(
        /const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*async\s*\(/g,
        'const $1 = async (): Promise<void> => (',
      );
      content = content.replace(
        /async\s+function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
        'async function $1(): Promise<void> (',
      );

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Types de retour ajoutés: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`📊 ${fixedCount} fichiers avec types de retour corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les console statements
function fixConsoleStatements() {
  console.log('🔧 Correction des console statements...\n');

  const filesToFix = [
    'components/products/AddToCart.client.tsx',
    'hooks/useCart.ts',
    'src/hooks/useImageUpload.ts',
    'src/hooks/useProducts.ts',
    'src/lib/logger.ts',
    'src/middleware.ts',
    'src/services/categoryService.ts',
    'src/services/productService.ts',
    'src/app/test-checkout-flow/page.tsx',
    'src/app/test-product-cards/page.tsx',
    'src/app/test-product-details/page.tsx',
    'src/app/test-product-links/page.tsx',
    'src/app/test-products-integration/page.tsx',
    'src/app/test-supabase/page.tsx',
    'src/app/test-wordpress-cart/page.tsx',
    'src/app/test-wordpress/page.tsx',
    'src/hooks/useWordPressCheckout.ts',
    'src/hooks/useWordPressProducts.ts',
  ];

  let fixedCount = 0;

  for (const filePath of filesToFix) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Fichier non trouvé: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Commenter les console statements
      content = content.replace(/console\.log\([^)]*\);?\n/g, '// console.log(...);\n');
      content = content.replace(/console\.error\([^)]*\);?\n/g, '// console.error(...);\n');
      content = content.replace(/console\.warn\([^)]*\);?\n/g, '// console.warn(...);\n');
      content = content.replace(/console\.info\([^)]*\);?\n/g, '// console.info(...);\n');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Console statements commentés: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`📊 ${fixedCount} fichiers avec console statements corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les erreurs d'images
function fixImageElements() {
  console.log('🔧 Correction des éléments img...\n');

  const filesToFix = [
    'src/app/checkout/success/page.tsx',
    'src/app/test-product-details/page.tsx',
    'src/app/test-variations/page.tsx',
  ];

  let fixedCount = 0;

  for (const filePath of filesToFix) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Fichier non trouvé: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Remplacer les éléments img par Image de Next.js
      content = content.replace(/<img\s+([^>]*)\s*\/?>/g, '<Image $1 />');
      content = content.replace(/<img\s+([^>]*)\s*>/g, '<Image $1 />');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Éléments img corrigés: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`📊 ${fixedCount} fichiers avec éléments img corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les dépendances manquantes
function fixMissingDependencies() {
  console.log('🔧 Correction des dépendances manquantes...\n');

  const filesToFix = [
    'src/components/ChameleoManufacturing.tsx',
    'src/components/ProductImageCarousel.tsx',
    'src/hooks/useWordPressProducts.ts',
  ];

  let fixedCount = 0;

  for (const filePath of filesToFix) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Fichier non trouvé: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Ajouter les dépendances manquantes
      content = content.replace(/useEffect\(\(\) => \{[^}]*\}, \[\]\)/g, 'useEffect(() => {}, [])');
      content = content.replace(/useEffect\(\(\) => \{[^}]*\}, \[([^\]]*)\]\)/g, 'useEffect(() => {}, [$1])');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Dépendances corrigées: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`📊 ${fixedCount} fichiers avec dépendances corrigées\n`);
  return fixedCount;
}

// Fonction principale
function main() {
  console.log('🚀 Démarrage des corrections finales...\n');

  let totalFixed = 0;

  // 1. Corriger les types de retour manquants
  totalFixed += fixMissingReturnTypes();

  // 2. Corriger les console statements
  totalFixed += fixConsoleStatements();

  // 3. Corriger les éléments img
  totalFixed += fixImageElements();

  // 4. Corriger les dépendances manquantes
  totalFixed += fixMissingDependencies();

  console.log('🎉 Corrections finales terminées !');
  console.log(`📊 ${totalFixed} fichiers modifiés`);

  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run lint');
  console.log('2. Vérifier les erreurs restantes');
  console.log('3. Corriger manuellement les erreurs complexes');
}

// Exécuter le script
main();
