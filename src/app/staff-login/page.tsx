"use client";
// Staff sign-in for the survey app. No public sign-up — admins create users in
// Supabase. On success, returns to the page the user was trying to reach.

import { useState } from "react";
import { LogIn } from "lucide-react";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";

export default function StaffLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const supabase = getSupabaseBrowser();
      const { data: signIn, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        return;
      }
      // Role-based landing: admins -> ops dashboard, surveyors -> home dashboard.
      // An explicit ?next= (e.g. a deep link the user was bounced from) wins.
      let dest = "/home";
      const uid = signIn.user?.id;
      if (uid) {
        const { data: prof } = await supabase.from("profiles").select("role").eq("id", uid).single();
        if (prof?.role === "admin") dest = "/surveys";
      }
      const next =
        (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("next")) || dest;
      window.location.href = next;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-xl font-bold text-slate-900">Staff Sign In</h1>
        <p className="mb-5 text-sm text-slate-500">Facility survey console</p>

        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          <LogIn className="h-4 w-4" />
          {busy ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </main>
  );
}
