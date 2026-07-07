// Server-only Supabase client (service-role key). NEVER import this into a
// client component — the service key must stay on the server.
// Used by API routes to persist survey bookings.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    throw new Error("[CONFIG_ERR] SUPABASE_URL / SUPABASE_SERVICE_KEY missing");
  }
  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}
