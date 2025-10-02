import { createClient } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * API Route Next.js pour les cron jobs de keep-alive
 * Optimisée pour Vercel Cron et GitHub Actions
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const cronSecret = request.headers.get('authorization');

  // Vérification du secret cron (optionnel mais recommandé)
  const expectedSecret = process.env.CRON_SECRET;
  if (expectedSecret && cronSecret !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          error: "Variables d'environnement Supabase manquantes",
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test de connexion avec une requête simple
    const { data: _data, error } = await supabase.from('_keep_alive_check').select('*').limit(1);

    // Si la table n'existe pas, ping basique
    if (error && error.code === 'PGRST116') {
      const pingResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'GET',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!pingResponse.ok) {
        throw new Error(`Ping failed with status: ${pingResponse.status}`);
      }
    } else if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    const duration = Date.now() - startTime;

    // Log pour monitoring
    console.log(`✅ Cron keep-alive successful - ${new Date().toISOString()} - ${duration}ms`);

    return NextResponse.json({
      success: true,
      message: 'Cron keep-alive successful',
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      method: 'Next.js Cron API',
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    console.error('❌ Cron keep-alive failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Cron keep-alive failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        duration: `${duration}ms`,
        method: 'Next.js Cron API',
      },
      { status: 500 },
    );
  }
}

/**
 * POST endpoint pour les tests de cron
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const { testMode = false, forceError = false } = body;

  if (forceError) {
    return NextResponse.json(
      {
        success: false,
        error: 'Test error triggered',
        timestamp: new Date().toISOString(),
        method: 'Next.js Cron API (POST)',
      },
      { status: 500 },
    );
  }

  if (testMode) {
    return NextResponse.json({
      success: true,
      message: 'Cron test mode activated',
      timestamp: new Date().toISOString(),
      method: 'Next.js Cron API (POST)',
    });
  }

  // Rediriger vers GET pour le keep-alive normal
  return GET(request);
}
