#!/usr/bin/env node

/**
 * Script de réparation critique - Correction des erreurs de syntaxe
 * Corrige les erreurs spécifiques identifiées dans le build
 */

const fs = require('fs');
const path = require('path');

console.log('🚨 Réparation Critique - Erreurs de Syntaxe');
console.log('============================================\n');

// Fonction pour corriger les erreurs spécifiques
function fixCriticalErrors() {
  console.log('🔧 Correction des erreurs critiques...\n');

  // 1. Corriger middleware.ts
  try {
    const middlewarePath = 'middleware.ts';
    if (fs.existsSync(middlewarePath)) {
      let content = fs.readFileSync(middlewarePath, 'utf8');

      // Corriger la syntaxe de la fonction middleware
      content = content.replace(
        /export async function middleware\(\): Promise<void> \(/g,
        'export async function middleware(request: NextRequest): Promise<NextResponse> {',
      );

      fs.writeFileSync(middlewarePath, content, 'utf8');
      console.log('✅ middleware.ts corrigé');
    }
  } catch (error) {
    console.error('❌ Erreur avec middleware.ts:', error.message);
  }

  // 2. Corriger src/app/checkout/success/page.tsx
  try {
    const filePath = 'src/app/checkout/success/page.tsx';
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Corriger les balises Image mal fermées
      content = content.replace(
        /<Image src=\{item\.image\.src\} alt=\{item\.name\} className="w-full h-full object-cover rounded-lg" \/ \/>/g,
        '<Image src={item.image.src} alt={item.name} className="w-full h-full object-cover rounded-lg" />',
      );

      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✅ checkout/success/page.tsx corrigé');
    }
  } catch (error) {
    console.error('❌ Erreur avec checkout/success/page.tsx:', error.message);
  }

  // 3. Corriger src/app/test-product-details/page.tsx
  try {
    const filePath = 'src/app/test-product-details/page.tsx';
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Corriger les balises Image mal fermées
      content = content.replace(
        /<Image src=\{product\.images\[0\]\.src\} alt=\{product\.name\} className="w-full h-full object-cover" \/ \/>/g,
        '<Image src={product.images[0].src} alt={product.name} className="w-full h-full object-cover" />',
      );

      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✅ test-product-details/page.tsx corrigé');
    }
  } catch (error) {
    console.error('❌ Erreur avec test-product-details/page.tsx:', error.message);
  }

  // 4. Corriger src/app/test-variations/page.tsx
  try {
    const filePath = 'src/app/test-variations/page.tsx';
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Corriger les balises Image mal fermées
      content = content.replace(
        /<Image src=\{variation\.image\} alt=\{variation\.name\} className="w-full h-20 object-cover rounded" \/ \/>/g,
        '<Image src={variation.image} alt={variation.name} className="w-full h-20 object-cover rounded" />',
      );

      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✅ test-variations/page.tsx corrigé');
    }
  } catch (error) {
    console.error('❌ Erreur avec test-variations/page.tsx:', error.message);
  }

  console.log('\n📊 Corrections critiques terminées\n');
}

// Fonction pour corriger tous les éléments Image mal fermés
function fixAllImageElements() {
  console.log('🔧 Correction de tous les éléments Image...\n');

  const filesToCheck = [
    'src/app/checkout/success/page.tsx',
    'src/app/test-product-details/page.tsx',
    'src/app/test-variations/page.tsx',
  ];

  let fixedCount = 0;

  for (const filePath of filesToCheck) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Fichier non trouvé: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Corriger tous les éléments Image mal fermés
      content = content.replace(/ \/ \/>/g, ' />');
      content = content.replace(/\/ \/>/g, '/>');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Éléments Image corrigés: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec éléments Image corrigés\n`);
  return fixedCount;
}

// Fonction principale
function main() {
  console.log('🚀 Démarrage de la réparation critique...\n');

  // 1. Corriger les erreurs spécifiques
  fixCriticalErrors();

  // 2. Corriger tous les éléments Image
  fixAllImageElements();

  console.log('🎉 Réparation critique terminée !');

  console.log('\n📋 Prochaines étapes:');
  console.log('1. Tester: npm run build');
  console.log('2. Vérifier que le build fonctionne');
  console.log('3. Relancer: npm run lint');
}

// Exécuter le script
main();
