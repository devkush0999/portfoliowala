"use client";

import { useRef, useState } from "react";
import { ghostButtonClass, inputClass } from "@/components/admin/fields";

export function ImageUpload({
  value,
  onChange,
  label = "Image",
}: {
  value?: string;
  onChange: (url: string, name?: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);

  async function upload(file: File) {
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
    onChange(data.url, file.name);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="grid gap-2 text-sm font-medium text-ink">
      <span>{label}</span>
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDrag(false);
          const file = event.dataTransfer.files[0];
          if (file && file.type.startsWith("image/")) {
            void upload(file);
          }
        }}
        className={`relative flex min-h-40 w-full items-center justify-center overflow-hidden rounded-sm border border-dashed px-4 py-8 text-center ${
          drag ? "border-accent bg-surface-2" : "border-line bg-surface"
        }`}
      >
        {value ? (
          <img
            src={value}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <span
          className={`relative z-10 rounded-sm px-4 py-2 text-sm ${
            value ? "bg-ink/70 text-white" : "text-ink/80"
          }`}
        >
          {busy
            ? "Uploading…"
            : value
              ? "Change image"
              : "Choose image or drop a file"}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void upload(file);
          }
        }}
      />
      <input
        type="text"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder="https://…"
        className={inputClass}
      />
      {value ? (
        <button
          type="button"
          className={ghostButtonClass + " w-fit"}
          onClick={() => onChange("")}
        >
          Remove image
        </button>
      ) : null}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
