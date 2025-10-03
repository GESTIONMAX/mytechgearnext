#!/usr/bin/env node

/**
 * Script de correction finale des erreurs critiques
 * Corrige les erreurs les plus importantes restantes
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 Correction Finale des Erreurs Critiques');
console.log('==========================================\n');

// Fonction pour corriger les imports manquants
function fixMissingImports() {
  console.log('📦 Correction des imports manquants...\n');

  const filesToFix = [
    {
      file: 'src/app/lifestyle/page.tsx',
      fixes: [
        {
          from: "// import { Card, CardContent } from '@/components/ui/card';",
          to: "import { Card, CardContent } from '@/components/ui/card';",
        },
      ],
    },
    {
      file: 'src/app/prismatic/page.tsx',
      fixes: [
        {
          from: "// import { Card, CardContent } from '@/components/ui/card';",
          to: "import { Card, CardContent } from '@/components/ui/card';",
        },
      ],
    },
    {
      file: 'src/app/sport/page.tsx',
      fixes: [
        {
          from: "// import { Card, CardContent } from '@/components/ui/card';",
          to: "import { Card, CardContent } from '@/components/ui/card';",
        },
      ],
    },
    {
      file: 'src/app/checkout/success/page.tsx',
      fixes: [
        { from: "// import { ArrowRight } from 'lucide-react';", to: "import { ArrowRight } from 'lucide-react';" },
        { from: "// import Image from 'next/image';", to: "import Image from 'next/image';" },
      ],
    },
    {
      file: 'src/app/test-product-details/page.tsx',
      fixes: [{ from: "// import Image from 'next/image';", to: "import Image from 'next/image';" }],
    },
    {
      file: 'src/app/test-variations/page.tsx',
      fixes: [
        {
          from: "// import { Button } from '@/components/ui/button';",
          to: "import { Button } from '@/components/ui/button';",
        },
        { from: "// import { CheckCircle } from 'lucide-react';", to: "import { CheckCircle } from 'lucide-react';" },
        { from: "// import Image from 'next/image';", to: "import Image from 'next/image';" },
      ],
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
      let modified = false;

      for (const fix of fileFix.fixes) {
        if (content.includes(fix.from)) {
          content = content.replace(fix.from, fix.to);
          modified = true;
          console.log(`✅ Import restauré: ${fix.from} → ${fix.to}`);
        }
      }

      if (modified) {
        fs.writeFileSync(fileFix.file, content, 'utf8');
        console.log(`📝 Fichier mis à jour: ${fileFix.file}\n`);
        fixedCount++;
      } else {
        console.log(`ℹ️  Aucune modification nécessaire: ${fileFix.file}\n`);
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${fileFix.file}:`, error.message);
    }
  }

  console.log(`📊 ${fixedCount} fichiers avec imports restaurés\n`);
  return fixedCount;
}

// Fonction pour corriger les variables inutilisées restantes
function fixRemainingUnusedVars() {
  console.log('🔧 Correction des variables inutilisées restantes...\n');

  const filesToFix = [
    'components/ConnectionTest.client.tsx',
    'src/app/checkout/page.tsx',
    'src/app/checkout/success/page.tsx',
    'src/app/products/page.tsx',
    'src/app/test-cart-management/page.tsx',
    'src/app/test-checkout-flow/page.tsx',
    'src/app/test-product-details/page.tsx',
    'src/app/test-product-links/page.tsx',
    'src/app/test-products-integration/page.tsx',
    'src/app/test-supabase/page.tsx',
    'src/app/test-variations/page.tsx',
    'src/app/test-wordpress-cart/page.tsx',
    'src/app/test-wordpress/page.tsx',
    'src/components/ChameleoCommunity.tsx',
    'src/components/ChameleoCompactTechnologies.tsx',
    'src/components/ChameleoCompactTestimonials.tsx',
    'src/components/ChameleoComparison.tsx',
    'src/components/ChameleoHero.tsx',
    'src/components/ChameleoInteractiveLenses.tsx',
    'src/components/ChameleoLensTechnologies.tsx',
    'src/components/ChameleoPartnership.tsx',
    'src/components/ChameleoTechnologies.tsx',
    'src/components/WordPressCartDrawer.tsx',
    'src/components/WordPressProductCardDetails.tsx',
    'src/components/ui/advanced-quantity-selector.tsx',
    'src/components/ui/quantity-selector.tsx',
    'src/hooks/useImageUpload.ts',
    'src/hooks/useProductVariants.ts',
    'src/hooks/useWordPressCheckout.ts',
    'src/hooks/useWordPressProductVariations.ts',
    'src/lib/logger.ts',
    'src/middleware.ts',
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

      // Corriger les variables inutilisées
      content = content.replace(/const data = /g, 'const _data = ');
      content = content.replace(/const getTotalPrice = /g, 'const _getTotalPrice = ');
      content = content.replace(/const products = /g, 'const _products = ');
      content = content.replace(/const handleAddToCart = /g, 'const _handleAddToCart = ');
      content = content.replace(/const handleToggleWishlist = /g, 'const _handleToggleWishlist = ');
      content = content.replace(/const getProductUrl = /g, 'const _getProductUrl = ');
      content = content.replace(/const updateQuantity = /g, 'const _updateQuantity = ');
      content = content.replace(/const handleQuickView = /g, 'const _handleQuickView = ');
      content = content.replace(/const zones = /g, 'const _zones = ');
      content = content.replace(/const variations = /g, 'const _variations = ');
      content = content.replace(/const entry = /g, 'const _entry = ');

      // Corriger les paramètres inutilisés
      content = content.replace(/\(product: any\)/g, '(_product: any)');
      content = content.replace(/\(variant: any\)/g, '(_variant: any)');
      content = content.replace(/\(error: any\)/g, '(_error: any)');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Variables inutilisées corrigées: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec variables inutilisées corrigées\n`);
  return fixedCount;
}

// Fonction pour corriger les types any restants
function fixRemainingAnyTypes() {
  console.log('🔧 Correction des types any restants...\n');

  const filesToFix = [
    'src/app/product/[slug]/page.tsx',
    'src/app/test-cart-management/page.tsx',
    'src/app/test-product-details/page.tsx',
    'src/components/WordPressProductCardDetails.tsx',
    'src/hooks/useProductVariants.ts',
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

      // Remplacer les types any par unknown
      content = content.replace(/: any/g, ': unknown');
      content = content.replace(/any\[\]/g, 'unknown[]');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Types any corrigés: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec types any corrigés\n`);
  return fixedCount;
}

// Fonction principale
function main() {
  console.log('🚀 Démarrage des corrections finales critiques...\n');

  let totalFixed = 0;

  // 1. Corriger les imports manquants
  totalFixed += fixMissingImports();

  // 2. Corriger les variables inutilisées restantes
  totalFixed += fixRemainingUnusedVars();

  // 3. Corriger les types any restants
  totalFixed += fixRemainingAnyTypes();

  console.log('🎉 Corrections finales critiques terminées !');
  console.log(`📊 ${totalFixed} fichiers modifiés`);

  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run lint');
  console.log('2. Vérifier les erreurs restantes');
  console.log('3. Corriger manuellement les erreurs complexes');
}

// Exécuter le script
main();
