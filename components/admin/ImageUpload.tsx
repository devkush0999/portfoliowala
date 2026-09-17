"use client";

import { useEffect, useRef, useState } from "react";
import { ghostButtonClass, inputClass } from "@/components/admin/fields";

async function compressImage(file: File) {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const max = 1600;
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
      bitmap.close();
      return file;
    }
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.8),
    );
    if (!blob) {
      return file;
    }
    return new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), {
      type: "image/webp",
    });
  } catch {
    return file;
  }
}

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
  const blobRef = useRef("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState(value ?? "");

  useEffect(() => {
    setPreview(value ?? "");
  }, [value]);

  useEffect(() => {
    return () => {
      if (blobRef.current) {
        URL.revokeObjectURL(blobRef.current);
      }
    };
  }, []);

  async function upload(file: File) {
    if (blobRef.current) {
      URL.revokeObjectURL(blobRef.current);
    }
    const local = URL.createObjectURL(file);
    blobRef.current = local;
    setPreview(local);
    setBusy(true);
    setError("");
    try {
      const packed = await compressImage(file);
      const form = new FormData();
      form.append("file", packed);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setError(data.error || "Upload failed");
        return;
      }
      setPreview(data.url);
      onChange(data.url, file.name);
    } catch {
      setError("Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
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
        {preview ? (
          <img
            src={preview}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <span
          className={`relative z-10 rounded-sm px-4 py-2 text-sm ${
            preview ? "bg-ink/70 text-white" : "text-ink/80"
          }`}
        >
          {busy
            ? "Uploading…"
            : preview
              ? "Change image"
              : "Choose image or drop a file"}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
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
      {value || preview ? (
        <button
          type="button"
          className={ghostButtonClass + " w-fit"}
          onClick={() => {
            setPreview("");
            onChange("");
          }}
        >
          Remove image
        </button>
      ) : null}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
