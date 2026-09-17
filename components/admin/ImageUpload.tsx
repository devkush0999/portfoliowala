"use client";

import { useState } from "react";
import { ghostButtonClass } from "@/components/admin/fields";

export function ImageUpload({
  value,
  onChange,
  label = "Image",
}: {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <label className="grid gap-2 text-sm font-medium text-ink">
      <span>{label}</span>
      {value ? (
        <img
          src={value}
          alt=""
          className="h-40 w-full rounded-sm border border-line object-cover"
        />
      ) : null}
      <input
        type="text"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder="https://..."
        className="h-11 w-full rounded-sm border border-line bg-white px-3 text-ink outline-none focus:border-accent"
      />
      <input
        type="file"
        accept="image/*"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) {
            return;
          }
          setBusy(true);
          setError("");
          const form = new FormData();
          form.append("file", file);
          const response = await fetch("/api/admin/upload", {
            method: "POST",
            body: form,
          });
          const data = (await response.json()) as { url?: string; error?: string };
          setBusy(false);
          if (!response.ok || !data.url) {
            setError(data.error || "Upload failed");
            return;
          }
          onChange(data.url);
        }}
      />
      <span className={ghostButtonClass + " pointer-events-none w-fit"}>
        {busy ? "Uploading…" : "Or pick a file above"}
      </span>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </label>
  );
}
