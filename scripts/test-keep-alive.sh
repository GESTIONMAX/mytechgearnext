#!/bin/bash

# Script de test du Keep-Alive Next.js Supabase
# Teste la connexion et le ping via Next.js

echo "🧪 Test du Next.js Keep-Alive Supabase..."

# Vérification des variables d'environnement
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "❌ Variables d'environnement manquantes"
    echo "Configurez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY"
    exit 1
fi

echo "🔗 URL Supabase: $NEXT_PUBLIC_SUPABASE_URL"
echo "🔑 Clé API: ${NEXT_PUBLIC_SUPABASE_ANON_KEY:0:20}..."

# Vérification de Next.js
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

# Test de build Next.js
echo "🔨 Test de build Next.js..."
npm run build || {
    echo "❌ Build Next.js échoué"
    exit 1
}

# Démarrage du serveur Next.js
echo "🚀 Démarrage du serveur Next.js..."
npm start &
SERVER_PID=$!

# Attendre que le serveur démarre
echo "⏳ Attente du démarrage du serveur..."
sleep 15

# Test des API Routes
echo "📡 Test des API Routes Next.js..."

# Test de l'API Route keep-alive
echo "🔍 Test /api/keep-alive..."
curl -f http://localhost:3000/api/keep-alive || {
    echo "❌ API Route /api/keep-alive échouée"
    kill $SERVER_PID 2>/dev/null
    exit 1
}

# Test de l'API Route cron
echo "🔍 Test /api/cron/keep-alive..."
curl -f http://localhost:3000/api/cron/keep-alive || {
    echo "❌ API Route /api/cron/keep-alive échouée"
    kill $SERVER_PID 2>/dev/null
    exit 1
}

# Test du script keep-alive
echo "📡 Test du script keep-alive..."
NEXTJS_URL=http://localhost:3000 node scripts/keep-alive.js &
KEEP_ALIVE_PID=$!

# Attendre 10 secondes
sleep 10

# Arrêter les processus
kill $KEEP_ALIVE_PID 2>/dev/null
kill $SERVER_PID 2>/dev/null

echo "✅ Test Next.js terminé avec succès"
echo "📋 Pour démarrer le keep-alive en continu:"
echo "   npm start &"
echo "   NEXTJS_URL=http://localhost:3000 node scripts/keep-alive.js"
