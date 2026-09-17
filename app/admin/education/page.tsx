"use client";

import { useEffect, useState } from "react";
import type { CmsEducation } from "@/lib/cms/types";
import {
  areaClass,
  buttonClass,
  ghostButtonClass,
  inputClass,
  labelClass,
} from "@/components/admin/fields";
import { Container } from "@/components/ui";

function blank(): CmsEducation {
  return {
    id: crypto.randomUUID(),
    school: "",
    degree: "",
    period: "",
    grade: "",
    detail: "",
  };
}

export default function AdminEducationPage() {
  const [items, setItems] = useState<CmsEducation[]>([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/education")
      .then((response) => response.json())
      .then(setItems);
  }, []);

  return (
    <Container className="py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl text-ink">Education</h1>
        <button
          type="button"
          className={ghostButtonClass}
          onClick={() => setItems((current) => [blank(), ...current])}
        >
          Add school
        </button>
      </div>
      <div className="mt-10 grid gap-6">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="grid gap-4 rounded-md border border-line bg-surface p-6"
          >
            <label className={labelClass}>
              School
              <input
                className={inputClass}
                value={item.school}
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...item, school: event.target.value };
                  setItems(next);
                }}
              />
            </label>
            <label className={labelClass}>
              Degree
              <input
                className={inputClass}
                value={item.degree}
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...item, degree: event.target.value };
                  setItems(next);
                }}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Period
                <input
                  className={inputClass}
                  value={item.period}
                  onChange={(event) => {
                    const next = [...items];
                    next[index] = { ...item, period: event.target.value };
                    setItems(next);
                  }}
                />
              </label>
              <label className={labelClass}>
                Grade
                <input
                  className={inputClass}
                  value={item.grade ?? ""}
                  onChange={(event) => {
                    const next = [...items];
                    next[index] = { ...item, grade: event.target.value };
                    setItems(next);
                  }}
                />
              </label>
            </div>
            <label className={labelClass}>
              Detail
              <textarea
                rows={3}
                className={areaClass}
                value={item.detail}
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...item, detail: event.target.value };
                  setItems(next);
                }}
              />
            </label>
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
          const response = await fetch("/api/admin/education", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(items),
          });
          setBusy(false);
          setStatus(response.ok ? "Saved. Live on /about." : "Save failed");
        }}
      >
        {busy ? "Saving…" : "Save education"}
      </button>
    </Container>
  );
}
