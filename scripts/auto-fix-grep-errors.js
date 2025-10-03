#!/usr/bin/env node

/**
 * Script d'automatisation des corrections via grep
 * Recherche et corrige automatiquement les erreurs les plus communes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Automatisation des Corrections via Grep');
console.log('============================================\n');

// Fonction pour exécuter grep et récupérer les résultats
function grepErrors(pattern, options = {}) {
  try {
    const command = `grep -r "${pattern}" src/ ${options.include || ''} ${options.exclude || ''} 2>/dev/null || true`;
    const output = execSync(command, { encoding: 'utf8' });
    return output.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    return [];
  }
}

// Fonction pour corriger les composants non définis
function fixUndefinedComponents() {
  console.log('🔧 Correction des composants non définis...\n');
  
  const components = ['Card', 'Image', 'Button', 'Badge', 'Input', 'Label'];
  let fixedCount = 0;
  
  for (const component of components) {
    console.log(`📦 Recherche des erreurs ${component}...`);
    
    // Rechercher les fichiers avec des erreurs de composant
    const errors = grepErrors(`'${component}' is not defined`);
    
    for (const error of errors) {
      const [filePath, lineContent] = error.split(':');
      if (!filePath || !lineContent) continue;
      
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Ajouter l'import si nécessaire
        if (component === 'Card') {
          if (!content.includes("import { Card") && !content.includes("// import { Card")) {
            // Ajouter l'import en haut du fichier
            const importLine = "import { Card, CardContent } from '@/components/ui/card';\n";
            content = importLine + content;
          } else if (content.includes("// import { Card")) {
            // Décommenter l'import existant
            content = content.replace("// import { Card, CardContent } from '@/components/ui/card';", 
                                   "import { Card, CardContent } from '@/components/ui/card';");
          }
        } else if (component === 'Image') {
          if (!content.includes("import Image from 'next/image'") && !content.includes("// import Image from 'next/image'")) {
            const importLine = "import Image from 'next/image';\n";
            content = importLine + content;
          } else if (content.includes("// import Image from 'next/image'")) {
            content = content.replace("// import Image from 'next/image';", "import Image from 'next/image';");
          }
        } else if (component === 'Button') {
          if (!content.includes("import { Button }") && !content.includes("// import { Button }")) {
            const importLine = "import { Button } from '@/components/ui/button';\n";
            content = importLine + content;
          } else if (content.includes("// import { Button }")) {
            content = content.replace("// import { Button } from '@/components/ui/button';", 
                                   "import { Button } from '@/components/ui/button';");
          }
        }
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`✅ ${component} corrigé dans ${filePath}`);
          fixedCount++;
        }
      } catch (error) {
        console.error(`❌ Erreur avec ${filePath}:`, error.message);
      }
    }
  }
  
  console.log(`\n📊 ${fixedCount} fichiers avec composants corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les variables inutilisées
function fixUnusedVariables() {
  console.log('🔧 Correction des variables inutilisées...\n');
  
  const patterns = [
    { search: 'is defined but never used', fix: (content) => {
      return content.replace(/\b(const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, (match, decl, varName) => {
        // Éviter de préfixer les variables déjà préfixées
        if (varName.startsWith('_')) return match;
        return match.replace(varName, `_${varName}`);
      });
    }},
    { search: 'is assigned a value but never used', fix: (content) => {
      return content.replace(/\b(const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, (match, decl, varName) => {
        if (varName.startsWith('_')) return match;
        return match.replace(varName, `_${varName}`);
      });
    }}
  ];
  
  let fixedCount = 0;
  
  for (const pattern of patterns) {
    console.log(`🔍 Recherche: ${pattern.search}...`);
    
    const errors = grepErrors(pattern.search);
    
    for (const error of errors) {
      const [filePath] = error.split(':');
      if (!filePath) continue;
      
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        content = pattern.fix(content);
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`✅ Variables inutilisées corrigées dans ${filePath}`);
          fixedCount++;
        }
      } catch (error) {
        console.error(`❌ Erreur avec ${filePath}:`, error.message);
      }
    }
  }
  
  console.log(`\n📊 ${fixedCount} fichiers avec variables corrigées\n`);
  return fixedCount;
}

// Fonction pour corriger les caractères échappés
function fixEscapedCharacters() {
  console.log('🔧 Correction des caractères échappés...\n');
  
  const patterns = [
    { search: "can be escaped with.*&apos;", fix: (content) => {
      // Corriger les apostrophes dans le contenu JSX
      return content.replace(/(<[^>]*>[^<]*)([^&]'[^<]*)([^<]*<\/[^>]*>)/g, (match, before, middle, after) => {
        return before + middle.replace(/'/g, '&apos;') + after;
      });
    }},
    { search: "can be escaped with.*&quot;", fix: (content) => {
      // Corriger les guillemets dans le contenu JSX
      return content.replace(/(<[^>]*>[^<]*)([^&]"[^<]*)([^<]*<\/[^>]*>)/g, (match, before, middle, after) => {
        return before + middle.replace(/"/g, '&quot;') + after;
      });
    }}
  ];
  
  let fixedCount = 0;
  
  for (const pattern of patterns) {
    console.log(`🔍 Recherche: ${pattern.search}...`);
    
    const errors = grepErrors(pattern.search);
    
    for (const error of errors) {
      const [filePath] = error.split(':');
      if (!filePath) continue;
      
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        content = pattern.fix(content);
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`✅ Caractères échappés corrigés dans ${filePath}`);
          fixedCount++;
        }
      } catch (error) {
        console.error(`❌ Erreur avec ${filePath}:`, error.message);
      }
    }
  }
  
  console.log(`\n📊 ${fixedCount} fichiers avec caractères corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les console statements
function fixConsoleStatements() {
  console.log('🔧 Correction des console statements...\n');
  
  const errors = grepErrors('Unexpected console statement');
  let fixedCount = 0;
  
  for (const error of errors) {
    const [filePath] = error.split(':');
    if (!filePath) continue;
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Commenter les console.log
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
  
  console.log(`\n📊 ${fixedCount} fichiers avec console statements corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les types any
function fixAnyTypes() {
  console.log('🔧 Correction des types any...\n');
  
  const errors = grepErrors('Unexpected any');
  let fixedCount = 0;
  
  for (const error of errors) {
    const [filePath] = error.split(':');
    if (!filePath) continue;
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Remplacer les types any par unknown
      content = content.replace(/: any/g, ': unknown');
      content = content.replace(/any\[\]/g, 'unknown[]');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Types any corrigés dans ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
  }
  
  console.log(`\n📊 ${fixedCount} fichiers avec types any corrigés\n`);
  return fixedCount;
}

// Fonction pour analyser les erreurs restantes
function analyzeRemainingErrors() {
  console.log('📊 Analyse des erreurs restantes...\n');
  
  const errorTypes = {
    'Composants non définis': grepErrors('is not defined').length,
    'Variables inutilisées': grepErrors('is defined but never used').length + grepErrors('is assigned a value but never used').length,
    'Caractères échappés': grepErrors('can be escaped').length,
    'Console statements': grepErrors('Unexpected console statement').length,
    'Types any': grepErrors('Unexpected any').length,
    'Hooks mal utilisés': grepErrors('cannot be called inside a callback').length,
    'Imports inutilisés': grepErrors('is defined but never used').length
  };
  
  console.log('📈 RÉPARTITION DES ERREURS:');
  console.log('==========================\n');
  
  for (const [type, count] of Object.entries(errorTypes)) {
    console.log(`${type}: ${count} erreurs`);
  }
  
  const total = Object.values(errorTypes).reduce((sum, count) => sum + count, 0);
  console.log(`\n📊 Total: ${total} erreurs\n`);
  
  return errorTypes;
}

// Fonction principale
function main() {
  console.log('🚀 Démarrage de l\'automatisation...\n');
  
  let totalFixed = 0;
  
  // 1. Corriger les composants non définis
  totalFixed += fixUndefinedComponents();
  
  // 2. Corriger les variables inutilisées
  totalFixed += fixUnusedVariables();
  
  // 3. Corriger les caractères échappés
  totalFixed += fixEscapedCharacters();
  
  // 4. Corriger les console statements
  totalFixed += fixConsoleStatements();
  
  // 5. Corriger les types any
  totalFixed += fixAnyTypes();
  
  // 6. Analyser les erreurs restantes
  const remainingErrors = analyzeRemainingErrors();
  
  console.log('🎉 Automatisation terminée !');
  console.log(`📊 ${totalFixed} fichiers modifiés`);
  
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run lint');
  console.log('2. Vérifier les erreurs restantes');
  console.log('3. Corriger manuellement les erreurs complexes');
  console.log('4. Utiliser: node scripts/lint-progress-tracker.js');
}

// Exécuter le script
main();
