"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ImagePlus, Loader2, Save, Send, X, Eye, Plus, Trash2 } from "lucide-react";
import { BLOG_PROSE } from "@/src/lib/blog-prose";

// Client-only (Tiptap touches the DOM) — no SSR.
const RichEditor = dynamic(() => import("@/src/components/blog/rich-editor").then((m) => m.RichEditor), {
  ssr: false,
  loading: () => <div className="h-[480px] rounded-xl border border-[#dbe5f0] bg-white" />,
});

interface Form {
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  read_time: string;
  meta_description: string;
  cover_image_url: string;
  content_html: string;
}

const EMPTY: Form = {
  title: "", subtitle: "", slug: "", category: "Guide",
  read_time: "", meta_description: "", cover_image_url: "", content_html: "",
};

function EditorInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  const [form, setForm] = useState<Form>(EMPTY);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState<"draft" | "published" | null>(null);
  const [err, setErr] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const coverRef = useRef<HTMLInputElement | null>(null);

  // Load the marketer-managed category list.
  const loadCategories = useCallback(async () => {
    const res = await fetch("/api/blog-admin/categories");
    if (res.ok) {
      const { categories } = await res.json();
      setCategories(categories || []);
    }
  }, []);
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  async function addCategory() {
    const name = window.prompt("New category name")?.trim();
    if (!name) return;
    const res = await fetch("/api/blog-admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      const { categories } = await res.json();
      setCategories(categories || []);
      setForm((f) => ({ ...f, category: name }));
    }
  }

  async function removeCategory() {
    if (!form.category) return;
    if (!confirm(`Remove category "${form.category}"? Existing posts keep their label.`)) return;
    const res = await fetch(`/api/blog-admin/categories?name=${encodeURIComponent(form.category)}`, { method: "DELETE" });
    if (res.ok) {
      const { categories } = await res.json();
      setCategories(categories || []);
      setForm((f) => ({ ...f, category: categories?.[0] ?? "" }));
    }
  }

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetch(`/api/blog-admin/posts/${id}`);
      if (res.status === 401) return router.push("/blog-admin/login");
      if (res.ok) {
        const { post } = await res.json();
        setForm({
          title: post.title ?? "", subtitle: post.subtitle ?? "", slug: post.slug ?? "",
          category: post.category ?? "Guide", read_time: post.read_time ?? "",
          meta_description: post.meta_description ?? "", cover_image_url: post.cover_image_url ?? "",
          content_html: post.content_html ?? "",
        });
      }
      setLoading(false);
    })();
  }, [id, router]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const uploadCover = useCallback(async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/blog-admin/upload", { method: "POST", body: fd });
    const d = await res.json().catch(() => ({}));
    if (res.ok && d.url) set("cover_image_url", d.url);
    else alert(d.error || "Cover upload failed");
  }, []);

  async function save(status: "draft" | "published") {
    if (!form.title.trim()) return setErr("A title is required.");
    setSaving(status);
    setErr("");
    const res = await fetch("/api/blog-admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: id || undefined, status }),
    });
    const d = await res.json().catch(() => ({}));
    setSaving(null);
    if (res.ok) router.push("/blog-admin");
    else setErr(d.error || "Save failed");
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24 text-[#a0aec0]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/blog-admin" className="inline-flex items-center gap-1.5 text-[13px] text-[#718096] hover:text-[#2b6cb0]">
          <ArrowLeft size={15} /> Back
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#dbe5f0] bg-white px-4 py-2 text-[13px] font-medium text-[#4a5568] hover:bg-[#f8fafc]"
          >
            <Eye size={15} /> {showPreview ? "Back to editor" : "Preview"}
          </button>
          <button
            onClick={() => save("draft")}
            disabled={saving !== null}
            className="inline-flex items-center gap-2 rounded-lg border border-[#dbe5f0] bg-white px-4 py-2 text-[13px] font-medium text-[#4a5568] hover:bg-[#f8fafc] disabled:opacity-60"
          >
            {saving === "draft" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={15} />} Save draft
          </button>
          <button
            onClick={() => save("published")}
            disabled={saving !== null}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2b6cb0] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#1a56a0] disabled:opacity-60"
          >
            {saving === "published" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={15} />} Publish
          </button>
        </div>
      </div>

      {err && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-600">{err}</p>}

      {showPreview ? (
        <article className="rounded-2xl border border-[#dbe5f0] bg-white p-8 sm:p-10">
          {form.category && (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2b6cb0]">{form.category}</p>
          )}
          <h1 className="mb-3 font-serif text-[clamp(1.9rem,4vw,2.6rem)] font-light leading-tight text-[#111d35]">
            {form.title || "Untitled"}
          </h1>
          {form.subtitle && <p className="mb-6 text-[16px] font-light leading-relaxed text-[#718096]">{form.subtitle}</p>}
          {form.cover_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.cover_image_url} alt="" className="mb-8 w-full rounded-2xl" />
          )}
          <div className={BLOG_PROSE} dangerouslySetInnerHTML={{ __html: form.content_html || "<p>Nothing written yet.</p>" }} />
        </article>
      ) : (
      <>
      {/* Cover image */}
      <div className="mb-5">
        {form.cover_image_url ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.cover_image_url} alt="Cover" className="h-52 w-full rounded-xl object-cover" />
            <button
              onClick={() => set("cover_image_url", "")}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
              title="Remove cover"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => coverRef.current?.click()}
            className="flex h-40 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#cbd5e0] text-[13px] text-[#718096] hover:border-[#2b6cb0] hover:text-[#2b6cb0]"
          >
            <ImagePlus size={18} /> Add header image
          </button>
        )}
        <input ref={coverRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); e.target.value = ""; }} />
      </div>

      {/* Title + subtitle */}
      <input
        value={form.title}
        onChange={(e) => set("title", e.target.value)}
        placeholder="Post title"
        className="mb-2 w-full font-serif text-[2rem] font-light text-[#111d35] placeholder-[#cbd5e0] focus:outline-none"
      />
      <input
        value={form.subtitle}
        onChange={(e) => set("subtitle", e.target.value)}
        placeholder="Subtitle / short description"
        className="mb-6 w-full text-[15px] font-light text-[#718096] placeholder-[#cbd5e0] focus:outline-none"
      />

      {/* Editor */}
      <RichEditor value={form.content_html} onChange={(html) => set("content_html", html)} />

      {/* Meta */}
      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-[#dbe5f0] bg-white p-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">Category</span>
          <div className="flex items-center gap-1.5">
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none">
              {categories.length === 0 && <option value="">—</option>}
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button type="button" onClick={addCategory} title="Add a category" className="shrink-0 rounded-lg border border-[#cbd5e0] p-2 text-[#2b6cb0] hover:bg-[#eef3f9]"><Plus size={14} /></button>
            <button type="button" onClick={removeCategory} title="Remove selected category" className="shrink-0 rounded-lg border border-[#cbd5e0] p-2 text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
          </div>
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">Read time (optional)</span>
          <input value={form.read_time} onChange={(e) => set("read_time", e.target.value)} placeholder="auto (e.g. 6 min read)" className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none" />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">URL slug (optional)</span>
          <input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from title" className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">SEO meta description (optional)</span>
          <input value={form.meta_description} onChange={(e) => set("meta_description", e.target.value)} placeholder="150–160 chars for search results" className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none" />
        </label>
      </div>
      </>
      )}
    </div>
  );
}

export function EditorClient() {
  return (
    <Suspense fallback={<div className="flex justify-center py-24 text-[#a0aec0]"><Loader2 className="h-6 w-6 animate-spin" /></div>}>
      <EditorInner />
    </Suspense>
  );
}
