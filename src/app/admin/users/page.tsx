"use client";
// Admin: list staff, create new users, change roles, and delete users.
// Admin-gated by middleware (/admin/*). Create/delete go through service-key API
// routes; role changes update the profiles table directly (RLS allows admins).

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Trash2, UserPlus, X } from "lucide-react";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string;
}

export default function AdminUsers() {
  const [rows, setRows] = useState<Profile[]>([]);
  const [meId, setMeId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // create form
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", role: "surveyor" });
  const [busy, setBusy] = useState(false);

  // delete confirm
  const [confirmDel, setConfirmDel] = useState<Profile | null>(null);

  async function load() {
    const sb = getSupabaseBrowser();
    const { data: { user } } = await sb.auth.getUser();
    setMeId(user?.id ?? null);
    const { data, error } = await sb
      .from("profiles")
      .select("id,email,full_name,role")
      .order("email");
    if (error) setErr(error.message);
    setRows((data as Profile[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setRole(id: string, role: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, role } : r)));
    const { error } = await getSupabaseBrowser().from("profiles").update({ role }).eq("id", id);
    if (error) { setErr(error.message); load(); }
  }

  async function createUser() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Could not create user");
      setShowAdd(false);
      setForm({ email: "", password: "", full_name: "", role: "surveyor" });
      await load();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteUser(p: Profile) {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: p.id }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Could not delete user");
      setConfirmDel(null);
      setRows((prev) => prev.filter((r) => r.id !== p.id));
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const canCreate = form.email.includes("@") && form.password.length >= 8;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/surveys" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:underline">
        <ChevronLeft className="h-4 w-4" /> Dashboard
      </Link>
      <div className="mb-6 mt-3 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff &amp; Roles</h1>
          <p className="text-sm text-slate-500">{rows.length} staff</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAdd((s) => !s)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          <UserPlus className="h-4 w-4" /> Add user
        </button>
      </div>
      {err && <p className="mb-4 text-sm text-red-600">{err}</p>}

      {showAdd && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              placeholder="Full name"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              type="email"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Temporary password (min 8 chars)"
              type="text"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm capitalize"
            >
              <option value="surveyor">surveyor</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!canCreate || busy}
              onClick={createUser}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {busy ? "Creating…" : "Create user"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">User</th>
                <th className="px-4 py-2 text-left font-semibold">Role</th>
                <th className="px-4 py-2 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="px-4 py-2">
                    <div className="font-medium text-slate-800">{r.full_name || r.email}</div>
                    <div className="text-xs text-slate-500">{r.email}</div>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={r.role}
                      onChange={(e) => setRole(r.id, e.target.value)}
                      className="rounded-lg border border-slate-300 px-2 py-1 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="surveyor">surveyor</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {r.id === meId ? (
                      <span className="text-xs text-slate-400">you</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDel(r)}
                        aria-label="Delete user"
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <button type="button" onClick={() => setConfirmDel(null)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
              <X className="h-5 w-5" />
            </button>
            <h2 className="mb-2 text-lg font-bold text-slate-900">Delete user?</h2>
            <p className="mb-5 text-sm text-slate-600">
              {confirmDel.full_name || confirmDel.email} will lose access immediately. This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setConfirmDel(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                Cancel
              </button>
              <button type="button" disabled={busy} onClick={() => deleteUser(confirmDel)} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50">
                {busy ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
