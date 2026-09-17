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
    title: "",
    year: String(new Date().getFullYear()),
    role: "",
    summary: "",
    tags: [],
    image: "",
    href: "",
    github: "",
  };
}

export default function AdminProjectsPage() {
  const [items, setItems] = useState<CmsProject[]>([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((response) => response.json())
      .then(setItems);
  }, []);

  return (
    <Container className="py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ink">Projects</h1>
          <p className="mt-2 text-ink/80">Add, edit, and upload screenshots.</p>
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
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...item, title: event.target.value };
                  setItems(next);
                }}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Year
                <input
                  className={inputClass}
                  value={item.year}
                  onChange={(event) => {
                    const next = [...items];
                    next[index] = { ...item, year: event.target.value };
                    setItems(next);
                  }}
                />
              </label>
              <label className={labelClass}>
                Role
                <input
                  className={inputClass}
                  value={item.role}
                  onChange={(event) => {
                    const next = [...items];
                    next[index] = { ...item, role: event.target.value };
                    setItems(next);
                  }}
                />
              </label>
            </div>
            <label className={labelClass}>
              Summary
              <textarea
                rows={3}
                className={areaClass}
                value={item.summary}
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...item, summary: event.target.value };
                  setItems(next);
                }}
              />
            </label>
            <label className={labelClass}>
              Tags
              <input
                className={inputClass}
                value={item.tags.join(", ")}
                onChange={(event) => {
                  const next = [...items];
                  next[index] = {
                    ...item,
                    tags: event.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  };
                  setItems(next);
                }}
              />
            </label>
            <ImageUpload
              value={item.image}
              onChange={(url) => {
                const next = [...items];
                next[index] = { ...item, image: url };
                setItems(next);
              }}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Live URL
                <input
                  className={inputClass}
                  value={item.href ?? ""}
                  onChange={(event) => {
                    const next = [...items];
                    next[index] = { ...item, href: event.target.value };
                    setItems(next);
                  }}
                />
              </label>
              <label className={labelClass}>
                GitHub
                <input
                  className={inputClass}
                  value={item.github ?? ""}
                  onChange={(event) => {
                    const next = [...items];
                    next[index] = { ...item, github: event.target.value };
                    setItems(next);
                  }}
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
