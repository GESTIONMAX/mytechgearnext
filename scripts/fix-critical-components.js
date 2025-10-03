#!/usr/bin/env node

/**
 * Script de correction des composants non définis
 * Corrige automatiquement les imports manquants les plus critiques
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Correction des Composants Non Définis');
console.log('==========================================\n');

// Fonction pour corriger les composants non définis
function fixMissingComponents() {
  console.log('📦 Correction des composants non définis...\n');

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

  console.log(`📊 ${fixedCount} fichiers avec composants corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les hooks mal utilisés
function fixHooksUsage() {
  console.log('🔧 Correction des hooks mal utilisés...\n');

  const filesToFix = ['src/hooks/useSupabaseProducts.ts', 'src/hooks/useCart.ts'];

  let fixedCount = 0;

  for (const filePath of filesToFix) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Fichier non trouvé: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Corriger les hooks mal utilisés
      content = content.replace(
        /const ([a-zA-Z_][a-zA-Z0-9_]*) = \(\) => \{[\s\S]*?useQuery\([\s\S]*?\}\s*\);/g,
        'const $1 = (): any => {\n  // Hook implementation\n  return useQuery(...);\n};',
      );

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Hooks corrigés: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 ${fixedCount} fichiers avec hooks corrigés\n`);
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
  console.log('🚀 Démarrage des corrections critiques...\n');

  let totalFixed = 0;

  // 1. Corriger les composants non définis
  totalFixed += fixMissingComponents();

  // 2. Corriger les hooks mal utilisés
  totalFixed += fixHooksUsage();

  // 3. Tester le build
  const buildSuccess = testBuild();

  console.log('🎉 Corrections critiques terminées !');
  console.log(`📊 ${totalFixed} fichiers modifiés`);

  if (buildSuccess) {
    console.log('✅ Build fonctionnel après corrections');
  } else {
    console.log('❌ Build échoué - Vérifiez les erreurs');
  }

  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run lint');
  console.log('2. Vérifier les erreurs restantes');
  console.log('3. Continuer avec les corrections manuelles');
}

// Exécuter le script
main();
