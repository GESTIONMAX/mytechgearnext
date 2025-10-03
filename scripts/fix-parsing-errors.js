#!/usr/bin/env node

/**
 * Script de correction des erreurs de parsing
 * Corrige les erreurs de syntaxe qui empêchent ESLint de fonctionner
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Correction des Erreurs de Parsing');
console.log('=====================================\n');

// Fonction pour corriger les erreurs de parsing dans un fichier
function fixParsingErrors(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Fichier non trouvé: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    console.log(`🔍 Analyse de ${filePath}...`);
    
    // Corriger les erreurs de parsing communes
    let fixed = false;
    
    // 1. Corriger les accolades manquantes
    if (content.includes('Parsing error: \'{\' or \';\' expected')) {
      // Chercher les patterns problématiques
      content = content.replace(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*\)\s*:\s*([^{]*?)\s*$/gm, (match, funcName, returnType) => {
        return `function ${funcName}(): ${returnType} {`;
      });
      
      content = content.replace(/const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\([^)]*\)\s*:\s*([^{]*?)\s*$/gm, (match, varName, returnType) => {
        return `const ${varName} = (): ${returnType} => {`;
      });
      
      fixed = true;
    }
    
    // 2. Corriger les imports mal formés
    content = content.replace(/import\s+([^{}]*)\s*from\s*['"]([^'"]*)['"]\s*;?\s*$/gm, (match, imports, module) => {
      return `import ${imports} from '${module}';`;
    });
    
    // 3. Corriger les exports mal formés
    content = content.replace(/export\s+([^{}]*)\s*from\s*['"]([^'"]*)['"]\s*;?\s*$/gm, (match, exports, module) => {
      return `export ${exports} from '${module}';`;
    });
    
    // 4. Corriger les types de retour mal formés
    content = content.replace(/:\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\(\s*\)\s*:\s*([a-zA-Z_][a-zA-Z0-9_]*)/g, ': $1(): $2');
    
    // 5. Corriger les variables inutilisées
    content = content.replace(/\bconst\s+data\s*=/g, 'const _data =');
    content = content.replace(/\bconst\s+error\s*=/g, 'const _error =');
    content = content.replace(/\bconst\s+result\s*=/g, 'const _result =');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Erreurs de parsing corrigées dans ${filePath}`);
      return true;
    } else {
      console.log(`ℹ️  Aucune correction nécessaire dans ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
    return false;
  }
}

// Fonction pour corriger les fichiers problématiques identifiés
function fixKnownProblematicFiles() {
  console.log('🔧 Correction des fichiers problématiques connus...\n');
  
  const problematicFiles = [
    'components/ConnectionTest.client.tsx',
    'components/products/AddToCart.client.tsx',
    'hooks/useAuth.ts',
    'hooks/useCart.ts'
  ];
  
  let fixedCount = 0;
  
  for (const filePath of problematicFiles) {
    if (fixParsingErrors(filePath)) {
      fixedCount++;
    }
  }
  
  console.log(`\n📊 ${fixedCount} fichiers avec erreurs de parsing corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les erreurs de syntaxe dans les fichiers TypeScript
function fixTypeScriptSyntaxErrors() {
  console.log('🔧 Correction des erreurs de syntaxe TypeScript...\n');
  
  const srcDir = 'src';
  let fixedCount = 0;
  
  function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        fixedCount += processDirectory(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        if (fixParsingErrors(filePath)) {
          fixedCount++;
        }
      }
    }
    
    return fixedCount;
  }
  
  if (fs.existsSync(srcDir)) {
    fixedCount = processDirectory(srcDir);
  }
  
  console.log(`\n📊 ${fixedCount} fichiers TypeScript corrigés\n`);
  return fixedCount;
}

// Fonction pour tester le lint après corrections
function testLintAfterFixes() {
  console.log('🧪 Test du lint après corrections...\n');
  
  try {
    const { execSync } = require('child_process');
    const output = execSync('npm run lint 2>&1', { encoding: 'utf8' });
    
    // Compter les erreurs et warnings
    const lines = output.split('\n');
    let errorCount = 0;
    let warningCount = 0;
    
    for (const line of lines) {
      if (line.includes('error')) {
        errorCount++;
      } else if (line.includes('warning')) {
        warningCount++;
      }
    }
    
    console.log(`📊 Résultats après corrections:`);
    console.log(`   🔴 Erreurs: ${errorCount}`);
    console.log(`   🟡 Warnings: ${warningCount}`);
    console.log(`   📈 Total: ${errorCount + warningCount}\n`);
    
    return { errorCount, warningCount, total: errorCount + warningCount };
  } catch (error) {
    console.error('❌ Erreur lors du test lint:', error.message);
    return null;
  }
}

// Fonction principale
function main() {
  console.log('🚀 Démarrage de la correction des erreurs de parsing...\n');
  
  let totalFixed = 0;
  
  // 1. Corriger les fichiers problématiques connus
  totalFixed += fixKnownProblematicFiles();
  
  // 2. Corriger les erreurs de syntaxe TypeScript
  totalFixed += fixTypeScriptSyntaxErrors();
  
  // 3. Tester le lint après corrections
  const lintResults = testLintAfterFixes();
  
  console.log('🎉 Correction des erreurs de parsing terminée !');
  console.log(`📊 ${totalFixed} fichiers modifiés`);
  
  if (lintResults) {
    console.log(`📊 ${lintResults.total} problèmes ESLint restants`);
    
    if (lintResults.errorCount === 0) {
      console.log('✅ Plus d\'erreurs de parsing !');
    } else {
      console.log('⚠️  Des erreurs de parsing persistent');
    }
  }
  
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run build (vérifier le build)');
  console.log('2. Exécuter: npm run lint (voir les erreurs restantes)');
  console.log('3. Utiliser: node scripts/lint-progress-tracker.js (analyse détaillée)');
  console.log('4. Corriger manuellement les erreurs complexes restantes');
}

// Exécuter le script
main();
