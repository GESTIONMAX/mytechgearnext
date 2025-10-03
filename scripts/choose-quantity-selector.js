#!/usr/bin/env node

/**
 * Script d'aide au choix du sélecteur de quantité
 * Aide à décider entre QuantitySelector et AdvancedQuantitySelector
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('🎯 Guide de Choix - Sélecteurs de Quantité');
console.log('==========================================\n');

const questions = [
  {
    question: '📱 Votre site est-il principalement mobile ou desktop ?',
    options: ['Mobile', 'Desktop', 'Mixte'],
    key: 'device',
  },
  {
    question: "🏪 Quel type d'e-commerce développez-vous ?",
    options: ['Standard', 'Premium', 'B2B'],
    key: 'type',
  },
  {
    question: '⚡ La performance est-elle critique ?',
    options: ['Oui', 'Non', 'Moyennement'],
    key: 'performance',
  },
  {
    question: '🎨 Préférez-vous simplicité ou flexibilité ?',
    options: ['Simplicité', 'Flexibilité', 'Équilibre'],
    key: 'preference',
  },
  {
    question: '👥 Votre audience est-elle technique ?',
    options: ['Oui', 'Non', 'Mixte'],
    key: 'audience',
  },
];

let answers = {};

function askQuestion(index) {
  if (index >= questions.length) {
    analyzeAnswers();
    return;
  }

  const q = questions[index];
  console.log(`\n${q.question}`);
  q.options.forEach((option, i) => {
    console.log(`  ${i + 1}. ${option}`);
  });

  rl.question('\nVotre choix (1-3): ', (answer) => {
    const choice = parseInt(answer) - 1;
    if (choice >= 0 && choice < q.options.length) {
      answers[q.key] = q.options[choice];
      askQuestion(index + 1);
    } else {
      console.log('❌ Choix invalide. Veuillez réessayer.');
      askQuestion(index);
    }
  });
}

function analyzeAnswers() {
  console.log('\n🔍 Analyse de vos réponses...\n');

  let score = {
    basic: 0,
    advanced: 0,
  };

  // Analyse des réponses
  if (answers.device === 'Mobile') score.basic += 2;
  if (answers.device === 'Desktop') score.advanced += 2;
  if (answers.device === 'Mixte') {
    score.basic += 1;
    score.advanced += 1;
  }

  if (answers.type === 'Standard') score.basic += 2;
  if (answers.type === 'Premium') score.advanced += 2;
  if (answers.type === 'B2B') score.advanced += 1;

  if (answers.performance === 'Oui') score.basic += 2;
  if (answers.performance === 'Non') score.advanced += 1;

  if (answers.preference === 'Simplicité') score.basic += 2;
  if (answers.preference === 'Flexibilité') score.advanced += 2;
  if (answers.preference === 'Équilibre') {
    score.basic += 1;
    score.advanced += 1;
  }

  if (answers.audience === 'Oui') score.advanced += 1;
  if (answers.audience === 'Non') score.basic += 1;

  // Recommandation
  console.log("📊 Résultats de l'analyse :");
  console.log(`   QuantitySelector (Basique): ${score.basic} points`);
  console.log(`   AdvancedQuantitySelector (Avancé): ${score.advanced} points\n`);

  if (score.basic > score.advanced) {
    console.log('🎯 RECOMMANDATION: QuantitySelector (Basique)');
    console.log('============================================');
    console.log('✅ Avantages pour votre cas :');
    console.log('   • Interface simple et épurée');
    console.log('   • Performance optimale');
    console.log('   • Parfait pour mobile');
    console.log('   • Maintenance facile');
    console.log('\n📝 Code recommandé :');
    console.log(`
import { QuantitySelector } from '@/components/ui/quantity-selector';

<QuantitySelector
  value={quantity}
  onChange={setQuantity}
  allowDelete={true}
  onDelete={handleDelete}
  max={10}
  min={1}
/>`);
  } else if (score.advanced > score.basic) {
    console.log('🎯 RECOMMANDATION: AdvancedQuantitySelector (Avancé)');
    console.log('==================================================');
    console.log('✅ Avantages pour votre cas :');
    console.log('   • Flexibilité maximale');
    console.log('   • Interface configurable');
    console.log('   • Meilleure UX');
    console.log('   • Suppression multiple');
    console.log('\n📝 Code recommandé :');
    console.log(`
import { AdvancedQuantitySelector } from '@/components/ui/advanced-quantity-selector';

<AdvancedQuantitySelector
  value={quantity}
  onChange={setQuantity}
  allowDelete={true}
  onDelete={handleDelete}
  showButtons={true}
  showDropdown={true}
  max={10}
  min={1}
/>`);
  } else {
    console.log('🎯 RECOMMANDATION: AdvancedQuantitySelector (Équilibre)');
    console.log('=====================================================');
    console.log('✅ Configuration équilibrée :');
    console.log('   • Dropdown pour mobile');
    console.log('   • Boutons pour desktop');
    console.log('   • Flexibilité selon le contexte');
    console.log('\n📝 Code recommandé :');
    console.log(`
import { AdvancedQuantitySelector } from '@/components/ui/advanced-quantity-selector';

<AdvancedQuantitySelector
  value={quantity}
  onChange={setQuantity}
  allowDelete={true}
  onDelete={handleDelete}
  showButtons={true}    // Desktop
  showDropdown={true}  // Mobile
  max={10}
  min={1}
/>`);
  }

  console.log('\n🧪 Tests disponibles :');
  console.log('   • http://localhost:3000/test-quantity-selector');
  console.log('   • http://localhost:3000/test-advanced-quantity');
  console.log('   • http://localhost:3000/test-cart-management');

  console.log('\n📚 Documentation :');
  console.log('   • QUANTITY_SELECTOR_GUIDE.md');
  console.log('   • TEST_PAGES_GUIDE.md');

  rl.close();
}

// Démarrer le questionnaire
askQuestion(0);
