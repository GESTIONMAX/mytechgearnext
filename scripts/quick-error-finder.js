#!/usr/bin/env node

/**
 * Script de recherche rapide des erreurs communes
 * Utilise grep pour identifier rapidement les erreurs les plus fréquentes
 */

const { execSync } = require('child_process');

console.log('⚡ Recherche Rapide des Erreurs Communes');
console.log('========================================\n');

// Patterns d'erreurs communes avec leurs solutions
const COMMON_ERRORS = {
  'Composants non définis': {
    patterns: [
      "'Card' is not defined",
      "'Image' is not defined", 
      "'Button' is not defined",
      "'Badge' is not defined",
      "'Input' is not defined",
      "'Label' is not defined"
    ],
    solution: 'Ajouter les imports manquants',
    priority: '🔴 CRITIQUE'
  },
  'Variables inutilisées': {
    patterns: [
      'is defined but never used',
      'is assigned a value but never used'
    ],
    solution: 'Préfixer avec _ ou supprimer',
    priority: '🟡 MOYEN'
  },
  'Caractères échappés': {
    patterns: [
      "can be escaped with.*&apos;",
      "can be escaped with.*&quot;"
    ],
    solution: 'Échapper les caractères dans JSX',
    priority: '🟡 MOYEN'
  },
  'Console statements': {
    patterns: [
      'Unexpected console statement'
    ],
    solution: 'Commenter ou supprimer',
    priority: '🟢 FAIBLE'
  },
  'Types any': {
    patterns: [
      'Unexpected any'
    ],
    solution: 'Remplacer par unknown ou type spécifique',
    priority: '🟡 MOYEN'
  },
  'Hooks mal utilisés': {
    patterns: [
      'cannot be called inside a callback'
    ],
    solution: 'Déplacer les hooks au niveau du composant',
    priority: '🔴 CRITIQUE'
  },
  'Imports inutilisés': {
    patterns: [
      'is defined but never used'
    ],
    solution: 'Supprimer les imports inutilisés',
    priority: '🟢 FAIBLE'
  },
  'Types de retour manquants': {
    patterns: [
      'Missing return type on function'
    ],
    solution: 'Ajouter les types de retour',
    priority: '🟢 FAIBLE'
  },
  'Dépendances manquantes': {
    patterns: [
      'missing dependencies'
    ],
    solution: 'Ajouter les dépendances manquantes',
    priority: '🟢 FAIBLE'
  }
};

// Fonction pour exécuter grep rapidement
function quickGrep(pattern) {
  try {
    const command = `grep -rn "${pattern}" src/ --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l`;
    const count = parseInt(execSync(command, { encoding: 'utf8' }).trim());
    return count;
  } catch (error) {
    return 0;
  }
}

// Fonction pour analyser les erreurs par type
function analyzeErrorsByType() {
  console.log('🔍 Analyse rapide des erreurs par type...\n');
  
  const results = {};
  
  for (const [errorType, config] of Object.entries(COMMON_ERRORS)) {
    let totalCount = 0;
    
    for (const pattern of config.patterns) {
      const count = quickGrep(pattern);
      totalCount += count;
    }
    
    results[errorType] = {
      count: totalCount,
      priority: config.priority,
      solution: config.solution
    };
  }
  
  return results;
}

// Fonction pour afficher les résultats
function displayResults(results) {
  console.log('📊 RÉSULTATS DE L\'ANALYSE RAPIDE:');
  console.log('==================================\n');
  
  // Trier par priorité et nombre d'erreurs
  const sortedResults = Object.entries(results)
    .sort((a, b) => {
      const priorityOrder = { '🔴': 1, '🟡': 2, '🟢': 3 };
      const aPriority = priorityOrder[a[1].priority.charAt(0)] || 3;
      const bPriority = priorityOrder[b[1].priority.charAt(0)] || 3;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      return b[1].count - a[1].count;
    });
  
  let totalErrors = 0;
  
  for (const [errorType, data] of sortedResults) {
    if (data.count > 0) {
      console.log(`${data.priority} ${errorType}: ${data.count} erreurs`);
      console.log(`   💡 Solution: ${data.solution}`);
      console.log('');
      totalErrors += data.count;
    }
  }
  
  console.log(`📊 Total: ${totalErrors} erreurs trouvées\n`);
  
  return totalErrors;
}

// Fonction pour générer les recommandations
function generateRecommendations(results) {
  console.log('💡 RECOMMANDATIONS PRIORITAIRES:');
  console.log('================================\n');
  
  const criticalErrors = Object.entries(results).filter(([_, data]) => 
    data.priority === '🔴 CRITIQUE' && data.count > 0
  );
  
  const mediumErrors = Object.entries(results).filter(([_, data]) => 
    data.priority === '🟡 MOYEN' && data.count > 0
  );
  
  const lowErrors = Object.entries(results).filter(([_, data]) => 
    data.priority === '🟢 FAIBLE' && data.count > 0
  );
  
  if (criticalErrors.length > 0) {
    console.log('🔴 ACTIONS IMMÉDIATES:');
    for (const [errorType, data] of criticalErrors) {
      console.log(`   • ${errorType}: ${data.count} erreurs - ${data.solution}`);
    }
    console.log('');
  }
  
  if (mediumErrors.length > 0) {
    console.log('🟡 ACTIONS PRIORITAIRES:');
    for (const [errorType, data] of mediumErrors) {
      console.log(`   • ${errorType}: ${data.count} erreurs - ${data.solution}`);
    }
    console.log('');
  }
  
  if (lowErrors.length > 0) {
    console.log('🟢 ACTIONS DE QUALITÉ:');
    for (const [errorType, data] of lowErrors) {
      console.log(`   • ${errorType}: ${data.count} erreurs - ${data.solution}`);
    }
    console.log('');
  }
}

// Fonction pour générer les commandes de correction
function generateFixCommands(results) {
  console.log('🛠️  COMMANDES DE CORRECTION:');
  console.log('============================\n');
  
  const criticalErrors = Object.entries(results).filter(([_, data]) => 
    data.priority === '🔴 CRITIQUE' && data.count > 0
  );
  
  if (criticalErrors.length > 0) {
    console.log('🔴 Corrections critiques:');
    console.log('node scripts/smart-grep-fixer.js');
    console.log('node scripts/batch-grep-fixer.js');
    console.log('');
  }
  
  console.log('📊 Analyse détaillée:');
  console.log('node scripts/lint-progress-tracker.js');
  console.log('');
  
  console.log('🧪 Tests:');
  console.log('npm run build');
  console.log('npm run lint');
  console.log('');
  
  console.log('✅ Validation finale:');
  console.log('node scripts/validate-final-state.js');
}

// Fonction pour sauvegarder le rapport
function saveQuickReport(results, totalErrors) {
  const timestamp = new Date().toISOString().split('T')[0];
  const reportPath = `QUICK_ERROR_REPORT_${timestamp}.md`;
  
  const report = `# ⚡ Rapport Rapide des Erreurs - ${timestamp}

## 📊 Résumé
- **Total des erreurs**: ${totalErrors}
- **Types d'erreurs**: ${Object.keys(results).filter(key => results[key].count > 0).length}

## 🎯 Erreurs par Priorité

### 🔴 Critiques
${Object.entries(results)
  .filter(([_, data]) => data.priority === '🔴 CRITIQUE' && data.count > 0)
  .map(([type, data]) => `- **${type}**: ${data.count} erreurs - ${data.solution}`)
  .join('\n')}

### 🟡 Moyennes  
${Object.entries(results)
  .filter(([_, data]) => data.priority === '🟡 MOYEN' && data.count > 0)
  .map(([type, data]) => `- **${type}**: ${data.count} erreurs - ${data.solution}`)
  .join('\n')}

### 🟢 Faibles
${Object.entries(results)
  .filter(([_, data]) => data.priority === '🟢 FAIBLE' && data.count > 0)
  .map(([type, data]) => `- **${type}**: ${data.count} erreurs - ${data.solution}`)
  .join('\n')}

## 💡 Recommandations
1. Corriger les erreurs critiques en priorité
2. Utiliser les scripts de correction automatique
3. Tester régulièrement avec \`npm run build\` et \`npm run lint\`
4. Documenter chaque correction effectuée

---
*Rapport généré automatiquement le ${new Date().toLocaleString()}*
`;
  
  try {
    require('fs').writeFileSync(reportPath, report, 'utf8');
    console.log(`📄 Rapport sauvegardé: ${reportPath}\n`);
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error.message);
  }
}

// Fonction principale
function main() {
  console.log('🚀 Démarrage de l\'analyse rapide...\n');
  
  // Analyser les erreurs par type
  const results = analyzeErrorsByType();
  
  // Afficher les résultats
  const totalErrors = displayResults(results);
  
  // Générer les recommandations
  generateRecommendations(results);
  
  // Générer les commandes de correction
  generateFixCommands(results);
  
  // Sauvegarder le rapport
  saveQuickReport(results, totalErrors);
  
  console.log('🎉 Analyse rapide terminée !');
  console.log('📋 Utilisez les recommandations pour planifier vos corrections');
}

// Exécuter le script
main();
