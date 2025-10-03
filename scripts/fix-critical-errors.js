#!/usr/bin/env node

/**
 * Script de correction rapide pour les erreurs critiques
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 CORRECTION DES ERREURS CRITIQUES');
console.log('═'.repeat(50));

// Corriger les erreurs de parsing dans les fichiers critiques
const criticalFiles = [
  {
    file: 'src/components/products/AddToCart.client.tsx',
    fixes: [
      {
        search: /import.*from.*['"]@\/store\/wordpress-cart['"];?\s*/g,
        replace: "import { useWordPressCartStore } from '@/store/wordpress-cart';\n",
      },
    ],
  },
  {
    file: 'lib/supabase/client.ts',
    fixes: [
      {
        search: /import.*from.*['"]@supabase\/supabase-js['"];?\s*/g,
        replace: "import { createClient } from '@supabase/supabase-js';\n",
      },
    ],
  },
  {
    file: 'lib/supabase/server.ts',
    fixes: [
      {
        search: /import.*from.*['"]@supabase\/supabase-js['"];?\s*/g,
        replace: "import { createClient } from '@supabase/supabase-js';\n",
      },
    ],
  },
];

let fixedFiles = 0;

criticalFiles.forEach(({ file, fixes }) => {
  const filePath = path.join(process.cwd(), file);

  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let hasChanges = false;

      fixes.forEach(({ search, replace }) => {
        if (search.test(content)) {
          content = content.replace(search, replace);
          hasChanges = true;
        }
      });

      if (hasChanges) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Corrigé: ${file}`);
        fixedFiles++;
      } else {
        console.log(`⏭️  Aucun changement: ${file}`);
      }
    } catch (error) {
      console.log(`❌ Erreur ${file}: ${error.message}`);
    }
  } else {
    console.log(`⚠️  Fichier non trouvé: ${file}`);
  }
});

console.log(`\n📊 RÉSULTATS:`);
console.log(`✅ Fichiers corrigés: ${fixedFiles}`);
console.log(`\n🎉 Corrections terminées !`);
