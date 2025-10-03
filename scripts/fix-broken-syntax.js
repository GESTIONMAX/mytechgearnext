#!/usr/bin/env node

/**
 * Script de réparation d'urgence - Correction de la syntaxe cassée
 * Restaure les apostrophes et guillemets dans le code JavaScript/TypeScript
 */

const fs = require('fs');
const path = require('path');

console.log("🚨 Réparation d'Urgence - Syntaxe Cassée");
console.log('==========================================\n');

// Fonction pour corriger la syntaxe cassée
function fixBrokenSyntax() {
  console.log('🔧 Correction de la syntaxe cassée...\n');

  const filesToFix = [
    'src/components/ChameleoCompactTestimonials.tsx',
    'src/components/ChameleoCommunity.tsx',
    'src/components/ChameleoComparison.tsx',
    'src/components/ChameleoHero.tsx',
    'src/components/ChameleoLensTechnologies.tsx',
    'src/components/ChameleoManufacturing.tsx',
    'src/components/ChameleoTechnologies.tsx',
    'src/components/ChameleoTestimonials.tsx',
    'src/app/checkout/page.tsx',
    'src/app/checkout/success/page.tsx',
    'src/app/product/[slug]/page.tsx',
    'src/app/product/aura/page.tsx',
    'src/app/product/falcon/page.tsx',
    'src/app/product/music-shield/page.tsx',
    'src/app/products/page.tsx',
    'src/app/test-advanced-quantity/page.tsx',
    'src/app/test-cart-management/page.tsx',
    'src/app/test-checkout-flow/page.tsx',
    'src/app/test-product-links/page.tsx',
    'src/app/test-products-integration/page.tsx',
    'src/app/test-quantity-selector/page.tsx',
    'src/app/test-supabase/page.tsx',
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

      // Corriger les apostrophes dans le code JavaScript/TypeScript
      content = content.replace(/&apos;/g, "'");

      // Corriger les guillemets dans le code JavaScript/TypeScript
      content = content.replace(/&quot;/g, '"');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Syntaxe corrigée: ${filePath}`);
        fixedCount++;
      } else {
        console.log(`ℹ️  Aucune correction nécessaire: ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec syntaxe corrigée\n`);
  return fixedCount;
}

// Fonction pour corriger spécifiquement les erreurs de build
function fixBuildErrors() {
  console.log('🔧 Correction des erreurs de build...\n');

  const criticalFiles = [
    'src/components/ChameleoCompactTestimonials.tsx',
    'src/components/ChameleoCommunity.tsx',
    'src/components/ChameleoComparison.tsx',
    'src/components/ChameleoHero.tsx',
    'src/components/ChameleoLensTechnologies.tsx',
    'src/components/ChameleoManufacturing.tsx',
    'src/components/ChameleoTechnologies.tsx',
    'src/components/ChameleoTestimonials.tsx',
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

      // Corriger les apostrophes dans les chaînes de caractères JSX
      content = content.replace(/&apos;/g, "'");
      content = content.replace(/&quot;/g, '"');

      // Corriger les imports
      content = content.replace(/&apos;use client&apos;/g, "'use client'");
      content = content.replace(/&apos;@\/components\/ui\/badge&apos;/g, "'@/components/ui/badge'");
      content = content.replace(/&apos;@\/components\/ui\/button&apos;/g, "'@/components/ui/button'");
      content = content.replace(/&apos;@\/components\/ui\/card&apos;/g, "'@/components/ui/card'");
      content = content.replace(/&apos;lucide-react&apos;/g, "'lucide-react'");
      content = content.replace(/&apos;next\/link&apos;/g, "'next/link'");
      content = content.replace(/&apos;next\/image&apos;/g, "'next/image'");
      content = content.replace(/&apos;react&apos;/g, "'react'");

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Build corrigé: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers de build corrigés\n`);
  return fixedCount;
}

// Fonction principale
function main() {
  console.log("🚀 Démarrage de la réparation d'urgence...\n");

  let totalFixed = 0;

  // 1. Corriger la syntaxe cassée
  totalFixed += fixBrokenSyntax();

  // 2. Corriger les erreurs de build
  totalFixed += fixBuildErrors();

  console.log("🎉 Réparation d'urgence terminée !");
  console.log(`📊 ${totalFixed} fichiers réparés`);

  console.log('\n📋 Prochaines étapes:');
  console.log('1. Tester: npm run build');
  console.log('2. Vérifier que le build fonctionne');
  console.log('3. Relancer: npm run lint');
}

// Exécuter le script
main();
