#!/usr/bin/env node

/**
 * Script de migration des buckets Supabase
 * 
 * Ce script vous aide à migrer vos buckets Supabase depuis l'ancien projet
 * vers le nouveau projet Next.js.
 * 
 * Usage:
 * 1. Configurez vos variables d'environnement dans .env.local
 * 2. Exécutez: node scripts/migrate-buckets.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const OLD_SUPABASE_URL = process.env.OLD_SUPABASE_URL;
const OLD_SUPABASE_KEY = process.env.OLD_SUPABASE_KEY;
const NEW_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const NEW_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const BUCKETS_TO_MIGRATE = [
  'category-images',
  'product-images', 
  'product-gallery',
  'variant-images',
  'ui-assets'
];

async function migrateBuckets() {
  console.log('🚀 Début de la migration des buckets Supabase...\n');

  if (!OLD_SUPABASE_URL || !OLD_SUPABASE_KEY) {
    console.error('❌ Variables OLD_SUPABASE_URL et OLD_SUPABASE_KEY requises');
    console.log('Ajoutez-les à votre fichier .env.local:');
    console.log('OLD_SUPABASE_URL=your_old_supabase_url');
    console.log('OLD_SUPABASE_KEY=your_old_supabase_key');
    process.exit(1);
  }

  if (!NEW_SUPABASE_URL || !NEW_SUPABASE_KEY) {
    console.error('❌ Variables NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY requises');
    process.exit(1);
  }

  const oldClient = createClient(OLD_SUPABASE_URL, OLD_SUPABASE_KEY);
  const newClient = createClient(NEW_SUPABASE_URL, NEW_SUPABASE_KEY);

  for (const bucketName of BUCKETS_TO_MIGRATE) {
    console.log(`📦 Migration du bucket: ${bucketName}`);
    
    try {
      // Vérifier si le bucket existe dans l'ancien projet
      const { data: oldFiles, error: listError } = await oldClient.storage
        .from(bucketName)
        .list('', { limit: 1000 });

      if (listError) {
        console.log(`⚠️  Bucket ${bucketName} non trouvé dans l'ancien projet`);
        continue;
      }

      if (!oldFiles || oldFiles.length === 0) {
        console.log(`📭 Bucket ${bucketName} vide`);
        continue;
      }

      console.log(`📁 ${oldFiles.length} fichiers trouvés`);

      // Créer le bucket dans le nouveau projet s'il n'existe pas
      const { error: createError } = await newClient.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 50 * 1024 * 1024, // 50MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
      });

      if (createError && !createError.message.includes('already exists')) {
        console.error(`❌ Erreur création bucket ${bucketName}:`, createError.message);
        continue;
      }

      // Migrer les fichiers
      let migratedCount = 0;
      for (const file of oldFiles) {
        try {
          // Télécharger depuis l'ancien bucket
          const { data: fileData, error: downloadError } = await oldClient.storage
            .from(bucketName)
            .download(file.name);

          if (downloadError) {
            console.log(`⚠️  Impossible de télécharger ${file.name}: ${downloadError.message}`);
            continue;
          }

          // Upload vers le nouveau bucket
          const { error: uploadError } = await newClient.storage
            .from(bucketName)
            .upload(file.name, fileData, {
              cacheControl: '3600',
              upsert: true
            });

          if (uploadError) {
            console.log(`⚠️  Impossible d'uploader ${file.name}: ${uploadError.message}`);
            continue;
          }

          migratedCount++;
          console.log(`✅ ${file.name} migré`);

        } catch (error) {
          console.log(`❌ Erreur migration ${file.name}:`, error.message);
        }
      }

      console.log(`✅ Bucket ${bucketName}: ${migratedCount}/${oldFiles.length} fichiers migrés\n`);

    } catch (error) {
      console.error(`❌ Erreur migration bucket ${bucketName}:`, error.message);
    }
  }

  console.log('🎉 Migration terminée !');
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Vérifiez vos buckets dans le dashboard Supabase');
  console.log('2. Testez l\'affichage des images sur votre site');
  console.log('3. Mettez à jour les chemins d\'images si nécessaire');
}

// Fonction pour lister les buckets existants
async function listBuckets() {
  console.log('📋 Buckets disponibles dans l\'ancien projet:');
  
  const oldClient = createClient(OLD_SUPABASE_URL, OLD_SUPABASE_KEY);
  
  for (const bucketName of BUCKETS_TO_MIGRATE) {
    try {
      const { data, error } = await oldClient.storage
        .from(bucketName)
        .list('', { limit: 1 });
      
      if (error) {
        console.log(`❌ ${bucketName}: ${error.message}`);
      } else {
        console.log(`✅ ${bucketName}: accessible`);
      }
    } catch (error) {
      console.log(`❌ ${bucketName}: ${error.message}`);
    }
  }
}

// Exécution du script
const command = process.argv[2];

if (command === 'list') {
  listBuckets();
} else {
  migrateBuckets();
}
