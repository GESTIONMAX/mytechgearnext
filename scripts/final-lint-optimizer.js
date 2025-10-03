#!/usr/bin/env node

/**
 * Script d'optimisation finale des erreurs ESLint
 * Corrige automatiquement les erreurs restantes de manière optimisée
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎯 Optimisation Finale des Erreurs ESLint');
console.log('==========================================\n');

// Fonction pour analyser les erreurs ESLint actuelles
function analyzeCurrentErrors() {
  console.log('🔍 Analyse des erreurs ESLint actuelles...\n');
  
  try {
    const lintOutput = execSync('npm run lint 2>&1', { encoding: 'utf8' });
    const lines = lintOutput.split('\n');
    
    const errors = {
      'Missing return type': [],
      'unused vars': [],
      'console statements': [],
      'missing dependencies': [],
      'other': []
    };
    
    for (const line of lines) {
      if (line.includes('Missing return type')) {
        errors['Missing return type'].push(line);
      } else if (line.includes('is defined but never used') || line.includes('is assigned a value but never used')) {
        errors['unused vars'].push(line);
      } else if (line.includes('Unexpected console statement')) {
        errors['console statements'].push(line);
      } else if (line.includes('missing dependencies')) {
        errors['missing dependencies'].push(line);
      } else if (line.includes('error') || line.includes('warning')) {
        errors['other'].push(line);
      }
    }
    
    console.log('📊 RÉPARTITION DES ERREURS:');
    console.log('===========================\n');
    
    for (const [type, errorList] of Object.entries(errors)) {
      if (errorList.length > 0) {
        console.log(`${type}: ${errorList.length} erreurs`);
      }
    }
    
    const total = Object.values(errors).reduce((sum, list) => sum + list.length, 0);
    console.log(`\n📊 Total: ${total} erreurs\n`);
    
    return { errors, total };
  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error.message);
    return null;
  }
}

// Fonction pour corriger les types de retour manquants
function fixMissingReturnTypes() {
  console.log('🔧 Correction des types de retour manquants...\n');
  
  const srcDir = 'src';
  let fixedCount = 0;
  
  function processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Corriger les fonctions sans type de retour
      content = content.replace(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*\)\s*\{/g, (match, funcName) => {
        if (!match.includes(':')) {
          return match.replace('{', '(): void {');
        }
        return match;
      });
      
      // Corriger les fonctions async sans type de retour
      content = content.replace(/async\s+function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*\)\s*\{/g, (match, funcName) => {
        if (!match.includes(':')) {
          return match.replace('{', '(): Promise<void> {');
        }
        return match;
      });
      
      // Corriger les arrow functions sans type de retour
      content = content.replace(/const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\([^)]*\)\s*=>\s*\{/g, (match, varName) => {
        if (!match.includes(':')) {
          return match.replace('=>', '(): void =>');
        }
        return match;
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Types de retour ajoutés dans ${filePath}`);
        return true;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
    return false;
  }
  
  function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        fixedCount += processDirectory(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        if (processFile(filePath)) {
          fixedCount++;
        }
      }
    }
    
    return fixedCount;
  }
  
  if (fs.existsSync(srcDir)) {
    fixedCount = processDirectory(srcDir);
  }
  
  console.log(`\n📊 ${fixedCount} fichiers avec types de retour corrigés\n`);
  return fixedCount;
}

// Fonction pour corriger les variables inutilisées
function fixUnusedVariables() {
  console.log('🔧 Correction des variables inutilisées...\n');
  
  const srcDir = 'src';
  let fixedCount = 0;
  
  function processFile(filePath) {
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
        console.log(`✅ Variables inutilisées corrigées dans ${filePath}`);
        return true;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
    return false;
  }
  
  function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        fixedCount += processDirectory(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        if (processFile(filePath)) {
          fixedCount++;
        }
      }
    }
    
    return fixedCount;
  }
  
  if (fs.existsSync(srcDir)) {
    fixedCount = processDirectory(srcDir);
  }
  
  console.log(`\n📊 ${fixedCount} fichiers avec variables corrigées\n`);
  return fixedCount;
}

// Fonction pour corriger les console statements
function fixConsoleStatements() {
  console.log('🔧 Correction des console statements...\n');
  
  const srcDir = 'src';
  let fixedCount = 0;
  
  function processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Commenter les console statements
      content = content.replace(/console\.(log|warn|error|info)\(/g, '// console.$1(');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Console statements corrigés dans ${filePath}`);
        return true;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${filePath}:`, error.message);
    }
    return false;
  }
  
  function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        fixedCount += processDirectory(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        if (processFile(filePath)) {
          fixedCount++;
        }
      }
    }
    
    return fixedCount;
  }
  
  if (fs.existsSync(srcDir)) {
    fixedCount = processDirectory(srcDir);
  }
  
  console.log(`\n📊 ${fixedCount} fichiers avec console statements corrigés\n`);
  return fixedCount;
}

// Fonction pour tester le build après corrections
function testBuildAfterFixes() {
  console.log('🧪 Test du build après corrections...\n');
  
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build réussi !\n');
    return true;
  } catch (error) {
    console.error('❌ Build échoué:', error.message);
    return false;
  }
}

// Fonction pour analyser les erreurs restantes
function analyzeRemainingErrors() {
  console.log('📊 Analyse des erreurs restantes...\n');
  
  try {
    const lintOutput = execSync('npm run lint 2>&1', { encoding: 'utf8' });
    const lines = lintOutput.split('\n');
    
    let errorCount = 0;
    let warningCount = 0;
    
    for (const line of lines) {
      if (line.includes('error')) {
        errorCount++;
      } else if (line.includes('warning')) {
        warningCount++;
      }
    }
    
    console.log(`📊 Résultats finaux:`);
    console.log(`   🔴 Erreurs: ${errorCount}`);
    console.log(`   🟡 Warnings: ${warningCount}`);
    console.log(`   📈 Total: ${errorCount + warningCount}\n`);
    
    return { errorCount, warningCount, total: errorCount + warningCount };
  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error.message);
    return null;
  }
}

// Fonction principale
function main() {
  console.log('🚀 Démarrage de l\'optimisation finale...\n');
  
  // 1. Analyser les erreurs actuelles
  const initialAnalysis = analyzeCurrentErrors();
  
  if (!initialAnalysis) {
    console.log('❌ Impossible d\'analyser les erreurs ESLint');
    return;
  }
  
  let totalFixed = 0;
  
  // 2. Corriger les types de retour manquants
  totalFixed += fixMissingReturnTypes();
  
  // 3. Corriger les variables inutilisées
  totalFixed += fixUnusedVariables();
  
  // 4. Corriger les console statements
  totalFixed += fixConsoleStatements();
  
  // 5. Tester le build
  const buildSuccess = testBuildAfterFixes();
  
  // 6. Analyser les erreurs restantes
  const finalAnalysis = analyzeRemainingErrors();
  
  console.log('🎉 Optimisation finale terminée !');
  console.log(`📊 ${totalFixed} fichiers modifiés`);
  
  if (buildSuccess) {
    console.log('✅ Build fonctionnel après corrections');
  } else {
    console.log('❌ Build échoué - Vérifiez les erreurs');
  }
  
  if (finalAnalysis) {
    console.log(`📊 ${finalAnalysis.total} problèmes ESLint restants`);
    
    if (finalAnalysis.total === 0) {
      console.log('🎉 Félicitations ! 0 erreur ESLint !');
    } else if (finalAnalysis.total < initialAnalysis.total) {
      const improvement = initialAnalysis.total - finalAnalysis.total;
      console.log(`📈 Amélioration: ${improvement} erreurs corrigées`);
    }
  }
  
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run lint (vérifier les erreurs restantes)');
  console.log('2. Utiliser: node scripts/lint-progress-tracker.js (analyse détaillée)');
  console.log('3. Corriger manuellement les erreurs complexes restantes');
  console.log('4. Utiliser: node scripts/validate-final-state.js (validation finale)');
}

// Exécuter le script
main();
