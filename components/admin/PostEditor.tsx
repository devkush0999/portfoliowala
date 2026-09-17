"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories, site } from "@/lib/site";
import type { CmsPost } from "@/lib/cms/types";
import type { FaqItem } from "@/lib/posts";
import {
  compileSections,
  extractHeadings,
  sectionsFromContent,
  type CmsSection,
} from "@/lib/cms/sections";
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

function newSection(): CmsSection {
  return {
    id: `section-${crypto.randomUUID()}`,
    title: "",
    body: "",
  };
}

function faqScript(items: FaqItem[]) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    null,
    2,
  );
}

function parseFaqScript(raw: string): FaqItem[] | null {
  try {
    const data: unknown = JSON.parse(raw);
    if (Array.isArray(data)) {
      return data
        .map((item) => {
          const row = item as FaqItem;
          return {
            question: row.question?.trim() ?? "",
            answer: row.answer?.trim() ?? "",
          };
        })
        .filter((item) => item.question || item.answer);
    }
    if (data && typeof data === "object" && "mainEntity" in data) {
      const entities = (data as { mainEntity?: unknown }).mainEntity;
      if (!Array.isArray(entities)) {
        return [];
      }
      return entities
        .map((item) => {
          const row = item as {
            name?: string;
            acceptedAnswer?: { text?: string };
          };
          return {
            question: row.name?.trim() ?? "",
            answer: row.acceptedAnswer?.text?.trim() ?? "",
          };
        })
        .filter((item) => item.question || item.answer);
    }
    return [];
  } catch {
    return null;
  }
}

export function PostEditor({
  initial,
  mode,
}: {
  initial?: CmsPost;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [post, setPost] = useState<CmsPost>(() =>
    initial
      ? {
          ...initial,
          author: initial.author || site.name,
          seoTitle: initial.seoTitle || "",
          seoDescription: initial.seoDescription || "",
          canonicalUrl: initial.canonicalUrl || "",
          sections: sectionsFromContent(initial.content, initial.sections),
        }
      : {
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
          author: site.name,
          seoTitle: "",
          seoDescription: "",
          canonicalUrl: "",
          faq: [],
          sections: [newSection()],
        },
  );
  const [faqJson, setFaqJson] = useState(faqScript(initial?.faq ?? []));
  const [faqError, setFaqError] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const sections = post.sections?.length
    ? post.sections
    : sectionsFromContent(post.content);
  const headings = extractHeadings(compileSections(sections));

  function update<K extends keyof CmsPost>(key: K, value: CmsPost[K]) {
    setPost((current) => ({ ...current, [key]: value }));
  }

  function setSections(next: CmsSection[]) {
    update("sections", next);
  }

  function setFaq(next: FaqItem[]) {
    update("faq", next);
    setFaqJson(faqScript(next));
    setFaqError("");
  }

  async function save(asDraft: boolean) {
    setBusy(true);
    setStatus("");
    const parsedFaq = parseFaqScript(faqJson);
    if (parsedFaq === null) {
      setBusy(false);
      setFaqError("FAQ schema JSON is invalid");
      return;
    }
    const slug = post.slug || slugify(post.title);
    const payload: CmsPost = {
      ...post,
      slug,
      author: post.author || site.name,
      seoTitle: post.seoTitle || post.title,
      seoDescription: post.seoDescription || post.description,
      canonicalUrl: post.canonicalUrl || "",
      faq: parsedFaq,
      sections,
      content: compileSections(sections),
      draft: asDraft,
      tags: post.tags ?? [],
    };
    if (!payload.title) {
      setBusy(false);
      setStatus("Title is required");
      return;
    }
    if (!asDraft && !payload.description.trim()) {
      setBusy(false);
      setStatus("Excerpt is required to publish");
      return;
    }
    if (!asDraft && !payload.content.trim()) {
      setBusy(false);
      setStatus("Add at least one section before publishing");
      return;
    }
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
  }

  return (
    <form
      className="grid max-w-3xl gap-8"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <label className={labelClass}>
        Title
        <input
          required
          className={inputClass}
          value={post.title}
          onChange={(event) => {
            const title = event.target.value;
            setPost((current) => ({
              ...current,
              title,
              slug:
                mode === "create" && !initial
                  ? slugify(title)
                  : current.slug,
              seoTitle: current.seoTitle ? current.seoTitle : title,
            }));
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
      <label className={labelClass}>
        Author
        <input
          className={inputClass}
          value={post.author ?? ""}
          onChange={(event) => update("author", event.target.value)}
        />
      </label>
      <label className={labelClass}>
        Date publish
        <input
          type="date"
          required
          className={inputClass}
          value={post.date}
          onChange={(event) => update("date", event.target.value)}
        />
      </label>
      <label className={labelClass}>
        Excerpt
        <textarea
          rows={3}
          className={areaClass}
          value={post.description}
          onChange={(event) => {
            const description = event.target.value;
            setPost((current) => ({
              ...current,
              description,
              seoDescription: current.seoDescription
                ? current.seoDescription
                : description,
            }));
          }}
          placeholder="Short summary shown on the blog card"
        />
      </label>
      <ImageUpload
        label="Card & SEO cover image"
        value={post.cover}
        onChange={(url) => update("cover", url)}
      />
      <label className={labelClass}>
        SEO title
        <input
          className={inputClass}
          value={post.seoTitle ?? ""}
          onChange={(event) => update("seoTitle", event.target.value)}
        />
      </label>
      <label className={labelClass}>
        SEO description
        <textarea
          rows={3}
          className={areaClass}
          value={post.seoDescription ?? ""}
          onChange={(event) => update("seoDescription", event.target.value)}
        />
      </label>
      <label className={labelClass}>
        Canonical URL
        <input
          className={inputClass}
          value={post.canonicalUrl ?? ""}
          onChange={(event) => update("canonicalUrl", event.target.value)}
          placeholder={`${site.url}/blog/${post.slug || "slug"}`}
        />
      </label>
      <section className="grid gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink">
            Body & table of contents
          </h2>
          <p className="mt-2 text-sm text-ink/80">
            Add sections below. Paste content with headings — TOC auto-builds
            from h1–h6 (h1→h2, h5/h6→h4) and section titles.
          </p>
        </div>
        {headings.length > 0 ? (
          <div className="rounded-sm border border-line bg-surface p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              Table of contents
            </p>
            <ul className="mt-3 grid gap-1 text-sm text-ink">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={
                    heading.level === 3
                      ? "pl-3"
                      : heading.level === 4
                        ? "pl-6"
                        : ""
                  }
                >
                  {heading.text}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="grid gap-4 rounded-sm border border-line bg-white p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-ink">
                Section {index + 1}
              </p>
              {sections.length > 1 ? (
                <button
                  type="button"
                  className={ghostButtonClass}
                  onClick={() =>
                    setSections(sections.filter((item) => item.id !== section.id))
                  }
                >
                  Remove
                </button>
              ) : null}
            </div>
            <label className={labelClass}>
              Section title
              <input
                className={inputClass}
                value={section.title}
                onChange={(event) =>
                  setSections(
                    sections.map((item) =>
                      item.id === section.id
                        ? { ...item, title: event.target.value }
                        : item,
                    ),
                  )
                }
              />
            </label>
            <label className={labelClass}>
              Body
              <textarea
                rows={12}
                className={areaClass + " font-mono text-sm"}
                value={section.body}
                onChange={(event) =>
                  setSections(
                    sections.map((item) =>
                      item.id === section.id
                        ? { ...item, body: event.target.value }
                        : item,
                    ),
                  )
                }
              />
            </label>
            <ImageUpload
              label="Insert image into this section"
              onChange={(url) =>
                setSections(
                  sections.map((item) =>
                    item.id === section.id
                      ? {
                          ...item,
                          body: `${item.body.trim()}\n\n![](${url})\n`,
                        }
                      : item,
                  ),
                )
              }
            />
          </div>
        ))}
        <button
          type="button"
          className={ghostButtonClass + " w-fit"}
          onClick={() => setSections([...sections, newSection()])}
        >
          Add section
        </button>
      </section>
      <section className="grid gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink">FAQs</h2>
          <p className="mt-2 text-sm text-ink/80">
            Edit the FAQ schema script here. It builds the frontend accordion
            and is added to the blog page.
          </p>
        </div>
        {(post.faq ?? []).map((item, index) => (
          <div
            key={`faq-${index}`}
            className="grid gap-3 rounded-sm border border-line bg-white p-4"
          >
            <label className={labelClass}>
              Question
              <input
                className={inputClass}
                value={item.question}
                onChange={(event) =>
                  setFaq(
                    (post.faq ?? []).map((faq, faqIndex) =>
                      faqIndex === index
                        ? { ...faq, question: event.target.value }
                        : faq,
                    ),
                  )
                }
              />
            </label>
            <label className={labelClass}>
              Answer
              <textarea
                rows={3}
                className={areaClass}
                value={item.answer}
                onChange={(event) =>
                  setFaq(
                    (post.faq ?? []).map((faq, faqIndex) =>
                      faqIndex === index
                        ? { ...faq, answer: event.target.value }
                        : faq,
                    ),
                  )
                }
              />
            </label>
            <button
              type="button"
              className={ghostButtonClass + " w-fit"}
              onClick={() =>
                setFaq((post.faq ?? []).filter((_, faqIndex) => faqIndex !== index))
              }
            >
              Remove FAQ
            </button>
          </div>
        ))}
        <button
          type="button"
          className={ghostButtonClass + " w-fit"}
          onClick={() =>
            setFaq([...(post.faq ?? []), { question: "", answer: "" }])
          }
        >
          Add FAQ
        </button>
        <label className={labelClass}>
          FAQ schema
          <textarea
            rows={12}
            className={areaClass + " font-mono text-sm"}
            value={faqJson}
            onChange={(event) => {
              const value = event.target.value;
              setFaqJson(value);
              const parsed = parseFaqScript(value);
              if (parsed === null) {
                setFaqError("FAQ schema JSON is invalid");
                return;
              }
              setFaqError("");
              update("faq", parsed);
            }}
          />
        </label>
        {faqError ? <p className="text-sm text-red-700">{faqError}</p> : null}
      </section>
      {status ? <p className="text-sm text-red-700">{status}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={ghostButtonClass}
          disabled={busy}
          onClick={() => save(true)}
        >
          {busy ? "Saving…" : "Draft"}
        </button>
        <button
          type="button"
          className={buttonClass}
          disabled={busy}
          onClick={() => save(false)}
        >
          {busy ? "Saving…" : "Create"}
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
              if (!window.confirm("Delete this post?")) {
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
