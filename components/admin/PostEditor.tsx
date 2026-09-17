"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/site";
import type { CmsPost } from "@/lib/cms/types";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  areaClass,
  buttonClass,
  ghostButtonClass,
  inputClass,
  labelClass,
} from "@/components/admin/fields";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function PostEditor({
  initial,
  mode,
}: {
  initial?: CmsPost;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [post, setPost] = useState<CmsPost>(
    initial ?? {
      slug: "",
      title: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
      category: "react-native",
      tags: [],
      featured: false,
      draft: false,
      content: "",
      cover: "",
      faq: [],
    },
  );
  const [tagText, setTagText] = useState((initial?.tags ?? []).join(", "));
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  function update<K extends keyof CmsPost>(key: K, value: CmsPost[K]) {
    setPost((current) => ({ ...current, [key]: value }));
  }

  return (
    <form
      className="grid max-w-3xl gap-5"
      onSubmit={async (event) => {
        event.preventDefault();
        setBusy(true);
        setStatus("");
        const payload: CmsPost = {
          ...post,
          slug: post.slug || slugify(post.title),
          tags: tagText
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        };
        const url =
          mode === "create"
            ? "/api/admin/posts"
            : `/api/admin/posts/${initial?.slug ?? payload.slug}`;
        const response = await fetch(url, {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await response.json()) as { error?: string };
        setBusy(false);
        if (!response.ok) {
          setStatus(data.error || "Save failed");
          return;
        }
        router.push("/admin/posts");
        router.refresh();
      }}
    >
      <label className={labelClass}>
        Title
        <input
          required
          className={inputClass}
          value={post.title}
          onChange={(event) => {
            update("title", event.target.value);
            if (mode === "create" && !initial) {
              update("slug", slugify(event.target.value));
            }
          }}
        />
      </label>
      <label className={labelClass}>
        Slug
        <input
          required
          className={inputClass}
          value={post.slug}
          onChange={(event) => update("slug", slugify(event.target.value))}
        />
      </label>
      <label className={labelClass}>
        Description
        <textarea
          required
          rows={3}
          className={areaClass}
          value={post.description}
          onChange={(event) => update("description", event.target.value)}
        />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Date
          <input
            type="date"
            required
            className={inputClass}
            value={post.date}
            onChange={(event) => update("date", event.target.value)}
          />
        </label>
        <label className={labelClass}>
          Category
          <select
            className={inputClass}
            value={post.category}
            onChange={(event) =>
              update("category", event.target.value as CmsPost["category"])
            }
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className={labelClass}>
        Tags
        <input
          className={inputClass}
          value={tagText}
          onChange={(event) => setTagText(event.target.value)}
          placeholder="React Native, Expo"
        />
      </label>
      <ImageUpload
        label="Cover image"
        value={post.cover}
        onChange={(url) => update("cover", url)}
      />
      <ImageUpload
        label="Insert image into body"
        onChange={(url) =>
          setPost((current) => ({
            ...current,
            content: `${current.content}\n\n![](${url})\n`,
          }))
        }
      />
      <div className="flex gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={Boolean(post.featured)}
            onChange={(event) => update("featured", event.target.checked)}
          />
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={Boolean(post.draft)}
            onChange={(event) => update("draft", event.target.checked)}
          />
          Draft
        </label>
      </div>
      <label className={labelClass}>
        Body (Markdown)
        <textarea
          required
          rows={18}
          className={areaClass + " font-mono text-sm"}
          value={post.content}
          onChange={(event) => update("content", event.target.value)}
        />
      </label>
      <p className="text-sm text-muted">
        Images: upload a cover, or paste a Cloudinary URL inside Markdown as
        ![alt](url).
      </p>
      {status ? <p className="text-sm text-red-700">{status}</p> : null}
      <div className="flex gap-3">
        <button type="submit" className={buttonClass} disabled={busy}>
          {busy ? "Saving…" : "Save post"}
        </button>
        <button
          type="button"
          className={ghostButtonClass}
          onClick={() => router.push("/admin/posts")}
        >
          Cancel
        </button>
        {mode === "edit" && initial?.slug ? (
          <button
            type="button"
            className={ghostButtonClass}
            onClick={async () => {
              if (!window.confirm("Delete this Cloudinary copy of the post?")) {
                return;
              }
              await fetch(`/api/admin/posts/${initial.slug}`, {
                method: "DELETE",
              });
              router.push("/admin/posts");
              router.refresh();
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
