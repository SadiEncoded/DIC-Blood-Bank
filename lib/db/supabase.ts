import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type SupabaseClientType = SupabaseClient<any, 'public', any>;

let cachedClient: SupabaseClientType | null = null;

export function getSupabaseServerClient(): SupabaseClientType {
  if (cachedClient) return cachedClient;

  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    '';

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    '';

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Supabase environment variables are missing. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
    );
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return cachedClient;
}
