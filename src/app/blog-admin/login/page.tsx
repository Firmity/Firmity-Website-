"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, Loader2 } from "lucide-react";

export default function BlogLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/blog-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/blog-admin");
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        setErr(d.error || "Login failed");
      }
    } catch {
      setErr("Network error — try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#dbe5f0] bg-white p-8 shadow-[0_8px_40px_rgba(17,29,53,0.08)]">
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111d35]">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#111d35]">Firmity Marketing Studio</p>
            <p className="text-[11.5px] text-[#718096]">Marketing team access</p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2.5 text-[14px] focus:border-[#2b6cb0] focus:outline-none"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2.5 text-[14px] focus:border-[#2b6cb0] focus:outline-none"
          />
          {err && <p className="text-[12.5px] text-red-600">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2b6cb0] px-4 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a56a0] disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
