import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim() || 'https://placeholder.supabase.co';
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '').trim() || 'placeholder';

// Provide a default client that won't crash on instantiation but will fail on calls if missing env vars
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Supabase credentials missing in environment.');
  }
}
