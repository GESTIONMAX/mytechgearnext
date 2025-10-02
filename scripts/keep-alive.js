#!/usr/bin/env node

/**
 * Script Keep-Alive Next.js pour éviter les pauses Supabase
 * Utilise les API Routes Next.js pour une meilleure intégration
 */

const _https = require('https');

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const NEXTJS_URL = process.env.NEXTJS_URL || 'http://localhost:3000';
const INTERVAL_MINUTES = 5; // Intervalle en minutes

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Variables d'environnement Supabase manquantes");
  console.error('Assurez-vous que NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont définies');
  process.exit(1);
}

/**
 * Effectue une requête ping via l'API Route Next.js
 */
async function pingViaNextJS() {
  try {
    const response = await fetch(`${NEXTJS_URL}/api/keep-alive`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log(`✅ Next.js Keep-Alive réussi - ${new Date().toLocaleString('fr-FR')} - ${data.duration}`);
    } else {
      console.log(`⚠️  Next.js Keep-Alive - Status: ${response.status} - ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error(`❌ Erreur Next.js Keep-Alive: ${error.message} - ${new Date().toLocaleString('fr-FR')}`);
  }
}

/**
 * Effectue une requête ping directe vers Supabase (fallback)
 */
async function pingSupabaseDirect() {
  try {
    const url = new URL('/rest/v1/', SUPABASE_URL);

    const options = {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      console.log(`✅ Ping Supabase direct réussi - ${new Date().toLocaleString('fr-FR')}`);
    } else {
      console.log(`⚠️  Ping Supabase direct - Status: ${response.status} - ${new Date().toLocaleString('fr-FR')}`);
    }
  } catch (error) {
    console.error(`❌ Erreur ping Supabase direct: ${error.message} - ${new Date().toLocaleString('fr-FR')}`);
  }
}

/**
 * Démarre le keep-alive avec fallback
 */
function startKeepAlive() {
  console.log('🚀 Next.js Keep-Alive Supabase démarré');
  console.log(`📡 Ping toutes les ${INTERVAL_MINUTES} minutes`);
  console.log(`🔗 Next.js URL: ${NEXTJS_URL}`);
  console.log(`🔗 Supabase URL: ${SUPABASE_URL}`);

  // Ping immédiat
  pingViaNextJS();

  // Ping périodique
  setInterval(
    async () => {
      try {
        await pingViaNextJS();
      } catch (_error) {
        console.log('🔄 Fallback vers ping direct Supabase...');
        await pingSupabaseDirect();
      }
    },
    INTERVAL_MINUTES * 60 * 1000,
  );
}

// Gestion des signaux d'arrêt
process.on('SIGINT', () => {
  console.log('\n🛑 Next.js Keep-Alive arrêté');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Next.js Keep-Alive arrêté');
  process.exit(0);
});

// Démarrage
startKeepAlive();
