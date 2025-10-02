# MyTechGear - Next.js Project

Un projet Next.js moderne avec TypeScript, Tailwind CSS et une configuration de qualité du code optimisée.

## 🚀 Technologies

- **Next.js 15** avec App Router
- **TypeScript** en mode strict
- **Tailwind CSS** pour le styling
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

## 🎯 Prochaines Étapes

1. **Configuration Strapi** pour le CMS
2. **Migration des données** depuis Supabase
3. **Intégration Prisma** pour l'ORM
4. **Développement des composants** UI
5. **Tests** et déploiement

## 📁 Structure du Projet

```
src/
├── app/                 # App Router Next.js
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Page d'accueil
│   └── globals.css     # Styles globaux
├── components/          # Composants réutilisables
├── lib/                # Utilitaires
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

# Développement
npm run dev

# Vérification qualité
npm run check-all
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [ESLint Rules](https://eslint.org/docs/rules)
