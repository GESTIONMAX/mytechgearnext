import { createBrowserClient, type SupabaseClient } from '@supabase/ssr';
import type { Database } from './types';

export const createClient = (): SupabaseClient<Database> =>
  createBrowserClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
