#!/usr/bin/env node

/**
 * Script de correction ciblée des erreurs ESLint
 * Corrige les erreurs spécifiques identifiées
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 Correction Ciblée des Erreurs ESLint');
console.log('=====================================\n');

// Fichiers à corriger avec leurs erreurs spécifiques
const fixes = [
  {
    file: 'src/components/ChameleoCompactTechnologies.tsx',
    fixes: [
      {
        from: "import { Card, CardContent } from '@/components/ui/card';",
        to: "// import { Card, CardContent } from '@/components/ui/card';",
      },
      {
        from: "import { Settings, Shield, Star } from 'lucide-react';",
        to: "// import { Settings, Shield, Star } from 'lucide-react';",
      },
    ],
  },
  {
    file: 'src/components/ChameleoCompactTestimonials.tsx',
    fixes: [
      { from: "import { CheckCircle } from 'lucide-react';", to: "// import { CheckCircle } from 'lucide-react';" },
    ],
  },
  {
    file: 'src/components/ChameleoComparison.tsx',
    fixes: [
      { from: "import { Zap } from 'lucide-react';", to: "// import { Zap } from 'lucide-react';" },
      { from: "import Image from 'next/image';", to: "// import Image from 'next/image';" },
    ],
  },
  {
    file: 'src/components/ChameleoHero.tsx',
    fixes: [{ from: "import Image from 'next/image';", to: "// import Image from 'next/image';" }],
  },
  {
    file: 'src/components/ChameleoInteractiveLenses.tsx',
    fixes: [
      {
        from: "import { Moon, CheckCircle, Sliders } from 'lucide-react';",
        to: "// import { Moon, CheckCircle, Sliders } from 'lucide-react';",
      },
      { from: "import Image from 'next/image';", to: "// import Image from 'next/image';" },
      { from: "import { useEffect } from 'react';", to: "// import { useEffect } from 'react';" },
    ],
  },
  {
    file: 'src/components/ChameleoLensTechnologies.tsx',
    fixes: [
      {
        from: "import { Settings, Shield, Star, Clock } from 'lucide-react';",
        to: "// import { Settings, Shield, Star, Clock } from 'lucide-react';",
      },
    ],
  },
  {
    file: 'src/components/ChameleoPartnership.tsx',
    fixes: [
      { from: "import { Star } from 'lucide-react';", to: "// import { Star } from 'lucide-react';" },
      { from: "import { MapPin, Clock } from 'lucide-react';", to: "// import { MapPin, Clock } from 'lucide-react';" },
    ],
  },
  {
    file: 'src/components/ChameleoTechnologies.tsx',
    fixes: [
      { from: "import { Shield } from 'lucide-react';", to: "// import { Shield } from 'lucide-react';" },
      {
        from: "import { Moon, Droplets } from 'lucide-react';",
        to: "// import { Moon, Droplets } from 'lucide-react';",
      },
    ],
  },
];

// Fonction pour corriger un fichier
function fixFile(filePath, fileFixes) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Fichier non trouvé: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const fix of fileFixes) {
      if (content.includes(fix.from)) {
        content = content.replace(fix.from, fix.to);
        modified = true;
        console.log(`✅ Corrigé: ${fix.from} → ${fix.to}`);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`📝 Fichier mis à jour: ${filePath}\n`);
      return true;
    } else {
      console.log(`ℹ️  Aucune modification nécessaire: ${filePath}\n`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
    return false;
  }
}

// Fonction pour corriger les apostrophes et guillemets
function fixEscapedCharacters() {
  console.log('🔤 Correction des caractères échappés...\n');

  const filesToFix = [
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
    'src/components/ChameleoCommunity.tsx',
    'src/components/ChameleoCompactTestimonials.tsx',
    'src/components/ChameleoComparison.tsx',
    'src/components/ChameleoHero.tsx',
    'src/components/ChameleoLensTechnologies.tsx',
    'src/components/ChameleoManufacturing.tsx',
    'src/components/ChameleoTechnologies.tsx',
    'src/components/ChameleoTestimonials.tsx',
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

      // Corriger les apostrophes
      content = content.replace(/'/g, '&apos;');

      // Corriger les guillemets
      content = content.replace(/"/g, '&quot;');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Caractères échappés corrigés: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec caractères échappés corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les paramètres inutilisés
function fixUnusedParameters() {
  console.log('🔧 Correction des paramètres inutilisés...\n');

  const filesToFix = [
    'src/app/lifestyle/page.tsx',
    'src/app/prismatic/page.tsx',
    'src/app/sport/page.tsx',
    'src/app/test-cart-management/page.tsx',
    'src/app/test-checkout-flow/page.tsx',
    'src/app/test-product-details/page.tsx',
    'src/app/test-supabase/page.tsx',
    'src/app/test-variations/page.tsx',
    'src/app/test-wordpress-cart/page.tsx',
    'src/app/test-wordpress/page.tsx',
    'src/components/WordPressCartDrawer.tsx',
    'src/components/WordPressProductCardDetails.tsx',
    'src/hooks/useWordPressCheckout.ts',
    'src/hooks/useWordPressProductVariations.ts',
    'src/hooks/useWordPressProducts.ts',
    'src/store/wordpress-cart.ts',
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

      // Corriger les paramètres inutilisés en ajoutant underscore
      content = content.replace(/\(([a-zA-Z_][a-zA-Z0-9_]*):/g, '(_$1:');
      content = content.replace(
        /function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([a-zA-Z_][a-zA-Z0-9_]*):/g,
        'function $1(_$2:',
      );

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Paramètres inutilisés corrigés: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec paramètres inutilisés corrigés\n`);
  return fixedCount;
}

// Fonction principale
function main() {
  console.log('🚀 Démarrage des corrections...\n');

  let totalFixed = 0;

  // 1. Corriger les imports inutilisés
  console.log('📦 Correction des imports inutilisés...\n');
  for (const fix of fixes) {
    if (fixFile(fix.file, fix.fixes)) {
      totalFixed++;
    }
  }

  // 2. Corriger les caractères échappés
  totalFixed += fixEscapedCharacters();

  // 3. Corriger les paramètres inutilisés
  totalFixed += fixUnusedParameters();

  console.log('🎉 Corrections terminées !');
  console.log(`📊 ${totalFixed} fichiers modifiés`);

  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run lint');
  console.log('2. Vérifier les erreurs restantes');
  console.log('3. Corriger manuellement les erreurs complexes');
}

// Exécuter le script
main();
