# Configuration Supabase pour MyTechGear

## Variables d'environnement requises

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Stripe Configuration (optionnel)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

## Comment obtenir les clés Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous à votre projet
3. Allez dans Settings > API
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

## Migration de la base de données

Si vous avez déjà une base de données Supabase existante :

1. Exportez vos données depuis l'ancien projet
2. Importez-les dans votre nouveau projet Supabase
3. Ou utilisez les migrations SQL existantes dans le dossier `supabase/migrations/`

## Test de la connexion

Une fois les variables configurées, redémarrez le serveur de développement :

```bash
npm run dev
```

Le site devrait maintenant se connecter à votre base de données Supabase.
