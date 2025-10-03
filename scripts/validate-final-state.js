#!/usr/bin/env node

/**
 * Script de validation finale
 * Vérifie que le projet est prêt pour la production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎯 Validation Finale du Projet');
console.log('===============================\n');

// Fonction pour tester le build
function testBuild() {
  console.log('🧪 Test du build...\n');

  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build réussi !\n');
    return true;
  } catch (error) {
    console.error('❌ Build échoué:', error.message);
    return false;
  }
}

// Fonction pour analyser les erreurs ESLint
function analyzeLintErrors() {
  console.log('🔍 Analyse des erreurs ESLint...\n');

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

    const total = errorCount + warningCount;

    console.log(`📊 Résultats ESLint:`);
    console.log(`   🔴 Erreurs: ${errorCount}`);
    console.log(`   🟡 Warnings: ${warningCount}`);
    console.log(`   📈 Total: ${total}\n`);

    return { errorCount, warningCount, total };
  } catch (error) {
    console.error("❌ Erreur lors de l'analyse ESLint:", error.message);
    return null;
  }
}

// Fonction pour vérifier les fichiers critiques
function checkCriticalFiles() {
  console.log('📁 Vérification des fichiers critiques...\n');

  const criticalFiles = [
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/app/products/page.tsx',
    'src/app/checkout/page.tsx',
    'src/components/Header.tsx',
    'src/components/Footer.tsx',
    'package.json',
    'next.config.ts',
    'tsconfig.json',
  ];

  let missingFiles = [];

  for (const file of criticalFiles) {
    if (!fs.existsSync(file)) {
      missingFiles.push(file);
    }
  }

  if (missingFiles.length === 0) {
    console.log('✅ Tous les fichiers critiques sont présents\n');
  } else {
    console.log('❌ Fichiers critiques manquants:');
    missingFiles.forEach((file) => console.log(`   - ${file}`));
    console.log('');
  }

  return missingFiles.length === 0;
}

// Fonction pour vérifier les dépendances
function checkDependencies() {
  console.log('📦 Vérification des dépendances...\n');

  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = [
      'next',
      'react',
      'react-dom',
      'typescript',
      '@types/react',
      '@types/node',
      'tailwindcss',
      'eslint',
    ];

    let missingDeps = [];

    for (const dep of requiredDeps) {
      if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
        missingDeps.push(dep);
      }
    }

    if (missingDeps.length === 0) {
      console.log('✅ Toutes les dépendances critiques sont présentes\n');
    } else {
      console.log('❌ Dépendances manquantes:');
      missingDeps.forEach((dep) => console.log(`   - ${dep}`));
      console.log('');
    }

    return missingDeps.length === 0;
  } catch (error) {
    console.error('❌ Erreur lors de la vérification des dépendances:', error.message);
    return false;
  }
}

// Fonction pour générer le rapport de validation
function generateValidationReport(buildSuccess, lintResults, filesOk, depsOk) {
  console.log('📊 RAPPORT DE VALIDATION');
  console.log('========================\n');

  console.log('🎯 ÉTAT DU PROJET:');
  console.log(`   Build: ${buildSuccess ? '✅ Réussi' : '❌ Échoué'}`);
  console.log(`   Fichiers critiques: ${filesOk ? '✅ OK' : '❌ Manquants'}`);
  console.log(`   Dépendances: ${depsOk ? '✅ OK' : '❌ Manquantes'}`);

  if (lintResults) {
    console.log(`   ESLint: ${lintResults.errorCount} erreurs, ${lintResults.warningCount} warnings`);
  }

  console.log('');

  // Déterminer l'état global
  const isProductionReady = buildSuccess && filesOk && depsOk && lintResults && lintResults.errorCount === 0;

  if (isProductionReady) {
    console.log('🎉 PROJET PRÊT POUR LA PRODUCTION !');
    console.log('   ✅ Build fonctionnel');
    console.log('   ✅ Fichiers critiques présents');
    console.log('   ✅ Dépendances installées');
    console.log('   ✅ 0 erreur ESLint');
  } else {
    console.log('⚠️  PROJET NÉCESSITE DES CORRECTIONS:');

    if (!buildSuccess) {
      console.log('   ❌ Build échoué - Corriger les erreurs de compilation');
    }

    if (!filesOk) {
      console.log('   ❌ Fichiers critiques manquants - Vérifier la structure');
    }

    if (!depsOk) {
      console.log('   ❌ Dépendances manquantes - Installer les packages');
    }

    if (lintResults && lintResults.errorCount > 0) {
      console.log(`   ❌ ${lintResults.errorCount} erreurs ESLint - Corriger les erreurs`);
    }
  }

  console.log('');

  return isProductionReady;
}

// Fonction pour sauvegarder le rapport
function saveValidationReport(isProductionReady, lintResults) {
  const timestamp = new Date().toISOString().split('T')[0];
  const reportPath = `VALIDATION_REPORT_${timestamp}.md`;

  const report = `# 📊 Rapport de Validation - ${timestamp}

## 🎯 État du Projet
- **Production Ready**: ${isProductionReady ? '✅ OUI' : '❌ NON'}
- **Build**: ${isProductionReady ? '✅ Réussi' : '❌ Échoué'}
- **ESLint**: ${lintResults ? `${lintResults.errorCount} erreurs, ${lintResults.warningCount} warnings` : 'Non analysé'}

## 📋 Prochaines Étapes
${
  isProductionReady
    ? '🎉 Le projet est prêt pour la production !'
    : '⚠️ Des corrections sont nécessaires avant la production.'
}

---
*Rapport généré automatiquement le ${new Date().toLocaleString()}*
`;

  try {
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`📄 Rapport sauvegardé: ${reportPath}\n`);
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error.message);
  }
}

// Fonction principale
function main() {
  console.log('🚀 Démarrage de la validation...\n');

  // 1. Tester le build
  const buildSuccess = testBuild();

  // 2. Analyser les erreurs ESLint
  const lintResults = analyzeLintErrors();

  // 3. Vérifier les fichiers critiques
  const filesOk = checkCriticalFiles();

  // 4. Vérifier les dépendances
  const depsOk = checkDependencies();

  // 5. Générer le rapport
  const isProductionReady = generateValidationReport(buildSuccess, lintResults, filesOk, depsOk);

  // 6. Sauvegarder le rapport
  saveValidationReport(isProductionReady, lintResults);

  if (isProductionReady) {
    console.log('🎉 Validation terminée avec succès !');
    console.log('📋 Le projet est prêt pour la production');
  } else {
    console.log('⚠️  Validation terminée avec des avertissements');
    console.log('📋 Consultez le rapport pour les corrections nécessaires');
  }
}

// Exécuter le script
main();
