// Browser-side Supabase client for staff auth (session stored in cookies so
// middleware/server can read it). Uses the PUBLIC anon key — safe for the browser.

import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
