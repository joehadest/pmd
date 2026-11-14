import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/** true quando as variáveis do Supabase estão configuradas (.env.local / Vercel). */
export const isSupabaseConfigured = Boolean(url && key);

export const supabase = isSupabaseConfigured
  ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } })
  : null;

export const MEDIA_BUCKET = 'site-media';
