#!/usr/bin/env node

/**
 * Script de suivi des progrès ESLint
 * Analyse et catégorise les erreurs restantes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📊 Suivi des Progrès ESLint');
console.log('============================\n');

// Fonction pour analyser les erreurs ESLint
function analyzeLintErrors() {
  try {
    console.log('🔍 Analyse des erreurs ESLint...\n');

    const lintOutput = execSync('npm run lint 2>&1', { encoding: 'utf8' });
    const lines = lintOutput.split('\n');

    const errors = {
      critical: [],
      medium: [],
      low: [],
      warnings: [],
    };

    let totalErrors = 0;
    let totalWarnings = 0;

    for (const line of lines) {
      if (line.includes('error')) {
        totalErrors++;

        // Catégoriser les erreurs
        if (line.includes('is not defined') || line.includes('cannot be called inside a callback')) {
          errors.critical.push(line.trim());
        } else if (line.includes('Unexpected any') || line.includes('is defined but never used')) {
          errors.medium.push(line.trim());
        } else if (line.includes('can be escaped')) {
          errors.low.push(line.trim());
        }
      } else if (line.includes('warning')) {
        totalWarnings++;
        errors.warnings.push(line.trim());
      }
    }

    return {
      totalErrors,
      totalWarnings,
      total: totalErrors + totalWarnings,
      errors,
      rawOutput: lintOutput,
    };
  } catch (error) {
    console.error("❌ Erreur lors de l'analyse:", error.message);
    return null;
  }
}

// Fonction pour générer le rapport de progression
function generateProgressReport(analysis) {
  if (!analysis) return;

  console.log('📈 RAPPORT DE PROGRESSION');
  console.log('========================\n');

  console.log(`📊 Total des problèmes: ${analysis.total}`);
  console.log(`🔴 Erreurs: ${analysis.totalErrors}`);
  console.log(`🟡 Warnings: ${analysis.totalWarnings}\n`);

  console.log('🎯 RÉPARTITION PAR PRIORITÉ:');
  console.log('============================\n');

  console.log(`🔴 PRIORITÉ 1 - Critiques (${errors.critical.length}):`);
  errors.critical.slice(0, 5).forEach((error, index) => {
    console.log(`   ${index + 1}. ${error}`);
  });
  if (errors.critical.length > 5) {
    console.log(`   ... et ${errors.critical.length - 5} autres`);
  }
  console.log('');

  console.log(`🟡 PRIORITÉ 2 - Moyennes (${errors.medium.length}):`);
  errors.medium.slice(0, 5).forEach((error, index) => {
    console.log(`   ${index + 1}. ${error}`);
  });
  if (errors.medium.length > 5) {
    console.log(`   ... et ${errors.medium.length - 5} autres`);
  }
  console.log('');

  console.log(`🟢 PRIORITÉ 3 - Faibles (${errors.low.length}):`);
  errors.low.slice(0, 5).forEach((error, index) => {
    console.log(`   ${index + 1}. ${error}`);
  });
  if (errors.low.length > 5) {
    console.log(`   ... et ${errors.low.length - 5} autres`);
  }
  console.log('');

  console.log(`⚠️  WARNINGS (${errors.warnings.length}):`);
  errors.warnings.slice(0, 5).forEach((warning, index) => {
    console.log(`   ${index + 1}. ${warning}`);
  });
  if (errors.warnings.length > 5) {
    console.log(`   ... et ${errors.warnings.length - 5} autres`);
  }
  console.log('');
}

// Fonction pour générer les recommandations
function generateRecommendations(analysis) {
  if (!analysis) return;

  console.log('💡 RECOMMANDATIONS:');
  console.log('==================\n');

  if (errors.critical.length > 0) {
    console.log('🔴 ACTIONS IMMÉDIATES:');
    console.log('1. Corriger les composants non définis');
    console.log('2. Corriger les hooks mal utilisés');
    console.log('3. Tester le build après chaque correction\n');
  }

  if (errors.medium.length > 0) {
    console.log('🟡 ACTIONS PRIORITAIRES:');
    console.log('1. Corriger les types any restants');
    console.log('2. Nettoyer les variables inutilisées');
    console.log('3. Corriger par lots de 10 erreurs\n');
  }

  if (errors.low.length > 0) {
    console.log('🟢 ACTIONS DE QUALITÉ:');
    console.log('1. Corriger les caractères échappés');
    console.log('2. Nettoyer les imports inutilisés');
    console.log('3. Améliorer la lisibilité du code\n');
  }

  if (errors.warnings.length > 0) {
    console.log('⚠️  OPTIMISATIONS:');
    console.log('1. Supprimer les console statements');
    console.log('2. Ajouter les types de retour');
    console.log('3. Corriger les dépendances manquantes\n');
  }
}

// Fonction pour sauvegarder le rapport
function saveProgressReport(analysis) {
  if (!analysis) return;

  const timestamp = new Date().toISOString().split('T')[0];
  const reportPath = `LINT_PROGRESS_${timestamp}.md`;

  const report = `# 📊 Rapport de Progression ESLint - ${timestamp}

## 📈 Statistiques
- **Total des problèmes**: ${analysis.total}
- **Erreurs**: ${analysis.totalErrors}
- **Warnings**: ${analysis.totalWarnings}

## 🎯 Répartition par Priorité

### 🔴 Priorité 1 - Critiques (${errors.critical.length})
${errors.critical.map((error, index) => `${index + 1}. ${error}`).join('\n')}

### 🟡 Priorité 2 - Moyennes (${errors.medium.length})
${errors.medium.map((error, index) => `${index + 1}. ${error}`).join('\n')}

### 🟢 Priorité 3 - Faibles (${errors.low.length})
${errors.low.map((error, index) => `${index + 1}. ${error}`).join('\n')}

### ⚠️ Warnings (${errors.warnings.length})
${errors.warnings.map((warning, index) => `${index + 1}. ${warning}`).join('\n')}

## 💡 Recommandations
- Corriger les erreurs critiques en priorité
- Tester le build après chaque correction
- Documenter chaque correction effectuée
- Utiliser une approche par lots pour optimiser

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
  console.log("🚀 Démarrage de l'analyse...\n");

  const analysis = analyzeLintErrors();

  if (analysis) {
    generateProgressReport(analysis);
    generateRecommendations(analysis);
    saveProgressReport(analysis);

    console.log('🎉 Analyse terminée !');
    console.log('📋 Utilisez le rapport généré pour planifier vos corrections');
  } else {
    console.log("❌ Impossible d'analyser les erreurs ESLint");
  }
}

// Exécuter le script
main();
