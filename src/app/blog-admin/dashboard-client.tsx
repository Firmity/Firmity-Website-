"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, ExternalLink, Loader2, Eye, EyeOff } from "lucide-react";

interface Row {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  category: string | null;
  updated_at: string;
}

export function DashboardClient() {
  const router = useRouter();
  const [posts, setPosts] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/blog-admin/posts");
    if (res.status === 401) {
      router.push("/blog-admin/login");
      return;
    }
    const d = await res.json().catch(() => ({ posts: [] }));
    setPosts(d.posts || []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function del(id: string) {
    if (!confirm("Delete this post permanently?")) return;
    await fetch(`/api/blog-admin/posts/${id}`, { method: "DELETE" });
    load();
  }

  async function toggleStatus(id: string, current: "draft" | "published") {
    const next = current === "published" ? "draft" : "published";
    await fetch(`/api/blog-admin/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    load();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#111d35]">Blog</h1>
          <p className="text-[13px] text-[#718096]">Create, edit and publish articles.</p>
        </div>
        <Link
          href="/blog-admin/editor"
          className="inline-flex items-center gap-2 rounded-lg bg-[#2b6cb0] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#1a56a0]"
        >
          <Plus size={15} /> New post
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-[#a0aec0]">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#cbd5e0] bg-white py-16 text-center">
          <p className="text-[14px] text-[#718096]">No posts yet.</p>
          <Link href="/blog-admin/editor" className="mt-2 inline-block text-[13px] font-medium text-[#2b6cb0]">
            Write your first article →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#dbe5f0] bg-white">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-4 border-b border-[#f0f4f8] px-5 py-4 last:border-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-[14px] font-semibold text-[#1a202c]">{p.title || "Untitled"}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      p.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[11.5px] text-[#a0aec0]">
                  /blog/{p.slug} {p.category ? `· ${p.category}` : ""}
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1.5">
                {p.status === "published" && (
                  <Link href={`/blog/${p.slug}`} target="_blank" title="View" className="rounded-md p-2 text-[#718096] hover:bg-[#eef3f9]">
                    <ExternalLink size={15} />
                  </Link>
                )}
                <button
                  onClick={() => toggleStatus(p.id, p.status)}
                  title={p.status === "published" ? "Unpublish (back to draft)" : "Publish"}
                  className="rounded-md p-2 text-[#718096] hover:bg-[#eef3f9]"
                >
                  {p.status === "published" ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <Link href={`/blog-admin/editor?id=${p.id}`} title="Edit" className="rounded-md p-2 text-[#2b6cb0] hover:bg-[#eef3f9]">
                  <Pencil size={15} />
                </Link>
                <button onClick={() => del(p.id)} title="Delete" className="rounded-md p-2 text-red-500 hover:bg-red-50">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
