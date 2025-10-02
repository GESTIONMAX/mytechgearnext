# Guide Anti-Pause Supabase

## 🛡️ **Stratégies pour Éviter les Pauses Automatiques**

### **Problème**

Supabase met automatiquement en pause les projets inactifs après 7 jours pour économiser les ressources.

### **Solutions Implémentées**

## 🚀 **1. Keep-Alive Script (Local)**

### **Utilisation**

```bash
# Test du script
chmod +x scripts/test-keep-alive.sh
./scripts/test-keep-alive.sh

# Démarrage en continu
node scripts/keep-alive.js
```

### **Fonctionnalités**

- ✅ **Ping automatique** toutes les 5 minutes
- ✅ **Logs détaillés** avec timestamps
- ✅ **Gestion d'erreurs** robuste
- ✅ **Arrêt propre** avec Ctrl+C

## 🔄 **2. GitHub Actions (Recommandé)**

### **Configuration**

1. **Secrets GitHub** à configurer :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Workflow automatique** :
   - Exécution toutes les 5 minutes
   - Exécution manuelle possible
   - Logs détaillés

### **Avantages**

- ✅ **Gratuit** sur GitHub
- ✅ **Fiable** - Infrastructure GitHub
- ✅ **Automatique** - Pas d'intervention manuelle
- ✅ **Logs** - Historique des exécutions

## ☁️ **3. Vercel Cron (Production)**

### **Configuration**

1. **Déployez** sur Vercel
2. **Configurez** les variables d'environnement
3. **Activez** le cron automatique

### **Fichiers de Configuration**

- `vercel.json` - Configuration cron
- `src/app/api/keep-alive/route.ts` - Endpoint API

## 📋 **Méthodes par Ordre de Recommandation**

### **🥇 1. GitHub Actions (Meilleur)**

- ✅ **Gratuit** et fiable
- ✅ **Automatique** 24/7
- ✅ **Pas de serveur** à maintenir
- ✅ **Logs** complets

### **🥈 2. Vercel Cron (Production)**

- ✅ **Intégré** au déploiement
- ✅ **Scalable** avec le projet
- ✅ **Monitoring** Vercel

### **🥉 3. Script Local (Développement)**

- ✅ **Test** rapide
- ✅ **Développement** local
- ❌ **Nécessite** un serveur actif

## 🛠️ **Configuration Rapide**

### **1. GitHub Actions (Recommandé)**

```bash
# 1. Configurez les secrets dans GitHub
# 2. Le workflow se lance automatiquement
# 3. Vérifiez les logs dans Actions
```

### **2. Test Local**

```bash
# 1. Configurez .env.local
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# 2. Testez
./scripts/test-keep-alive.sh

# 3. Démarrez en continu
node scripts/keep-alive.js
```

### **3. Vercel Production**

```bash
# 1. Déployez
vercel --prod

# 2. Configurez les variables d'environnement
# 3. Le cron se lance automatiquement
```

## 📊 **Monitoring et Logs**

### **GitHub Actions**

- 📈 **Historique** des exécutions
- 📊 **Statut** de chaque ping
- 🔍 **Logs détaillés** par exécution

### **Script Local**

- 📝 **Console** en temps réel
- ⏰ **Timestamps** de chaque ping
- ❌ **Erreurs** détaillées

### **Vercel**

- 📊 **Dashboard** Vercel
- 📈 **Métriques** de performance
- 🔍 **Logs** de fonction

## 🚨 **Dépannage**

### **Problèmes Courants**

#### **Variables d'environnement manquantes**

```bash
# Vérifiez votre .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### **Connexion échouée**

```bash
# Testez manuellement
curl -H "apikey: YOUR_ANON_KEY" \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     https://your-project.supabase.co/rest/v1/
```

#### **GitHub Actions ne se lance pas**

- ✅ Vérifiez les secrets GitHub
- ✅ Vérifiez les permissions du repository
- ✅ Vérifiez la syntaxe YAML

## ✅ **Vérification du Fonctionnement**

### **1. Test Manuel**

```bash
# Ping direct
curl -H "apikey: YOUR_KEY" \
     -H "Authorization: Bearer YOUR_KEY" \
     https://your-project.supabase.co/rest/v1/
```

### **2. Vérification GitHub Actions**

- Allez dans **Actions** de votre repository
- Vérifiez que **Keep Supabase Alive** s'exécute
- Consultez les logs pour les erreurs

### **3. Vérification Vercel**

- Allez dans **Functions** de votre projet Vercel
- Vérifiez que `/api/keep-alive` est appelée
- Consultez les logs de fonction

## 🎯 **Recommandations Finales**

### **Pour le Développement**

- 🚀 **GitHub Actions** - Configuration une fois, fonctionne toujours
- 🧪 **Script local** - Pour tester rapidement

### **Pour la Production**

- ☁️ **Vercel Cron** - Intégré au déploiement
- 🔄 **GitHub Actions** - Backup fiable

### **Monitoring**

- 📊 **Vérifiez** les logs régulièrement
- 🔔 **Configurez** des alertes si possible
- 📈 **Surveillez** les métriques Supabase

Avec ces stratégies, votre projet Supabase restera **toujours actif** ! 🎉
