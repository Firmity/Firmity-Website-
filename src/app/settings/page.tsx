"use client";
// Surveyor Settings screen (bottom-nav / top-nav "Settings" tab). Its own route.
// Holds appearance (theme) + account (email/role) + sign out.

import { useEffect, useState } from "react";
import { Languages, Palette, User } from "lucide-react";
import BottomNav from "@/src/components/BottomNav";
import SurveyorTopNav from "@/src/components/SurveyorTopNav";
import ThemePicker from "@/src/components/ThemePicker";
import SignOutButton from "@/src/components/SignOutButton";
import LoadingScreen from "@/src/components/LoadingScreen";
import LanguageSelect from "@/src/components/LanguageSelect";
import { useLang } from "@/src/lib/i18n";
import { getSupabaseBrowser } from "@/src/lib/supabase-browser";

export default function SettingsPage() {
  const [info, setInfo] = useState<{ name?: string; email?: string; role?: string }>({});
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useLang();

  useEffect(() => {
    (async () => {
      try {
        const sb = getSupabaseBrowser();
        const { data: { user } } = await sb.auth.getUser();
        if (user) {
          const { data: prof } = await sb.from("profiles").select("full_name,role").eq("id", user.id).single();
          setInfo({ name: prof?.full_name ?? "", email: user.email ?? "", role: prof?.role ?? "" });
        }
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  if (!loaded) return <LoadingScreen label="Loading settings…" />;

  return (
    <>
      <SurveyorTopNav />
      <main className="mx-auto w-full max-w-md px-5 pb-28 pt-8 md:max-w-3xl md:pb-12 md:pt-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

        {/* Account */}
        <section className="mt-6 rounded-3xl border border-slate-200 p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <User className="h-4 w-4 text-slate-400" /> Account
          </h2>
          <p className="text-sm font-medium text-slate-800">{info.name || info.email || "Staff"}</p>
          {info.email && <p className="text-xs text-slate-500">{info.email}</p>}
          {info.role && (
            <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600">
              {info.role}
            </span>
          )}
          <div className="mt-4">
            <SignOutButton />
          </div>
        </section>

        {/* Language (default for surveys; each survey can still be switched) */}
        <section className="mt-4 rounded-3xl border border-slate-200 p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Languages className="h-4 w-4 text-slate-400" /> Language
          </h2>
          <LanguageSelect value={lang} onChange={setLang} />
          <p className="mt-2 text-[11px] text-slate-400">
            Default language for survey questions. You can switch it inside any survey too.
          </p>
        </section>

        {/* Appearance */}
        <section className="mt-4 rounded-3xl border border-slate-200 p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Palette className="h-4 w-4 text-slate-400" /> Appearance
          </h2>
          <ThemePicker />
          <p className="mt-2 text-[11px] text-slate-400">Your theme is saved on this device.</p>
        </section>

        <BottomNav />
      </main>
    </>
  );
}
