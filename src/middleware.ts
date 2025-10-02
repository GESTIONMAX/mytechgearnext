import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware Next.js pour la gestion des sessions Supabase
 * Inclut un système de keep-alive automatique
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Vérification des variables d'environnement
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Variables d'environnement Supabase manquantes dans le middleware");
    return response;
  }

  try {
    // Création du client Supabase pour le middleware
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    });

    // Keep-alive automatique pour les routes API
    if (request.nextUrl.pathname.startsWith('/api/')) {
      // Ping léger vers Supabase pour maintenir la connexion
      try {
        await supabase.from('_keep_alive_check').select('*').limit(1);
      } catch (error) {
        // Si la table n'existe pas, on fait un ping basique
        if (error instanceof Error && error.message.includes('PGRST116')) {
          // Ping basique vers l'API REST
          await fetch(`${supabaseUrl}/rest/v1/`, {
            method: 'GET',
            headers: {
              apikey: supabaseAnonKey,
              Authorization: `Bearer ${supabaseAnonKey}`,
              'Content-Type': 'application/json',
            },
          });
        }
      }
    }

    // Gestion des sessions utilisateur
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Ajout d'informations utilisateur aux headers pour les composants
    if (user) {
      response.headers.set('x-user-id', user.id);
      response.headers.set('x-user-email', user.email || '');
    }
  } catch (error) {
    console.error('Middleware Supabase error:', error);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
