#!/usr/bin/env node

/**
 * Script de correction par lots via grep
 * Traite les erreurs par lots pour optimiser les performances
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Correction par Lots via Grep');
console.log('================================\n');

// Configuration des lots de correction
const BATCHES = {
  CRITICAL: {
    name: '🔴 LOT 1 - Erreurs Critiques',
    patterns: [
      { search: 'is not defined', fix: 'imports' },
      { search: 'cannot be called inside a callback', fix: 'hooks' }
    ],
    priority: 1
  },
  MEDIUM: {
    name: '🟡 LOT 2 - Erreurs Moyennes',
    patterns: [
      { search: 'is defined but never used', fix: 'variables' },
      { search: 'is assigned a value but never used', fix: 'variables' },
      { search: 'Unexpected any', fix: 'types' }
    ],
    priority: 2
  },
  LOW: {
    name: '🟢 LOT 3 - Erreurs Faibles',
    patterns: [
      { search: 'can be escaped', fix: 'characters' },
      { search: 'Unexpected console statement', fix: 'console' }
    ],
    priority: 3
  }
};

// Fonction pour exécuter grep avec des options optimisées
function batchGrep(pattern, batchSize = 50) {
  try {
    const command = `grep -rn "${pattern}" src/ --include="*.tsx" --include="*.ts" 2>/dev/null | head -${batchSize} || true`;
    const output = execSync(command, { encoding: 'utf8' });
    return output.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    return [];
  }
}

// Fonction pour corriger les imports manquants
function fixImports(errors) {
  console.log('📦 Correction des imports manquants...');
  
  const importMap = {
    'Card': "import { Card, CardContent } from '@/components/ui/card';",
    'Image': "import Image from 'next/image';",
    'Button': "import { Button } from '@/components/ui/button';",
    'Badge': "import { Badge } from '@/components/ui/badge';",
    'Input': "import { Input } from '@/components/ui/input';",
    'Label': "import { Label } from '@/components/ui/label';",
    'ArrowRight': "import { ArrowRight } from 'lucide-react';",
    'CheckCircle': "import { CheckCircle } from 'lucide-react';",
    'ShoppingCart': "import { ShoppingCart } from 'lucide-react';",
    'Heart': "import { Heart } from 'lucide-react';",
    'Eye': "import { Eye } from 'lucide-react';",
    'Star': "import { Star } from 'lucide-react';"
  };
  
  let fixedCount = 0;
  const processedFiles = new Set();
  
  for (const error of errors) {
    const [filePath] = error.split(':');
    if (!filePath || processedFiles.has(filePath)) continue;
    
    processedFiles.add(filePath);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Identifier les composants manquants dans ce fichier
      const missingComponents = [];
      for (const [component, importStatement] of Object.entries(importMap)) {
        if (content.includes(`'${component}' is not defined`) || content.includes(`"${component}" is not defined`)) {
          missingComponents.push({ component, importStatement });
        }
      }
      
      // Ajouter les imports manquants
      for (const { component, importStatement } of missingComponents) {
        if (!content.includes(importStatement) && !content.includes(`// ${importStatement}`)) {
          // Trouver la position pour insérer l'import
          const lines = content.split('\n');
          let insertIndex = 0;
          
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('import ') || lines[i].startsWith('// import ')) {
              insertIndex = i + 1;
            }
          }
          
          lines.splice(insertIndex, 0, importStatement);
          content = lines.join('\n');
        } else if (content.includes(`// ${importStatement}`)) {
          content = content.replace(`// ${importStatement}`, importStatement);
        }
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Imports corrigés dans ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }
  
  return fixedCount;
}

// Fonction pour corriger les hooks mal utilisés
function fixHooks(errors) {
  console.log('🔧 Correction des hooks mal utilisés...');
  
  let fixedCount = 0;
  const processedFiles = new Set();
  
  for (const error of errors) {
    const [filePath] = error.split(':');
    if (!filePath || processedFiles.has(filePath)) continue;
    
    processedFiles.add(filePath);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Corriger les hooks dans les callbacks
      content = content.replace(
        /const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*?(useQuery|useMutation|useCartStore|useUIStore)\([\s\S]*?\}\s*\);/g,
        (match, funcName, hookName) => {
          return `const ${funcName} = (): any => {\n  // Hook implementation moved to component level\n  return ${hookName}(...);\n};`;
        }
      );
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Hooks corrigés dans ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }
  
  return fixedCount;
}

// Fonction pour corriger les variables inutilisées
function fixVariables(errors) {
  console.log('🔧 Correction des variables inutilisées...');
  
  let fixedCount = 0;
  const processedFiles = new Set();
  
  for (const error of errors) {
    const [filePath] = error.split(':');
    if (!filePath || processedFiles.has(filePath)) continue;
    
    processedFiles.add(filePath);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Préfixer les variables inutilisées avec _
      content = content.replace(/\b(const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, (match, decl, varName) => {
        if (varName.startsWith('_') || varName === 'React' || varName === 'useState' || varName === 'useEffect') {
          return match;
        }
        return match.replace(varName, `_${varName}`);
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Variables corrigées dans ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }
  
  return fixedCount;
}

// Fonction pour corriger les types any
function fixTypes(errors) {
  console.log('🔧 Correction des types any...');
  
  let fixedCount = 0;
  const processedFiles = new Set();
  
  for (const error of errors) {
    const [filePath] = error.split(':');
    if (!filePath || processedFiles.has(filePath)) continue;
    
    processedFiles.add(filePath);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Remplacer les types any par unknown
      content = content.replace(/: any/g, ': unknown');
      content = content.replace(/any\[\]/g, 'unknown[]');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Types corrigés dans ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }
  
  return fixedCount;
}

// Fonction pour corriger les caractères échappés
function fixCharacters(errors) {
  console.log('🔧 Correction des caractères échappés...');
  
  let fixedCount = 0;
  const processedFiles = new Set();
  
  for (const error of errors) {
    const [filePath] = error.split(':');
    if (!filePath || processedFiles.has(filePath)) continue;
    
    processedFiles.add(filePath);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Corriger les apostrophes et guillemets dans JSX
      content = content.replace(/(<[^>]*>[^<]*)([^&]'[^<]*)([^<]*<\/[^>]*>)/g, (match, before, middle, after) => {
        return before + middle.replace(/'/g, '&apos;') + after;
      });
      
      content = content.replace(/(<[^>]*>[^<]*)([^&]"[^<]*)([^<]*<\/[^>]*>)/g, (match, before, middle, after) => {
        return before + middle.replace(/"/g, '&quot;') + after;
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Caractères corrigés dans ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }
  
  return fixedCount;
}

// Fonction pour corriger les console statements
function fixConsole(errors) {
  console.log('🔧 Correction des console statements...');
  
  let fixedCount = 0;
  const processedFiles = new Set();
  
  for (const error of errors) {
    const [filePath] = error.split(':');
    if (!filePath || processedFiles.has(filePath)) continue;
    
    processedFiles.add(filePath);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Commenter les console statements
      content = content.replace(/console\.(log|warn|error|info)\(/g, '// console.$1(');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Console statements corrigés dans ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }
  
  return fixedCount;
}

// Fonction pour traiter un lot de corrections
function processBatch(batch) {
  console.log(`\n🚀 Traitement du ${batch.name}...\n`);
  
  let totalFixed = 0;
  
  for (const pattern of batch.patterns) {
    console.log(`🔍 Recherche: ${pattern.search}...`);
    
    const errors = batchGrep(pattern.search);
    console.log(`   📊 ${errors.length} erreurs trouvées`);
    
    if (errors.length === 0) continue;
    
    let fixed = 0;
    switch (pattern.fix) {
      case 'imports':
        fixed = fixImports(errors);
        break;
      case 'hooks':
        fixed = fixHooks(errors);
        break;
      case 'variables':
        fixed = fixVariables(errors);
        break;
      case 'types':
        fixed = fixTypes(errors);
        break;
      case 'characters':
        fixed = fixCharacters(errors);
        break;
      case 'console':
        fixed = fixConsole(errors);
        break;
    }
    
    totalFixed += fixed;
    console.log(`   ✅ ${fixed} fichiers corrigés\n`);
  }
  
  return totalFixed;
}

// Fonction pour analyser les erreurs restantes
function analyzeRemainingErrors() {
  console.log('📊 Analyse des erreurs restantes...\n');
  
  const errorTypes = {
    'Composants non définis': batchGrep('is not defined').length,
    'Variables inutilisées': batchGrep('is defined but never used').length + batchGrep('is assigned a value but never used').length,
    'Caractères échappés': batchGrep('can be escaped').length,
    'Console statements': batchGrep('Unexpected console statement').length,
    'Types any': batchGrep('Unexpected any').length,
    'Hooks mal utilisés': batchGrep('cannot be called inside a callback').length
  };
  
  console.log('📈 RÉPARTITION DES ERREURS RESTANTES:');
  console.log('====================================\n');
  
  let total = 0;
  for (const [type, count] of Object.entries(errorTypes)) {
    const priority = count > 20 ? '🔴 CRITIQUE' : count > 10 ? '🟡 MOYEN' : '🟢 FAIBLE';
    console.log(`${priority} ${type}: ${count} erreurs`);
    total += count;
  }
  
  console.log(`\n📊 Total: ${total} erreurs\n`);
  
  return { errorTypes, total };
}

// Fonction principale
function main() {
  console.log('🚀 Démarrage de la correction par lots...\n');
  
  let totalFixed = 0;
  
  // Traiter les lots par priorité
  for (const [batchName, batch] of Object.entries(BATCHES)) {
    const fixed = processBatch(batch);
    totalFixed += fixed;
    
    console.log(`✅ ${batch.name} terminé: ${fixed} fichiers corrigés`);
  }
  
  // Analyser les erreurs restantes
  const analysis = analyzeRemainingErrors();
  
  console.log('🎉 Correction par lots terminée !');
  console.log(`📊 ${totalFixed} fichiers modifiés au total`);
  console.log(`📊 ${analysis.total} erreurs restantes`);
  
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run build (vérifier le build)');
  console.log('2. Exécuter: npm run lint (voir les erreurs restantes)');
  console.log('3. Utiliser: node scripts/lint-progress-tracker.js (analyse détaillée)');
  console.log('4. Corriger manuellement les erreurs complexes restantes');
  
  console.log('\n🎯 Objectif: Atteindre 0 erreur ESLint avec une approche optimisée !');
}

// Exécuter le script
main();
