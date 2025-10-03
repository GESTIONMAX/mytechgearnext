# 🚀 Scripts d'Import WooCommerce - MyTechGear

Ce document décrit les scripts d'import WooCommerce créés pour votre projet MyTechGear.

## 📋 Vue d'ensemble

Les scripts permettent d'importer et de mapper les données WooCommerce vers votre structure locale, avec un focus particulier sur les variantes de produits et leurs attributs spécifiques.

## 🛠️ Scripts disponibles

### 1. **Script principal d'import** (`woocommerce-import.js`)

- Import complet des produits, catégories, attributs et variantes
- Gestion des erreurs et logs détaillés
- Support du mode simulation (dry-run)

### 2. **Script spécialisé variantes** (`woocommerce-variants-import.js`)

- Import spécialisé pour les variantes avec attributs spécifiques
- Mapping des attributs : Audio, Couleur monture, Couleur verre
- Génération des relations parent-enfant

### 3. **Script de mapping des données** (`woocommerce-data-mapper.js`)

- Transformation des données pour correspondre à votre interface
- Génération des SKUs selon votre format
- Création des relations et formatage pour l'UI

### 4. **Script d'orchestration** (`run-woocommerce-import.sh`)

- Script bash pour orchestrer l'ensemble du processus
- Gestion des erreurs et logs
- Interface utilisateur simplifiée

## 🚀 Utilisation

### Prérequis

1. **Variables d'environnement** (déjà configurées dans votre projet) :

```bash
NEXT_PUBLIC_WORDPRESS_URL=https://wordpress-acgc8osw80008cocossggkwk.coolify.myvision-connect.com
NEXT_PUBLIC_WC_CONSUMER_KEY=ck_dfce19c0b5922a6086a3eca6789a2583f83d624b
NEXT_PUBLIC_WC_CONSUMER_SECRET=cs_abc26f4c72e65af85fe37be8f122d0c053cca6c2
```

2. **Dépendances Node.js** (déjà installées) :

- `@woocommerce/woocommerce-rest-api`
- `node-fetch`

### Exécution

#### Option 1 : Script d'orchestration (Recommandé)

```bash
# Import complet avec simulation
./scripts/run-woocommerce-import.sh --all --dry-run --verbose

# Import complet réel
./scripts/run-woocommerce-import.sh --all --verbose

# Import uniquement des variantes
./scripts/run-woocommerce-import.sh --variants --verbose

# Mapping uniquement
./scripts/run-woocommerce-import.sh --map --dry-run
```

#### Option 2 : Scripts individuels

```bash
# Import de base
node scripts/woocommerce-import.js --all --dry-run --verbose

# Import des variantes
node scripts/woocommerce-variants-import.js --dry-run --verbose

# Mapping des données
node scripts/woocommerce-data-mapper.js --dry-run --verbose
```

## 📊 Structure des données

### Attributs mappés

#### Option Audio

- **Avec audio** → `avec-audio` (couleur: #e3f2fd)
- **Sans audio** → `sans-audio` (couleur: #fce4ec)

#### Couleur monture

- **Blanc** → `blanc` (couleur: #ffffff)
- **Noir Mat** → `noir-mat` (couleur: #424242)
- **Bleu** → `bleu` (couleur: #2196f3)
- **Obsidian** → `obsidian` (couleur: #212121)
- **Neon** → `neon` (couleur: #00e676)
- **Black Gold** → `black-gold` (couleur: #ffd700)
- **Gold** → `gold` (couleur: #ffc107)

#### Couleur verre

- **Rouge** → `rouge` (couleur: #f44336)
- **Bleu** → `bleu` (couleur: #2196f3)
- **Fire** → `fire` (couleur: #ff5722)
- **Alpha Purple** → `alpha-purple` (couleur: #9c27b0)
- **Alpha Blue** → `alpha-blue` (couleur: #3f51b5)
- **Smoke** → `smoke` (couleur: #607d8b)
- **Smoke Lenses** → `smoke-lenses` (couleur: #78909c)
- **Calm Lenses** → `calm-lenses` (couleur: #b0bec5)
- **Rose** → `rose` (couleur: #e91e63)

### Format des SKUs générés

Format : `{PRODUCT}-{FRAME}-{LENS}-{AUDIO}`

Exemples :

- `SPR-MSH-BLC-FIR-AUDIO` (Music Shield, Blanc, Fire, Avec audio)
- `SPR-SHL-NBM-BLU-SANS` (Shield, Noir Mat, Bleu, Sans audio)
- `SPR-FAL-BLU-PRL-AUDIO` (Falcon, Bleu, Alpha Purple, Avec audio)

## 📁 Structure des fichiers de sortie

```
data/
├── import/
│   ├── products.json          # Produits importés
│   ├── categories.json        # Catégories importées
│   ├── variations.json       # Variantes importées
│   ├── attributes.json       # Attributs importés
│   └── import-report.json    # Rapport d'import
├── mapped/
│   ├── mapped-products.json   # Produits mappés
│   ├── mapped-variations.json # Variantes mappées
│   ├── product-relations.json # Relations produit-variantes
│   ├── attribute-mapping.json # Mapping des attributs
│   └── mapping-report.json   # Rapport de mapping
└── import/variants/
    ├── variations-{id}.json   # Variantes par produit
    └── variants-import-report.json # Rapport variantes
```

## 🔧 Configuration avancée

### Personnalisation des attributs

Modifiez le fichier `woocommerce-variants-import.js` pour ajuster les attributs :

```javascript
const ATTRIBUTE_MAPPING = {
  audio: {
    name: 'Option Audio',
    slug: 'option-audio',
    options: {
      'Avec audio': 'avec-audio',
      'Sans audio': 'sans-audio',
    },
  },
  // ... autres attributs
};
```

### Personnalisation des SKUs

Modifiez le fichier `woocommerce-data-mapper.js` pour ajuster la génération des SKUs :

```javascript
getProductCode(productName) {
  const codes = {
    'Music Shield': 'MSH',
    'Shield': 'SHL',
    // ... autres codes
  };
  // ...
}
```

## 📝 Logs et monitoring

### Fichiers de logs

- `logs/woocommerce-import.log` - Logs de l'import principal
- `logs/variants-import.log` - Logs de l'import des variantes
- `logs/data-mapper.log` - Logs du mapping des données

### Rapports générés

- Rapport d'import avec statistiques détaillées
- Rapport de mapping avec relations créées
- Rapport des variantes avec attributs mappés

## 🚨 Gestion des erreurs

### Types d'erreurs gérées

- Erreurs de connexion API
- Erreurs de parsing des données
- Erreurs de mapping des attributs
- Erreurs de génération des SKUs

### Stratégies de récupération

- Retry automatique avec délai
- Logs détaillés pour debugging
- Mode simulation pour tester
- Sauvegarde partielle en cas d'erreur

## 🔄 Workflow recommandé

1. **Test initial** :

   ```bash
   ./scripts/run-woocommerce-import.sh --all --dry-run --verbose
   ```

2. **Import des variantes** :

   ```bash
   ./scripts/run-woocommerce-import.sh --variants --verbose
   ```

3. **Mapping des données** :

   ```bash
   ./scripts/run-woocommerce-import.sh --map --verbose
   ```

4. **Import complet** :
   ```bash
   ./scripts/run-woocommerce-import.sh --all --verbose
   ```

## 🎯 Intégration avec votre interface

Les données mappées sont formatées pour correspondre exactement à votre interface :

- **Nom de variante** : Format "Product - Monture Color, Verres Color Audio"
- **SKU** : Format standardisé selon vos besoins
- **Attributs** : Mapping complet avec couleurs et labels
- **Relations** : Liens parent-enfant pour la navigation

## 📞 Support

En cas de problème :

1. Vérifiez les logs dans le dossier `logs/`
2. Utilisez le mode `--dry-run` pour tester
3. Vérifiez les variables d'environnement
4. Consultez les rapports générés

---

**Note** : Ces scripts sont optimisés pour votre structure de données spécifique avec les attributs Audio, Couleur monture et Couleur verre. Ils peuvent être adaptés selon vos besoins futurs.
