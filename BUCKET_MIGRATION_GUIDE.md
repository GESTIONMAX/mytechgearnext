# Guide de Migration des Buckets Supabase

## 🎯 Objectif

Ce guide vous aide à migrer vos buckets Supabase (images, assets) depuis votre ancien projet vers le nouveau projet Next.js.

## 📦 Buckets à Migrer

Votre projet utilise 5 buckets principaux :

1. **`category-images`** - Images des catégories/collections
2. **`product-images`** - Images principales des produits
3. **`product-gallery`** - Galeries photos des produits
4. **`variant-images`** - Images des variantes de produits
5. **`ui-assets`** - Icônes, logos, éléments UI

## 🔧 Configuration

### 1. Variables d'environnement

Ajoutez ces variables à votre fichier `.env.local` :

```env
# Ancien projet (source)
OLD_SUPABASE_URL=your_old_supabase_url_here
OLD_SUPABASE_KEY=your_old_supabase_key_here

# Nouveau projet (destination)
NEXT_PUBLIC_SUPABASE_URL=your_new_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_new_supabase_anon_key_here
```

### 2. Installation des dépendances

```bash
npm install dotenv
```

## 🚀 Migration Automatique

### Option 1: Script automatique

```bash
# Lister les buckets disponibles
node scripts/migrate-buckets.js list

# Migrer tous les buckets
node scripts/migrate-buckets.js
```

### Option 2: Migration manuelle

1. **Accédez au dashboard Supabase** de votre ancien projet
2. **Allez dans Storage**
3. **Pour chaque bucket** :
   - Téléchargez les fichiers
   - Uploadez dans le nouveau projet

## 📋 Vérification Post-Migration

### 1. Vérifier les buckets

```bash
# Dans votre nouveau projet Supabase
# Allez dans Storage > Buckets
# Vérifiez que tous les buckets existent
```

### 2. Tester les images

```bash
# Démarrez votre serveur de développement
npm run dev

# Vérifiez que les images s'affichent correctement
# sur les pages produits, catégories, etc.
```

### 3. Vérifier les chemins

Les chemins d'images doivent être mis à jour dans votre base de données :

```sql
-- Exemple de mise à jour des chemins
UPDATE product_images
SET image_url = REPLACE(image_url, 'old-domain.com', 'new-domain.com');

UPDATE category_images
SET image_url = REPLACE(image_url, 'old-domain.com', 'new-domain.com');
```

## 🔍 Dépannage

### Problème : Images ne s'affichent pas

**Solution :**

1. Vérifiez que les buckets sont publics
2. Vérifiez les politiques RLS
3. Vérifiez les chemins dans la base de données

### Problème : Erreur de permissions

**Solution :**

```sql
-- Créer les politiques RLS pour les buckets
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id IN (
  'product-images',
  'product-gallery',
  'variant-images',
  'ui-assets',
  'category-images'
));
```

### Problème : Fichiers trop volumineux

**Solution :**

1. Compressez les images avant upload
2. Augmentez la limite de taille des buckets
3. Utilisez un CDN externe

## 📊 Statistiques de Migration

Après migration, vous devriez avoir :

- ✅ **5 buckets** créés
- ✅ **Images produits** migrées
- ✅ **Images catégories** migrées
- ✅ **Assets UI** migrés
- ✅ **Politiques RLS** configurées

## 🎯 Prochaines Étapes

1. **Tester l'affichage** des images sur le site
2. **Optimiser** les images si nécessaire
3. **Configurer** un CDN pour de meilleures performances
4. **Mettre en place** la compression automatique

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs du script de migration
2. Consultez la documentation Supabase Storage
3. Vérifiez les politiques RLS dans votre dashboard
