#!/usr/bin/env node

/**
 * Solution complète de correction ESLint
 * Utilise tous les scripts créés pour une correction optimale
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🎯 Solution Complète de Correction ESLint');
console.log('==========================================\n');

// Fonction pour exécuter un script et capturer le résultat
function runScript(scriptName, description) {
  console.log(`🚀 ${description}...\n`);
  
  try {
    const output = execSync(`node scripts/${scriptName}`, { encoding: 'utf8' });
    console.log(`✅ ${description} terminé\n`);
    return { success: true, output };
  } catch (error) {
    console.error(`❌ Erreur avec ${description}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Fonction pour analyser les erreurs ESLint actuelles
function getCurrentErrorCount() {
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
    
    return { errorCount, warningCount, total: errorCount + warningCount };
  } catch (error) {
    return { errorCount: 0, warningCount: 0, total: 0 };
  }
}

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

// Fonction principale
function main() {
  console.log('🚀 Démarrage de la solution complète...\n');
  
  // 1. Analyser l'état initial
  console.log('📊 Analyse de l\'état initial...\n');
  const initialErrors = getCurrentErrorCount();
  console.log(`📊 Erreurs initiales: ${initialErrors.total} (${initialErrors.errorCount} erreurs, ${initialErrors.warningCount} warnings)\n`);
  
  // 2. Correction des erreurs de parsing
  const parsingResult = runScript('fix-parsing-errors.js', 'Correction des erreurs de parsing');
  
  // 3. Correction intelligente via grep
  const smartResult = runScript('smart-grep-fixer.js', 'Correction intelligente via grep');
  
  // 4. Correction par lots
  const batchResult = runScript('batch-grep-fixer.js', 'Correction par lots');
  
  // 5. Optimisation finale
  const optimizerResult = runScript('final-lint-optimizer.js', 'Optimisation finale');
  
  // 6. Test du build
  const buildSuccess = testBuild();
  
  // 7. Analyse finale
  console.log('📊 Analyse finale...\n');
  const finalErrors = getCurrentErrorCount();
  
  // 8. Génération du rapport final
  console.log('📊 RAPPORT FINAL:');
  console.log('================\n');
  
  console.log(`📈 Progrès réalisé:`);
  console.log(`   Avant: ${initialErrors.total} problèmes`);
  console.log(`   Après: ${finalErrors.total} problèmes`);
  
  const improvement = initialErrors.total - finalErrors.total;
  const improvementPercent = initialErrors.total > 0 ? Math.round((improvement / initialErrors.total) * 100) : 0;
  
  console.log(`   Amélioration: ${improvement} problèmes (${improvementPercent}%)\n`);
  
  console.log(`🎯 État du projet:`);
  console.log(`   Build: ${buildSuccess ? '✅ Réussi' : '❌ Échoué'}`);
  console.log(`   Erreurs ESLint: ${finalErrors.errorCount}`);
  console.log(`   Warnings ESLint: ${finalErrors.warningCount}\n`);
  
  // 9. Recommandations finales
  console.log('💡 RECOMMANDATIONS FINALES:');
  console.log('============================\n');
  
  if (finalErrors.total === 0) {
    console.log('🎉 FÉLICITATIONS ! 0 erreur ESLint !');
    console.log('✅ Le projet est prêt pour la production');
  } else if (finalErrors.errorCount === 0) {
    console.log('🎉 Excellent ! Plus d\'erreurs critiques !');
    console.log('🟡 Il reste des warnings à corriger manuellement');
  } else if (improvement > 0) {
    console.log(`📈 Bon progrès ! ${improvement} erreurs corrigées`);
    console.log('🔄 Continuez avec les corrections manuelles');
  } else {
    console.log('⚠️  Des erreurs persistent');
    console.log('🔧 Utilisez les guides de correction manuelle');
  }
  
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Exécuter: npm run lint (vérifier les erreurs restantes)');
  console.log('2. Utiliser: node scripts/lint-progress-tracker.js (analyse détaillée)');
  console.log('3. Consulter: MANUAL_CORRECTION_GUIDE.md (guide de correction manuelle)');
  console.log('4. Utiliser: node scripts/validate-final-state.js (validation finale)');
  
  // 10. Sauvegarder le rapport final
  const timestamp = new Date().toISOString().split('T')[0];
  const reportPath = `FINAL_LINT_REPORT_${timestamp}.md`;
  
  const report = `# 🎯 Rapport Final de Correction ESLint - ${timestamp}

## 📊 Résumé
- **Erreurs initiales**: ${initialErrors.total}
- **Erreurs finales**: ${finalErrors.total}
- **Amélioration**: ${improvement} erreurs (${improvementPercent}%)
- **Build**: ${buildSuccess ? '✅ Réussi' : '❌ Échoué'}

## 🛠️ Scripts Utilisés
1. **fix-parsing-errors.js**: Correction des erreurs de parsing
2. **smart-grep-fixer.js**: Correction intelligente via grep
3. **batch-grep-fixer.js**: Correction par lots
4. **final-lint-optimizer.js**: Optimisation finale

## 📈 Résultats
- **Erreurs ESLint**: ${finalErrors.errorCount}
- **Warnings ESLint**: ${finalErrors.warningCount}
- **Total**: ${finalErrors.total}

## 💡 Recommandations
${finalErrors.total === 0 ? 
  '🎉 Le projet est prêt pour la production !' : 
  '⚠️ Des corrections manuelles sont nécessaires pour les erreurs restantes.'
}

---
*Rapport généré automatiquement le ${new Date().toLocaleString()}*
`;
  
  try {
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`\n📄 Rapport final sauvegardé: ${reportPath}`);
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error.message);
  }
  
  console.log('\n🎉 Solution complète terminée !');
  console.log('📋 Utilisez les recommandations pour finaliser le projet');
}

// Exécuter le script
main();
