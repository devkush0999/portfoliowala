"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsProject } from "@/lib/cms/types";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  areaClass,
  buttonClass,
  ghostButtonClass,
  inputClass,
  labelClass,
} from "@/components/admin/fields";
import { Container } from "@/components/ui";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function blank(): CmsProject {
  return {
    id: crypto.randomUUID(),
    slug: "",
    title: "",
    year: String(new Date().getFullYear()),
    role: "",
    summary: "",
    description: "",
    problem: "",
    outcome: "",
    features: [],
    images: [],
    tags: [],
    image: "",
    href: "",
    github: "",
    appStore: "",
    playStore: "",
  };
}

function withSlugs(list: CmsProject[]) {
  return list.map((item) => {
    const base = slugify(item.slug || item.title) || item.id;
    const taken = list.some(
      (row) =>
        row.id !== item.id &&
        (row.slug === base || slugify(row.title) === base),
    );
    return {
      ...item,
      slug: taken ? `${base}-${item.id.slice(0, 8)}` : base,
    };
  });
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const [items, setItems] = useState<CmsProject[]>([]);
  const [saved, setSaved] = useState<CmsProject[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const itemsRef = useRef<CmsProject[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    fetch("/api/admin/projects", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: CmsProject[]) => {
        const next = data.map((item) => ({
          ...item,
          features: item.features ?? [],
          images: item.images ?? [],
        }));
        setItems(next);
        setSaved(next);
      });
  }, []);

  function patch(index: number, next: Partial<CmsProject>) {
    setItems((current) =>
      current.map((item, i) => (i === index ? { ...item, ...next } : item)),
    );
  }

  async function save(list?: CmsProject[]) {
    const source = withSlugs(list ?? itemsRef.current);
    const open = source.find((item) => item.id === editingId);
    if (open && !open.title.trim()) {
      setStatus("Title is required");
      return;
    }
    setBusy(true);
    setStatus("");
    const response = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(source),
    });
    setBusy(false);
    if (!response.ok) {
      setStatus("Save failed");
      return;
    }
    setItems(source);
    setSaved(source);
    setEditingId(null);
    setStatus("Saved. Live on /work.");
    router.refresh();
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ink">Projects</h1>
          <p className="mt-2 text-ink/80">
            Closed by default. Open one, edit, then save.
          </p>
        </div>
        <button
          type="button"
          className={ghostButtonClass}
          onClick={() => {
            const item = blank();
            setItems((current) => [item, ...current]);
            setEditingId(item.id);
            setStatus("");
          }}
        >
          Add project
        </button>
      </div>
      <div className="mt-10 grid gap-4">
        {items.map((item, index) => {
          const open = editingId === item.id;
          return (
            <article
              key={item.id}
              className="rounded-md border border-line bg-surface"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">
                    {item.title || "Untitled project"}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {item.year}
                    {item.role ? ` · ${item.role}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {open ? (
                    <button
                      type="button"
                      className={ghostButtonClass}
                      onClick={() => {
                        const original = saved.find((row) => row.id === item.id);
                        if (!original) {
                          setItems((current) =>
                            current.filter((row) => row.id !== item.id),
                          );
                        } else {
                          patch(index, original);
                        }
                        setEditingId(null);
                      }}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={ghostButtonClass}
                      onClick={() => {
                        setEditingId(item.id);
                        setStatus("");
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center rounded-sm px-5 text-sm text-red-700"
                    onClick={() => {
                      const next = items.filter((_, i) => i !== index);
                      setItems(next);
                      if (editingId === item.id) {
                        setEditingId(null);
                      }
                      if (saved.some((row) => row.id === item.id)) {
                        void save(next);
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              {open ? (
                <div className="grid gap-4 border-t border-line p-5">
                  <label className={labelClass}>
                    Title
                    <input
                      className={inputClass}
                      value={item.title}
                      onChange={(event) => {
                        const title = event.target.value;
                        patch(index, {
                          title,
                          slug: item.slug ? item.slug : slugify(title),
                        });
                      }}
                    />
                  </label>
                  <label className={labelClass}>
                    Slug
                    <input
                      className={inputClass}
                      value={item.slug ?? ""}
                      onChange={(event) =>
                        patch(index, { slug: event.target.value })
                      }
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className={labelClass}>
                      Year
                      <input
                        className={inputClass}
                        value={item.year}
                        onChange={(event) =>
                          patch(index, { year: event.target.value })
                        }
                      />
                    </label>
                    <label className={labelClass}>
                      Role
                      <input
                        className={inputClass}
                        value={item.role}
                        onChange={(event) =>
                          patch(index, { role: event.target.value })
                        }
                      />
                    </label>
                  </div>
                  <label className={labelClass}>
                    Short description
                    <textarea
                      rows={3}
                      className={areaClass}
                      value={item.summary}
                      onChange={(event) =>
                        patch(index, { summary: event.target.value })
                      }
                    />
                  </label>
                  <label className={labelClass}>
                    Description
                    <textarea
                      rows={8}
                      className={areaClass}
                      value={item.description ?? ""}
                      onChange={(event) =>
                        patch(index, { description: event.target.value })
                      }
                    />
                  </label>
                  <label className={labelClass}>
                    Problem it solves
                    <textarea
                      rows={4}
                      className={areaClass}
                      value={item.problem ?? ""}
                      onChange={(event) =>
                        patch(index, { problem: event.target.value })
                      }
                    />
                  </label>
                  <label className={labelClass}>
                    Features
                    <textarea
                      rows={5}
                      className={areaClass}
                      value={item.features.join("\n")}
                      onChange={(event) =>
                        patch(index, {
                          features: event.target.value
                            .split("\n")
                            .map((line) => line.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </label>
                  <label className={labelClass}>
                    Outcome
                    <textarea
                      rows={3}
                      className={areaClass}
                      value={item.outcome ?? ""}
                      onChange={(event) =>
                        patch(index, { outcome: event.target.value })
                      }
                    />
                  </label>
                  <label className={labelClass}>
                    Tags
                    <input
                      className={inputClass}
                      value={item.tags.join(", ")}
                      onChange={(event) =>
                        patch(index, {
                          tags: event.target.value
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </label>
                  <ImageUpload
                    label="Banner image"
                    value={item.image}
                    onChange={(url) => patch(index, { image: url })}
                  />
                  <div className="grid gap-4">
                    <p className="text-sm font-medium text-ink">
                      Gallery images
                    </p>
                    {item.images.map((src, imageIndex) => (
                      <div
                        key={`${item.id}-img-${imageIndex}`}
                        className="grid gap-2"
                      >
                        <ImageUpload
                          label={`Image ${imageIndex + 1}`}
                          value={src}
                          onChange={(url) => {
                            const images = [...item.images];
                            images[imageIndex] = url;
                            patch(index, { images });
                          }}
                        />
                        <button
                          type="button"
                          className="justify-self-start text-sm text-red-700"
                          onClick={() =>
                            patch(index, {
                              images: item.images.filter(
                                (_, i) => i !== imageIndex,
                              ),
                            })
                          }
                        >
                          Remove image
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className={ghostButtonClass + " w-fit"}
                      onClick={() =>
                        patch(index, { images: [...item.images, ""] })
                      }
                    >
                      Add image
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className={labelClass}>
                      Live URL
                      <input
                        className={inputClass}
                        value={item.href ?? ""}
                        onChange={(event) =>
                          patch(index, { href: event.target.value })
                        }
                      />
                    </label>
                    <label className={labelClass}>
                      GitHub
                      <input
                        className={inputClass}
                        value={item.github ?? ""}
                        onChange={(event) =>
                          patch(index, { github: event.target.value })
                        }
                      />
                    </label>
                    <label className={labelClass}>
                      App Store
                      <input
                        className={inputClass}
                        value={item.appStore ?? ""}
                        onChange={(event) =>
                          patch(index, { appStore: event.target.value })
                        }
                      />
                    </label>
                    <label className={labelClass}>
                      Play Store
                      <input
                        className={inputClass}
                        value={item.playStore ?? ""}
                        onChange={(event) =>
                          patch(index, { playStore: event.target.value })
                        }
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    className={buttonClass + " w-fit"}
                    disabled={busy}
                    onClick={() => void save()}
                  >
                    {busy ? "Saving…" : "Save"}
                  </button>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
      {status ? <p className="mt-4 text-sm text-accent">{status}</p> : null}
    </Container>
  );
}
