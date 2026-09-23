"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ImagePlus, Loader2, Save, Send, X, Eye, Plus, Trash2, Pencil, UserPlus } from "lucide-react";
import { BLOG_PROSE } from "@/src/lib/blog-prose";

// Kept in sync with src/lib/blog.ts's BlogFaq (duplicated for the same
// reason as AuthorProfile above — that file is server-only).
interface Faq {
  q: string;
  a: string;
}

// Reusable author profile — kept in sync with src/lib/blog-authors.ts's
// BlogAuthor. Duplicated here (not imported) because that file is
// "server-only" and this is a client component.
interface AuthorProfile {
  id: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  linkedin_url: string | null;
}

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
  author: string;
  /** Selected reusable author profile ("" = none) — drives the end-of-post
   * bio card. Independent of `author` above, which stays the plain-text
   * byline name shown at the top of the post; picking a profile here also
   * fills that name in for convenience, but you can still type any name
   * there without picking a profile. */
  author_id: string;
  published_at: string; // YYYY-MM-DD
  content_updated_at: string; // YYYY-MM-DD — "Last updated", shown at the end of the post
  /** Optional end-of-post FAQ list. Empty array = the FAQ section doesn't
   * render at all on the live post (see BlogFaqSection). Half-filled rows
   * (blank question or answer) are dropped server-side on save. */
  faqs: Faq[];
  /** Optional FAQ section heading override (e.g. "FAQs: Preventive
   * Maintenance") — blank keeps the plain "FAQs" default (see
   * BlogFaqSection). Only matters once at least one FAQ is added. */
  faq_title: string;
}

// Local (not UTC) date to avoid an off-by-one day near midnight.
const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const EMPTY: Form = {
  title: "", subtitle: "", slug: "", category: "Guide", author: "", author_id: "",
  read_time: "", meta_description: "", cover_image_url: "", content_html: "",
  published_at: todayStr(), content_updated_at: todayStr(), faqs: [], faq_title: "",
};

const EMPTY_AUTHOR_DRAFT = { id: "", name: "", bio: "", linkedin_url: "", avatar_url: "" };

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

  // Reusable author profiles (name/avatar/bio/LinkedIn) — the "Author
  // profile" dropdown below and its inline add/edit panel.
  const [authors, setAuthors] = useState<AuthorProfile[]>([]);
  const [authorPanelOpen, setAuthorPanelOpen] = useState(false);
  const [authorDraft, setAuthorDraft] = useState(EMPTY_AUTHOR_DRAFT);
  const [savingAuthor, setSavingAuthor] = useState(false);
  const authorAvatarRef = useRef<HTMLInputElement | null>(null);

  // Load the marketer-managed category list.
  const loadCategories = useCallback(async () => {
    const fallback = ["Guide", "Best Practices", "Case Study", "Security", "ROI"];
    try {
      const res = await fetch("/api/blog-admin/categories");
      const data = res.ok ? await res.json() : {};
      setCategories(data.categories?.length ? data.categories : fallback);
    } catch {
      setCategories(fallback);
    }
  }, []);
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const loadAuthors = useCallback(async () => {
    try {
      const res = await fetch("/api/blog-admin/authors");
      const data = res.ok ? await res.json() : {};
      setAuthors(data.authors ?? []);
    } catch {
      setAuthors([]);
    }
  }, []);
  useEffect(() => {
    loadAuthors();
  }, [loadAuthors]);

  function openNewAuthor() {
    setAuthorDraft(EMPTY_AUTHOR_DRAFT);
    setAuthorPanelOpen(true);
  }

  function openEditAuthor(a: AuthorProfile) {
    setAuthorDraft({ id: a.id, name: a.name, bio: a.bio ?? "", linkedin_url: a.linkedin_url ?? "", avatar_url: a.avatar_url ?? "" });
    setAuthorPanelOpen(true);
  }

  const uploadAuthorAvatar = useCallback(async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/blog-admin/upload", { method: "POST", body: fd });
    const d = await res.json().catch(() => ({}));
    if (res.ok && d.url) setAuthorDraft((a) => ({ ...a, avatar_url: d.url }));
    else alert(d.error || "Avatar upload failed");
  }, []);

  async function saveAuthor() {
    if (!authorDraft.name.trim()) return alert("Author name is required.");
    setSavingAuthor(true);
    const res = await fetch("/api/blog-admin/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: authorDraft.id || undefined,
        name: authorDraft.name,
        bio: authorDraft.bio,
        linkedin_url: authorDraft.linkedin_url,
        avatar_url: authorDraft.avatar_url,
      }),
    });
    const d = await res.json().catch(() => ({}));
    setSavingAuthor(false);
    if (!res.ok) return alert(d.error || "Save failed");
    setAuthors(d.authors ?? []);
    // Attribute this post to the author just created/edited, and keep the
    // plain-text byline name in sync with it.
    setForm((f) => ({ ...f, author_id: d.author.id, author: d.author.name }));
    setAuthorPanelOpen(false);
  }

  async function removeAuthor(a: AuthorProfile) {
    if (!confirm(`Remove author profile "${a.name}"? Posts already attributed to them keep their byline name but lose the bio card.`)) return;
    const res = await fetch(`/api/blog-admin/authors?id=${encodeURIComponent(a.id)}`, { method: "DELETE" });
    if (res.ok) {
      const { authors: next } = await res.json();
      setAuthors(next ?? []);
      if (form.author_id === a.id) setForm((f) => ({ ...f, author_id: "" }));
    }
  }

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
          content_html: post.content_html ?? "", author: post.author ?? "",
          author_id: post.author_id ?? "",
          published_at: (post.published_at ?? post.created_at ?? "").slice(0, 10) || todayStr(),
          content_updated_at: (post.content_updated_at ?? "").slice(0, 10) || todayStr(),
          faqs: Array.isArray(post.faqs) ? post.faqs : [],
          faq_title: post.faq_title ?? "",
        });
      }
      setLoading(false);
    })();
  }, [id, router]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  function addFaq() {
    setForm((f) => ({ ...f, faqs: [...f.faqs, { q: "", a: "" }] }));
  }
  function updateFaq(i: number, field: keyof Faq, value: string) {
    setForm((f) => ({ ...f, faqs: f.faqs.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)) }));
  }
  function removeFaq(i: number) {
    setForm((f) => ({ ...f, faqs: f.faqs.filter((_, idx) => idx !== i) }));
  }

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
        className="mb-2 w-full text-[15px] font-light text-[#718096] placeholder-[#cbd5e0] focus:outline-none"
      />
      <input
        value={form.author}
        onChange={(e) => set("author", e.target.value)}
        placeholder="Article written by (author name)"
        className="mb-6 w-full text-[13px] font-light text-[#94a3b8] placeholder-[#cbd5e0] focus:outline-none"
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
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">Publish date</span>
          <input type="date" value={form.published_at} onChange={(e) => set("published_at", e.target.value)} className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none" />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">Last updated</span>
          <input type="date" value={form.content_updated_at} onChange={(e) => set("content_updated_at", e.target.value)} className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none" />
          {/* Only shown on the live article when it differs from the publish
              date (see isDifferentDay in blog/[slug]/page.tsx) — bump this
              whenever you edit a published post's content. */}
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">URL slug (optional)</span>
          <input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from title" className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">SEO meta description (optional)</span>
          <input value={form.meta_description} onChange={(e) => set("meta_description", e.target.value)} placeholder="150–160 chars for search results" className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none" />
        </label>

        {/* Author profile — reusable bio card shown at the end of the
            published post (avatar + bio + LinkedIn). Independent of the
            plain-text byline name typed in above; picking one here fills
            that name in too. */}
        <div className="sm:col-span-2">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">
            Author profile (bio card at the end of the post)
          </span>
          <div className="flex items-center gap-1.5">
            <select
              value={form.author_id}
              onChange={(e) => {
                const chosen = authors.find((a) => a.id === e.target.value);
                setForm((f) => ({ ...f, author_id: e.target.value, author: chosen ? chosen.name : f.author }));
              }}
              className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none"
            >
              <option value="">— None (byline text only) —</option>
              {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <button type="button" onClick={openNewAuthor} title="Add a new author" className="shrink-0 rounded-lg border border-[#cbd5e0] p-2 text-[#2b6cb0] hover:bg-[#eef3f9]"><UserPlus size={14} /></button>
            {form.author_id && (
              <>
                <button
                  type="button"
                  onClick={() => { const a = authors.find((x) => x.id === form.author_id); if (a) openEditAuthor(a); }}
                  title="Edit this author"
                  className="shrink-0 rounded-lg border border-[#cbd5e0] p-2 text-[#2b6cb0] hover:bg-[#eef3f9]"
                ><Pencil size={14} /></button>
                <button
                  type="button"
                  onClick={() => { const a = authors.find((x) => x.id === form.author_id); if (a) removeAuthor(a); }}
                  title="Delete this author profile"
                  className="shrink-0 rounded-lg border border-[#cbd5e0] p-2 text-red-500 hover:bg-red-50"
                ><Trash2 size={14} /></button>
              </>
            )}
          </div>

          {authorPanelOpen && (
            <div className="mt-3 rounded-lg border border-[#dbe5f0] bg-[#f8fafc] p-4">
              <div className="mb-3 flex items-center gap-3">
                {authorDraft.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={authorDraft.avatar_url} alt="" className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[#cbd5e0] text-[#a0aec0]">
                    <ImagePlus size={16} />
                  </div>
                )}
                <button type="button" onClick={() => authorAvatarRef.current?.click()} className="rounded-lg border border-[#cbd5e0] bg-white px-3 py-1.5 text-[12px] font-medium text-[#4a5568] hover:bg-[#eef3f9]">
                  {authorDraft.avatar_url ? "Change photo" : "Upload a tiny photo"}
                </button>
                <input ref={authorAvatarRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAuthorAvatar(f); e.target.value = ""; }} />
              </div>
              <input
                value={authorDraft.name}
                onChange={(e) => setAuthorDraft((a) => ({ ...a, name: e.target.value }))}
                placeholder="Author name"
                className="mb-2 w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none"
              />
              <textarea
                value={authorDraft.bio}
                onChange={(e) => setAuthorDraft((a) => ({ ...a, bio: e.target.value }))}
                placeholder="Short bio (a sentence or two)"
                rows={2}
                className="mb-2 w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none"
              />
              <input
                value={authorDraft.linkedin_url}
                onChange={(e) => setAuthorDraft((a) => ({ ...a, linkedin_url: e.target.value }))}
                placeholder="LinkedIn profile URL (optional)"
                className="mb-3 w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={saveAuthor}
                  disabled={savingAuthor}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#2b6cb0] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#1a56a0] disabled:opacity-60"
                >
                  {savingAuthor ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null} {authorDraft.id ? "Save author" : "Add author"}
                </button>
                <button type="button" onClick={() => setAuthorPanelOpen(false)} className="rounded-lg border border-[#cbd5e0] bg-white px-3 py-1.5 text-[12px] font-medium text-[#4a5568] hover:bg-[#eef3f9]">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQs — optional end-of-post accordion (rendered via BlogFaqSection,
          which uses the `hidden`-attribute technique so every answer stays
          in the crawled HTML — same as the homepage FAQ). Empty list = no
          FAQ section on the live post at all. */}
      <div className="mt-6 rounded-xl border border-[#dbe5f0] bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">
            FAQs (optional — shown at the end of the post)
          </span>
          <button
            type="button"
            onClick={addFaq}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbd5e0] px-2.5 py-1.5 text-[12px] font-medium text-[#2b6cb0] hover:bg-[#eef3f9]"
          >
            <Plus size={13} /> Add question
          </button>
        </div>

        {form.faqs.length === 0 && (
          <p className="mb-3 text-[12.5px] text-[#a0aec0]">No FAQs yet — the FAQ section won&apos;t appear on this post until you add one.</p>
        )}

        {/* Section heading shown on the live post above the Q&A list
            (2026-09-23) — e.g. "FAQs: Preventive Maintenance" instead of
            the plain default. Only matters once at least one FAQ exists
            below, but left visible either way so it's ready when you add one. */}
        <label className="mb-3 block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#718096]">
            FAQ section title (optional)
          </span>
          <input
            value={form.faq_title}
            onChange={(e) => set("faq_title", e.target.value)}
            placeholder="FAQs"
            className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none"
          />
        </label>

        <div className="space-y-3">
          {form.faqs.map((item, i) => (
            <div key={i} className="rounded-lg border border-[#e2e8f0] p-3">
              <div className="mb-2 flex items-center gap-2">
                <input
                  value={item.q}
                  onChange={(e) => updateFaq(i, "q", e.target.value)}
                  placeholder={`Question ${i + 1}`}
                  className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] font-medium focus:border-[#2b6cb0] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  title="Remove this question"
                  className="shrink-0 rounded-lg border border-[#cbd5e0] p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <textarea
                value={item.a}
                onChange={(e) => updateFaq(i, "a", e.target.value)}
                placeholder="Answer"
                rows={2}
                className="w-full rounded-lg border border-[#cbd5e0] px-3 py-2 text-[13px] focus:border-[#2b6cb0] focus:outline-none"
              />
            </div>
          ))}
        </div>
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
