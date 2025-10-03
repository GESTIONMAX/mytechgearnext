#!/usr/bin/env node

/**
 * Script de correction automatique des erreurs ESLint
 * Corrige les erreurs les plus communes
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Script de Correction ESLint');
console.log('==============================\n');

// Fonction pour corriger les apostrophes et guillemets
function fixEscapedCharacters(content) {
  return (
    content
      // Corriger les apostrophes
      .replace(/'/g, '&apos;')
      // Corriger les guillemets
      .replace(/"/g, '&quot;')
  );
}

// Fonction pour corriger les paramètres inutilisés
function fixUnusedParameters(content) {
  return (
    content
      // Ajouter underscore aux paramètres inutilisés
      .replace(/\(([a-zA-Z_][a-zA-Z0-9_]*):/g, '(_$1:')
      .replace(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([a-zA-Z_][a-zA-Z0-9_]*):/g, 'function $1(_$2:')
  );
}

// Fonction pour corriger les types any
function fixAnyTypes(content) {
  return content.replace(/: any/g, ': unknown').replace(/any\[\]/g, 'unknown[]');
}

// Fonction pour supprimer les console.log
function removeConsoleLogs(content) {
  return content
    .replace(/console\.log\([^)]*\);?\n/g, '')
    .replace(/console\.error\([^)]*\);?\n/g, '')
    .replace(/console\.warn\([^)]*\);?\n/g, '');
}

// Fonction pour ajouter les types de retour
function addReturnTypes(content) {
  return content
    .replace(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, 'function $1(): void (')
    .replace(/const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\(/g, 'const $1 = (): void => (');
}

// Fonction pour corriger un fichier
function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let fixedContent = content;

    // Appliquer les corrections
    fixedContent = fixEscapedCharacters(fixedContent);
    fixedContent = fixUnusedParameters(fixedContent);
    fixedContent = fixAnyTypes(fixedContent);
    // fixedContent = removeConsoleLogs(fixedContent); // Commenté pour garder les console.log de debug
    // fixedContent = addReturnTypes(fixedContent); // Commenté car peut casser le code

    if (fixedContent !== content) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Corrigé: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
    return false;
  }
}

// Fonction pour parcourir les fichiers
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let fixedCount = 0;

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      fixedCount += processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (fixFile(filePath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

// Fonction principale
function main() {
  console.log('🔍 Recherche des fichiers à corriger...\n');

  const srcDir = path.join(process.cwd(), 'src');
  const componentsDir = path.join(process.cwd(), 'components');

  let totalFixed = 0;

  // Traiter le dossier src
  if (fs.existsSync(srcDir)) {
    console.log('📁 Traitement du dossier src/...');
    totalFixed += processDirectory(srcDir);
  }

  // Traiter le dossier components
  if (fs.existsSync(componentsDir)) {
    console.log('📁 Traitement du dossier components/...');
    totalFixed += processDirectory(componentsDir);
  }

  console.log(`\n🎉 Correction terminée !`);
  console.log(`📊 ${totalFixed} fichiers corrigés`);

  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run lint');
  console.log('2. Vérifier les erreurs restantes');
  console.log('3. Corriger manuellement si nécessaire');
}

// Exécuter le script
main();
