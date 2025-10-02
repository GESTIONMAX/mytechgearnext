# MyTechGear - Next.js E-commerce Project

Application e-commerce moderne pour lunettes avec Next.js, TypeScript, Tailwind CSS et Supabase.

## 🚀 Technologies

- **Next.js 15** avec App Router
- **TypeScript** en mode strict
- **Tailwind CSS** pour le styling
- **Supabase** pour la base de données et l'authentification
- **ESLint** avec règles strictes
- **Prettier** pour le formatage
- **Turbopack** pour le développement rapide

## 🛠️ Configuration Qualité

### TypeScript Strict Mode

- `noImplicitAny`: true
- `noUnusedLocals`: true
- `noUnusedParameters`: true
- `exactOptionalPropertyTypes`: true
- `noImplicitReturns`: true
- `noFallthroughCasesInSwitch`: true

### ESLint Rules

- Interdiction des types `any`
- Types de retour explicites
- Imports de types cohérents
- Variables non utilisées interdites
- Console.log en warning

### Prettier

- Single quotes
- Trailing commas
- Print width: 120
- Tab width: 2

## 📦 Scripts Disponibles

```bash
# Développement
npm run dev

# Build
npm run build

# Production
npm run start

# Qualité du code
npm run lint          # Linter
npm run lint:fix      # Corriger automatiquement
npm run lint:check    # Vérifier sans warnings
npm run format        # Formater avec Prettier
npm run format:check  # Vérifier le formatage
npm run type-check    # Vérifier TypeScript
npm run check-all     # Tout vérifier
npm run fix-all       # Tout corriger
```

## 🎯 Fonctionnalités

1. **Système d'authentification** avec Supabase
2. **Gestion des produits** et variantes
3. **Panier d'achat** avec contexte React
4. **Upload d'images** avec Supabase Storage
5. **Design system** avec Tailwind CSS
6. **Interface multilingue** (FR/EN)
7. **Pages spécialisées** (Sport, Lifestyle, Prismatic)

## 📁 Structure du Projet

```
src/
├── app/                 # App Router Next.js
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Page d'accueil
│   ├── globals.css     # Styles globaux
│   ├── account/        # Pages compte utilisateur
│   ├── products/       # Pages produits
│   ├── checkout/       # Pages commande
│   └── api/            # API routes
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base
│   └── providers/      # Providers React
├── contexts/           # Contextes React (panier, etc.)
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires et configuration
│   └── supabase/       # Configuration Supabase
├── services/           # Services (storage, etc.)
└── types/              # Types TypeScript
```

## 🔧 Configuration VS Code

Le projet inclut une configuration VS Code optimisée :

- Formatage automatique à la sauvegarde
- ESLint intégré
- Extensions recommandées
- IntelliSense TypeScript

## 🚀 Démarrage Rapide

```bash
# Installation
npm install

# Configuration Supabase
# Copier .env.example vers .env.local et configurer les variables

# Développement
npm run dev

# Vérification qualité
npm run check-all
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [ESLint Rules](https://eslint.org/docs/rules)

## 🎨 Design System

Le projet utilise un design system moderne avec :

- **Palette de couleurs** : Noir et blanc luxueux
- **Typographie** : Inter (sans-serif) et Merriweather (serif)
- **Composants** : Radix UI + Tailwind CSS
- **Animations** : Transitions fluides et élégantes
