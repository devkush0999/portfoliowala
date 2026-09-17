"use client";

import { useEffect, useState } from "react";
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

export default function AdminProjectsPage() {
  const [items, setItems] = useState<CmsProject[]>([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((response) => response.json())
      .then((data: CmsProject[]) =>
        setItems(
          data.map((item) => ({
            ...item,
            features: item.features ?? [],
            images: item.images ?? [],
          })),
        ),
      );
  }, []);

  function patch(index: number, next: Partial<CmsProject>) {
    setItems((current) =>
      current.map((item, i) => (i === index ? { ...item, ...next } : item)),
    );
  }

  return (
    <Container className="py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ink">Projects</h1>
          <p className="mt-2 text-ink/80">
            Banner, description, problem, features, gallery, and links.
          </p>
        </div>
        <button
          type="button"
          className={ghostButtonClass}
          onClick={() => setItems((current) => [blank(), ...current])}
        >
          Add project
        </button>
      </div>
      <div className="mt-10 grid gap-8">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="grid gap-4 rounded-md border border-line bg-surface p-6"
          >
            <label className={labelClass}>
              Title
              <input
                className={inputClass}
                value={item.title}
                onChange={(event) => patch(index, { title: event.target.value })}
              />
            </label>
            <label className={labelClass}>
              Slug
              <input
                className={inputClass}
                value={item.slug ?? ""}
                onChange={(event) => patch(index, { slug: event.target.value })}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Year
                <input
                  className={inputClass}
                  value={item.year}
                  onChange={(event) => patch(index, { year: event.target.value })}
                />
              </label>
              <label className={labelClass}>
                Role
                <input
                  className={inputClass}
                  value={item.role}
                  onChange={(event) => patch(index, { role: event.target.value })}
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
              <p className="text-sm font-medium text-ink">Gallery images</p>
              {item.images.map((src, imageIndex) => (
                <div key={`${item.id}-img-${imageIndex}`} className="grid gap-2">
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
                        images: item.images.filter((_, i) => i !== imageIndex),
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
                onClick={() => patch(index, { images: [...item.images, ""] })}
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
                  onChange={(event) => patch(index, { href: event.target.value })}
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
              className="justify-self-start text-sm text-red-700"
              onClick={() =>
                setItems((current) => current.filter((_, i) => i !== index))
              }
            >
              Remove
            </button>
          </article>
        ))}
      </div>
      {status ? <p className="mt-4 text-sm text-accent">{status}</p> : null}
      <button
        type="button"
        className={buttonClass + " mt-8"}
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setStatus("");
          const response = await fetch("/api/admin/projects", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(items),
          });
          setBusy(false);
          setStatus(response.ok ? "Saved. Live on /work." : "Save failed");
        }}
      >
        {busy ? "Saving…" : "Save projects"}
      </button>
    </Container>
  );
}
