import { createClient } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

/**
 * API Route Next.js pour maintenir Supabase actif
 * Compatible avec Vercel Cron, GitHub Actions, et appels manuels
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    // Vérification des variables d'environnement
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

    // Création du client Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test de connexion avec une requête simple
    const { data: _data, error } = await supabase.from('_keep_alive_check').select('*').limit(1);

    // Si la table n'existe pas, on fait un ping basique
    if (error && error.code === 'PGRST116') {
      // Ping basique vers l'API REST
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

    return NextResponse.json({
      success: true,
      message: 'Supabase keep-alive successful',
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      method: 'Next.js API Route',
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    logger.error('Keep-alive error', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Keep-alive failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        duration: `${duration}ms`,
        method: 'Next.js API Route',
      },
      { status: 500 },
    );
  }
}

/**
 * POST endpoint pour les tests manuels
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const { testMode = false } = body;

  if (testMode) {
    return NextResponse.json({
      success: true,
      message: 'Test mode activated',
      timestamp: new Date().toISOString(),
      method: 'Next.js API Route (POST)',
    });
  }

  // Rediriger vers GET pour le keep-alive normal
  return GET(request);
}
