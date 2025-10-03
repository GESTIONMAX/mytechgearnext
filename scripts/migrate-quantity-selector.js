#!/usr/bin/env node

/**
 * Script de migration entre les sélecteurs de quantité
 * Permet de migrer facilement d'une version à l'autre
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Script de Migration - Sélecteurs de Quantité');
console.log('===============================================\n');

const migrationOptions = [
  {
    name: 'Basique → Avancé',
    description: 'Migrer de QuantitySelector vers AdvancedQuantitySelector',
    from: 'QuantitySelector',
    to: 'AdvancedQuantitySelector',
    changes: ["Remplacer l'import", 'Ajouter les props showButtons et showDropdown', 'Garder la même fonctionnalité'],
  },
  {
    name: 'Avancé → Basique',
    description: 'Migrer de AdvancedQuantitySelector vers QuantitySelector',
    from: 'AdvancedQuantitySelector',
    to: 'QuantitySelector',
    changes: [
      "Remplacer l'import",
      'Supprimer les props showButtons et showDropdown',
      'Garder allowDelete et onDelete',
    ],
  },
  {
    name: 'Configuration Avancée',
    description: 'Configurer AdvancedQuantitySelector selon le contexte',
    from: 'AdvancedQuantitySelector',
    to: 'AdvancedQuantitySelector (configuré)',
    changes: [
      'Ajuster showButtons selon le contexte',
      'Ajuster showDropdown selon le contexte',
      'Optimiser pour mobile/desktop',
    ],
  },
];

function showMigrationOptions() {
  console.log('📋 Options de migration disponibles :\n');

  migrationOptions.forEach((option, index) => {
    console.log(`${index + 1}. ${option.name}`);
    console.log(`   ${option.description}`);
    console.log(`   De: ${option.from}`);
    console.log(`   Vers: ${option.to}`);
    console.log(`   Changements: ${option.changes.join(', ')}\n`);
  });
}

function generateMigrationCode(from, to) {
  console.log(`\n📝 Code de migration : ${from} → ${to}\n`);

  if (from === 'QuantitySelector' && to === 'AdvancedQuantitySelector') {
    console.log('// AVANT (QuantitySelector)');
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

    console.log('\n// APRÈS (AdvancedQuantitySelector)');
    console.log(`
import { AdvancedQuantitySelector } from '@/components/ui/advanced-quantity-selector';

<AdvancedQuantitySelector
  value={quantity}
  onChange={setQuantity}
  allowDelete={true}
  onDelete={handleDelete}
  showButtons={true}    // Nouveau
  showDropdown={true}   // Nouveau
  max={10}
  min={1}
/>`);
  } else if (from === 'AdvancedQuantitySelector' && to === 'QuantitySelector') {
    console.log('// AVANT (AdvancedQuantitySelector)');
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

    console.log('\n// APRÈS (QuantitySelector)');
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
  } else if (from === 'AdvancedQuantitySelector' && to === 'AdvancedQuantitySelector (configuré)') {
    console.log('// Configuration pour Mobile-First');
    console.log(`
<AdvancedQuantitySelector
  value={quantity}
  onChange={setQuantity}
  allowDelete={true}
  onDelete={handleDelete}
  showButtons={false}   // Pas de boutons pour mobile
  showDropdown={true}  // Seulement dropdown
  max={10}
  min={1}
/>`);

    console.log('\n// Configuration pour Desktop-First');
    console.log(`
<AdvancedQuantitySelector
  value={quantity}
  onChange={setQuantity}
  allowDelete={true}
  onDelete={handleDelete}
  showButtons={true}    // Boutons pour desktop
  showDropdown={true}  // Dropdown aussi
  max={10}
  min={1}
/>`);

    console.log('\n// Configuration Équilibrée');
    console.log(`
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
}

function showUsageExamples() {
  console.log("\n📚 Exemples d'utilisation :\n");

  console.log('1. 🛒 Dans un panier (Mobile-First) :');
  console.log(`
<AdvancedQuantitySelector
  value={item.quantity}
  onChange={(qty) => updateQuantity(item.id, qty)}
  allowDelete={true}
  onDelete={() => removeItem(item.id)}
  showButtons={false}   // Mobile : dropdown seulement
  showDropdown={true}
  max={10}
  min={1}
/>`);

  console.log('\n2. 🖥️ Dans une interface admin (Desktop) :');
  console.log(`
<AdvancedQuantitySelector
  value={stock}
  onChange={setStock}
  allowDelete={false}   // Pas de suppression en admin
  showButtons={true}   // Desktop : boutons précis
  showDropdown={false} // Pas de dropdown en admin
  max={999}
  min={0}
/>`);

  console.log('\n3. 📱 Dans une liste produits (Mixte) :');
  console.log(`
<AdvancedQuantitySelector
  value={quantity}
  onChange={setQuantity}
  allowDelete={true}
  onDelete={handleDelete}
  showButtons={true}    // Desktop
  showDropdown={true}   // Mobile
  max={5}              // Limite basse pour UX
  min={1}
/>`);
}

function showBestPractices() {
  console.log('\n💡 Bonnes pratiques :\n');

  console.log('✅ Utilisez QuantitySelector quand :');
  console.log('   • Interface simple requise');
  console.log('   • Performance critique');
  console.log('   • Mobile-first');
  console.log('   • Maintenance minimale');

  console.log('\n✅ Utilisez AdvancedQuantitySelector quand :');
  console.log('   • Flexibilité requise');
  console.log('   • Interface variable');
  console.log('   • UX avancée');
  console.log('   • Desktop + Mobile');

  console.log('\n🎯 Configuration recommandée pour MyTechGear :');
  console.log(`
<AdvancedQuantitySelector
  value={quantity}
  onChange={setQuantity}
  allowDelete={true}
  onDelete={handleDelete}
  showButtons={true}    // Desktop : précision
  showDropdown={true}   // Mobile : rapidité
  max={10}             // Limite raisonnable
  min={1}
  className="w-fit"    // Taille adaptative
/>`);
}

// Afficher les options
showMigrationOptions();

// Afficher les exemples
showUsageExamples();

// Afficher les bonnes pratiques
showBestPractices();

console.log('\n🧪 Tests recommandés :');
console.log('   • http://localhost:3000/test-quantity-selector');
console.log('   • http://localhost:3000/test-advanced-quantity');
console.log('   • http://localhost:3000/test-cart-management');

console.log('\n📚 Documentation :');
console.log('   • QUANTITY_SELECTOR_GUIDE.md');
console.log('   • TEST_PAGES_GUIDE.md');

console.log(
  '\n🎯 Pour MyTechGear, je recommande AdvancedQuantitySelector avec showButtons=true et showDropdown=true !',
);
