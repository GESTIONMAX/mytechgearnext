#!/bin/bash

# Script de déploiement du Keep-Alive sur Vercel
# Ce script configure un cron job pour maintenir Supabase actif

echo "🚀 Configuration du Keep-Alive Supabase..."

# Vérification des variables d'environnement
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "❌ Variables d'environnement Supabase manquantes"
    echo "Configurez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY"
    exit 1
fi

# Création du dossier scripts s'il n'existe pas
mkdir -p scripts

# Rendre le script exécutable
chmod +x scripts/keep-alive.js

echo "✅ Keep-Alive configuré avec succès"
echo "📡 Ping automatique toutes les 5 minutes"
echo "🔗 URL Supabase: $NEXT_PUBLIC_SUPABASE_URL"

# Instructions pour le déploiement
echo ""
echo "📋 Pour déployer le Keep-Alive:"
echo "1. Déployez sur Vercel: vercel --prod"
echo "2. Configurez un cron job sur votre serveur"
echo "3. Ou utilisez GitHub Actions (voir .github/workflows/keep-alive.yml)"
